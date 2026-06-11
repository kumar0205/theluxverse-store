// src/hooks/usePaymentGuard.js
//
// Architecture:
//   React → POST /api/verify-payment → Razorpay API
//
// NEVER call Razorpay directly from React — secrets would be exposed.
// All Razorpay credentials live server-side in Vercel Environment Variables.
//
// Guard logic (in priority order):
//  1. No payment ID in URL AND no valid session → redirect to home.
//  2. Payment ID present + already cached (within 30 min) → use cache, skip API.
//  3. Payment ID present + not cached → call /api/verify-payment (server validates).
//     • On success  → write per-paymentId cache + expose verified product.
//     • On failure  → redirect to home.
//  4. No payment ID but valid general session → use cached product (tab refresh).
//
// Cache key is the paymentId itself so different payments never cross-contaminate.

import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

// TEMPORARY:
// Remove bypass after Razorpay API keys are approved.
const BYPASS_VERIFY_PAYMENT = import.meta.env.VITE_BYPASS_VERIFY === 'true';

const SESSION_TTL  = 30 * 60 * 1000; // 30 minutes
const SESSION_GENERAL_KEY = 'lx_payment_ok'; // fallback for tab refreshes without paymentId in URL

// ── sessionStorage helpers ──────────────────────────────────────────────────

/** Read a per-paymentId cache entry. Key = paymentId to prevent cross-contamination. */
function readPaymentCache(paymentId) {
  try {
    const raw = sessionStorage.getItem(`lx_pay_${paymentId}`);
    return raw ? JSON.parse(raw) : null; // { product, expires }
  } catch { return null; }
}

/** Returns cached product string if not expired, otherwise null. */
function getCachedProduct(paymentId) {
  const entry = readPaymentCache(paymentId);
  if (!entry || !entry.product || !entry.expires) return null;
  if (Date.now() > entry.expires) {
    try { sessionStorage.removeItem(`lx_pay_${paymentId}`); } catch { /* ignore */ }
    return null;
  }
  return entry.product;
}

/** Cache a verified result keyed by paymentId with a rolling 30-min TTL. */
function cachePaymentResult(paymentId, product) {
  try {
    sessionStorage.setItem(
      `lx_pay_${paymentId}`,
      JSON.stringify({ product, expires: Date.now() + SESSION_TTL })
    );
  } catch { /* private browsing / full storage */ }
}

/** General session — written when paymentId is absent on refresh (tab re-use). */
function readGeneralSession() {
  try {
    const raw = sessionStorage.getItem(SESSION_GENERAL_KEY);
    return raw ? JSON.parse(raw) : null; // { ok, product, ts }
  } catch { return null; }
}

function isGeneralSessionValid() {
  const s = readGeneralSession();
  return !!(s?.ok && s?.ts && Date.now() - s.ts < SESSION_TTL);
}

function writeGeneralSession(product) {
  try {
    sessionStorage.setItem(SESSION_GENERAL_KEY, JSON.stringify({ ok: true, product, ts: Date.now() }));
  } catch { /* private browsing / full storage */ }
}

function clearGeneralSession() {
  try { sessionStorage.removeItem(SESSION_GENERAL_KEY); } catch { /* ignore */ }
}

// ── Hook ────────────────────────────────────────────────────────────────────

/**
 * @returns {{ loading: boolean, product: string|null }}
 *   loading — true while API verification is in-flight (show a spinner)
 *   product — verified product key e.g. 'launchpad', 'creator', 'full'
 *             null while loading or if verification failed (user gets redirected)
 */
export default function usePaymentGuard() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Razorpay appends razorpay_payment_id to the redirect URL automatically.
  const paymentId =
    searchParams.get('razorpay_payment_id') ||
    searchParams.get('payment_id');

  const [loading, setLoading]   = useState(true);
  const [product, setProduct]   = useState(null);

  useEffect(() => {
    async function guard() {
      // ── Temporary Bypass Flow ─────────────────────────────────────────────
      if (BYPASS_VERIFY_PAYMENT) {
        const productParam =
          searchParams.get('product') ||
          searchParams.get('p') ||
          searchParams.get('vault');

        if (productParam) {
          if (paymentId) {
            cachePaymentResult(paymentId, productParam);
          }
          writeGeneralSession(productParam);
          setProduct(productParam);
          setLoading(false);
          return;
        }

        // No product in URL: check if paymentId is in URL and has cached product
        if (paymentId) {
          const cachedProduct = getCachedProduct(paymentId);
          if (cachedProduct) {
            setProduct(cachedProduct);
            setLoading(false);
            return;
          }
        }

        // No product in URL, no cached paymentId: check general session
        if (isGeneralSessionValid()) {
          const cached = readGeneralSession();
          setProduct(cached.product ?? null);
          setLoading(false);
          return;
        }

        // Otherwise redirect home
        clearGeneralSession();
        navigate('/', { replace: true });
        return;
      }

      // ── Strict Verification Flow (BYPASS_VERIFY_PAYMENT = false) ──────────
      // ── 1. No paymentId in URL — try general session (tab refresh) ────────
      if (!paymentId) {
        if (isGeneralSessionValid()) {
          const cached = readGeneralSession();
          setProduct(cached.product ?? null);
          setLoading(false);
          return;
        }
        clearGeneralSession();
        navigate('/', { replace: true });
        return;
      }

      // ── 2. paymentId present — check per-payment cache first ─────────────
      //    Cache hit → zero API calls on refresh, instant render.
      const cachedProduct = getCachedProduct(paymentId);
      if (cachedProduct) {
        setProduct(cachedProduct);
        setLoading(false);
        return;
      }

      // ── 3. Cache miss — call the server-side Vercel Function ──────────────
      //    React → /api/verify-payment → Razorpay (secrets never in browser)
      try {
        const res  = await fetch('/api/verify-payment', {
          method:  'POST',
          headers: { 'Content-Type': 'application/json' },
          body:    JSON.stringify({ paymentId }),
        });

        const data = await res.json();

        if (!res.ok || !data.ok) {
          clearGeneralSession();
          navigate('/', { replace: true });
          return;
        }

        // Verified — write both caches:
        //   • per-paymentId cache → skips API on refresh
        //   • general session     → allows navigation within the tab without paymentId in URL
        cachePaymentResult(paymentId, data.product);
        writeGeneralSession(data.product);
        setProduct(data.product);
        setLoading(false);

      } catch {
        // Network error — fall back to general session if still valid
        if (isGeneralSessionValid()) {
          const cached = readGeneralSession();
          setProduct(cached.product ?? null);
          setLoading(false);
        } else {
          clearGeneralSession();
          navigate('/', { replace: true });
        }
      }
    }

    guard();
  }, [paymentId, navigate, searchParams]);

  return { loading, product };
}
