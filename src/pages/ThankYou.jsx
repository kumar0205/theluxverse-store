import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/lux/Navbar';
import Footer from '@/components/lux/Footer';
import ArrowIcon from '@/components/lux/ArrowIcon';
import { PRODUCTS, GLOBAL_CONFIG } from '@/config/products';
import usePaymentGuard from '@/hooks/usePaymentGuard';

// Priority 2 — Drive links come from central config, not hardcoded here.
// Priority 3 — Only the verified product's button is shown.
// Priority 1+4 — Guard hook calls /api/verify-payment (server-side Razorpay proxy).
//               Secrets NEVER touch the browser.

import { useDb } from '@/config/DbContext';

// Resolve product param → config entry (returns null if unknown)
function resolveProduct(raw, productMap) {
  if (!raw) return null;
  const key = raw.toLowerCase();
  // exact match
  if (productMap[key]) return productMap[key];
  // substring match (e.g. "fullvault" → "full")
  for (const [k, v] of Object.entries(productMap)) {
    if (key.includes(k)) return v;
  }
  return null;
}

export default function ThankYou() {
  const { products, globalSettings } = useDb();
  
  const PRODUCT_MAP = {
    creator: {
      name: 'Creator Vault',
      buttonText: 'Open My Creator Vault 📂',
      getUrl: () => products.creatorVault.driveUrl,
    },
    '169': {
      name: 'Creator Vault',
      buttonText: 'Open My Creator Vault 📂',
      getUrl: () => products.creatorVault.driveUrl,
    },
    full: {
      name: 'Full Vault',
      buttonText: 'Open My Full Vault 📂',
      getUrl: () => products.fullVault.driveUrl,
    },
    fv: {
      name: 'Full Vault',
      buttonText: 'Open My Full Vault 📂',
      getUrl: () => products.fullVault.driveUrl,
    },
    '118': {
      name: 'Full Vault',
      buttonText: 'Open My Full Vault 📂',
      getUrl: () => products.fullVault.driveUrl,
    },
    launchpad: {
      name: 'Launchpad',
      buttonText: 'Join Launchpad Community 💬',
      getUrl: () => globalSettings.discord,
    },
    lp: {
      name: 'Launchpad',
      buttonText: 'Join Launchpad Community 💬',
      getUrl: () => globalSettings.discord,
    },
    '834': {
      name: 'Launchpad',
      buttonText: 'Join Launchpad Community 💬',
      getUrl: () => globalSettings.discord,
    },
  };

  // Calls /api/verify-payment → Razorpay (server-side, secrets never in browser)
  // Returns: { loading, product } where product is the verified purchase key.
  const { loading, product: verifiedProduct } = usePaymentGuard();

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Priority 3 — resolve from VERIFIED product returned by server.
  const activeProduct = resolveProduct(verifiedProduct, PRODUCT_MAP);


  // If loading is finished and we don't have a verified valid product, redirect to home
  React.useEffect(() => {
    if (!loading && !activeProduct) {
      navigate('/', { replace: true });
    }
  }, [loading, activeProduct, navigate]);

  // ── Loading screen while /api/verify-payment is in flight ──────────────────
  if (loading || !activeProduct) {
    return (
      <div style={{ background: '#050505', minHeight: '100vh', display: 'flex', flexDirection: 'column', padding: '24px', gap: '24px' }}>
        {/* Navbar skeleton */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '16px' }}>
          <div style={{ width: '120px', height: '24px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px' }} className="shimmer" />
          <div style={{ width: '60px', height: '16px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px' }} className="shimmer" />
        </div>

        {/* Center content skeleton */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '24px', maxWidth: '600px', width: '100%', margin: '0 auto' }}>
          <div style={{ width: '180px', height: '48px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }} className="shimmer" />
          <div style={{ width: '280px', height: '24px', background: 'rgba(255,255,255,0.03)', borderRadius: '4px' }} className="shimmer" />
          
          {/* Card skeleton */}
          <div style={{ width: '100%', height: '160px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ width: '120px', height: '20px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px' }} className="shimmer" />
            <div style={{ width: '100%', height: '14px', background: 'rgba(255,255,255,0.03)', borderRadius: '4px' }} className="shimmer" />
            <div style={{ width: '80%', height: '14px', background: 'rgba(255,255,255,0.03)', borderRadius: '4px' }} className="shimmer" />
          </div>
          
          {/* Button skeleton */}
          <div style={{ width: '100%', height: '56px', background: 'rgba(212,175,55,0.05)', border: '1px solid rgba(212,175,55,0.2)', borderRadius: '9999px' }} className="shimmer" />
        </div>

        <style>{`
          .shimmer {
            position: relative;
            overflow: hidden;
          }
          .shimmer::after {
            position: absolute;
            inset: 0;
            transform: translateX(-100%);
            background: linear-gradient(
              90deg,
              transparent,
              rgba(255, 255, 255, 0.04),
              transparent
            );
            animation: loading-shimmer 1.5s infinite;
            content: '';
          }
          @keyframes loading-shimmer {
            100% {
              transform: translateX(100%);
            }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{ background: '#050505', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '120px 20px', textAlign: 'center', background: 'radial-gradient(ellipse at center top, #100d00 0%, #050505 80%)' }}>
        <div style={{ maxWidth: 600, width: '100%', paddingTop: '32px' }}>
          <h1 className="font-bebas" style={{ fontSize: 'clamp(40px, 8vw, 60px)', color: '#ffffff', marginBottom: 8, lineHeight: 1.1 }}>
            🎉 You're In!
          </h1>
          <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '18px', color: '#E0E0E0', marginBottom: 20 }}>
            Your access is ready below.
          </p>

          {/* Delivery Confirmation */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', marginBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#4ADE80', fontSize: '15px', fontWeight: 500 }}>
              <span style={{ color: '#4ADE80' }}>✔</span> Lifetime access activated
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#4ADE80', fontSize: '15px', fontWeight: 500 }}>
              <span style={{ color: '#4ADE80' }}>✔</span> Instant delivery completed
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#4ADE80', fontSize: '15px', fontWeight: 500 }}>
              <span style={{ color: '#4ADE80' }}>✔</span> Access link sent to your email
            </div>
            <div style={{ marginTop: '4px', color: '#a0a0a0', fontSize: '14px', maxWidth: '480px', lineHeight: '1.4' }}>
              📩 If you don't see it within 1 minute, check <strong>Spam</strong> or <strong>Promotions</strong>.
            </div>
          </div>

          {/* How to Access (2-Step Card) */}
          <div className="vault-card" style={{ background: '#111111', textAlign: 'left', marginBottom: 32 }}>
            <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '18px', color: '#ffffff', fontWeight: 600, marginBottom: 20, textAlign: 'center' }}>
              How To Access
            </h2>

            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 16 }}>
              <li style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(212,175,55,0.1)', color: '#D4AF37', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Bebas Neue', fontSize: '16px', flexShrink: 0 }}>1</div>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', color: '#E0E0E0' }}>Tap the button below.</span>
              </li>
              <li style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(212,175,55,0.1)', color: '#D4AF37', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Bebas Neue', fontSize: '16px', flexShrink: 0 }}>2</div>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', color: '#E0E0E0' }}>Your files will open instantly.</span>
              </li>
            </ul>
          </div>

          {/* Priority 3 — ONLY the purchased product's CTA button */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 16 }}>
            <a
              href={activeProduct.getUrl()}
              className="btn-gold"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                width: '100%',
                justifyContent: 'center',
                height: '56px',
                fontWeight: 600,
                fontSize: '18px',
                display: 'inline-flex',
                alignItems: 'center',
                borderRadius: '9999px',
                boxShadow: '0 4px 15px rgba(212,175,55,0.2)'
              }}
            >
              {activeProduct.buttonText}
            </a>
          </div>

          {/* Support Line — Priority 2: email from env via config */}
          <div style={{ fontSize: '14px', color: '#a0a0a0', fontFamily: 'Inter, sans-serif', marginBottom: 40 }}>
            Need help?{' '}
            <a href={`mailto:${globalSettings.supportEmail}`} style={{ color: '#D4AF37', textDecoration: 'underline' }}>
              {globalSettings.supportEmail}
            </a>
          </div>

          {/* Bottom Upsell Section (₹99 Add-On) */}
          <div style={{
            background: 'rgba(212, 175, 55, 0.03)',
            border: '1px solid rgba(212, 175, 55, 0.15)',
            borderRadius: '16px',
            padding: '32px 24px',
            textAlign: 'center',
            marginBottom: '40px',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Subtle premium gold top border line */}
            <div style={{
              position: 'absolute',
              top: 0, left: 0, right: 0, height: '3px',
              background: 'linear-gradient(90deg, #D4AF37, #F9E498, #D4AF37)'
            }} />

            <p style={{
              color: '#c9a84c',
              fontSize: '12px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: '8px',
              fontWeight: 600
            }}>
              ₹99 Add-On
            </p>
            <h3 style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '22px',
              color: '#ffffff',
              fontWeight: 700,
              marginBottom: '16px'
            }}>
              Complete Your Setup For Just ₹99
            </h3>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '12px 16px',
              maxWidth: '360px',
              margin: '0 auto 28px auto',
              textAlign: 'left',
              fontFamily: 'Inter, sans-serif',
              fontSize: '14px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#E0E0E0' }}>
                <span style={{ color: '#4ADE80' }}>✔</span> Razorpay Setup
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#E0E0E0' }}>
                <span style={{ color: '#4ADE80' }}>✔</span> Website Setup
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#E0E0E0' }}>
                <span style={{ color: '#4ADE80' }}>✔</span> Google Drive Delivery
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#E0E0E0' }}>
                <span style={{ color: '#4ADE80' }}>✔</span> Automation Guide
              </div>
            </div>

            <a href={GLOBAL_CONFIG.addon} style={{
              background: 'linear-gradient(135deg,#c9a84c,#e2c06a)',
              color: '#000',
              padding: '14px 28px',
              borderRadius: '8px',
              fontWeight: '700',
              fontSize: '15px',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              width: '100%',
              maxWidth: '280px',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.02)'; }}
            onMouseOut={(e) => { e.currentTarget.style.transform = 'none'; }}
            >
              Add To My Order <ArrowIcon size={16} />
            </a>
          </div>

        </div>
      </main>

      <Footer instagramLink={globalSettings.instagram} />
    </div>
  );
}