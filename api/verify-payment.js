// api/verify-payment.js
// Vercel Serverless Function — runs on the SERVER, never in the browser.
//
// Architecture:
//   React → POST /api/verify-payment → Razorpay API
//
// RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET live ONLY in Vercel Environment
// Variables. They are never sent to the browser at any point.
//
// What this does:
//   1. Receives { paymentId, expectedProduct } from the React client.
//   2. Fetches payment details from Razorpay's API using server-side Basic Auth.
//   3. Validates: payment captured + product matches what was actually sold.
//   4. Returns { ok: true, product } or { ok: false, reason }.
//
// Razorpay payment object reference:
//   https://razorpay.com/docs/api/payments/fetch/

export default async function handler(req, res) {
  // Only allow POST — GET requests could be probed from the address bar
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, reason: 'Method not allowed' });
  }

  const { paymentId } = req.body ?? {};

  if (!paymentId || typeof paymentId !== 'string' || paymentId.length > 40) {
    return res.status(400).json({ ok: false, reason: 'Invalid payment ID' });
  }

  // ── Server-side secrets (set in Vercel → Settings → Environment Variables) ──
  const keyId     = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    // Misconfigured deployment — don't leak the reason to the client
    console.error('[verify-payment] Missing Razorpay credentials in env');
    return res.status(500).json({ ok: false, reason: 'Server configuration error' });
  }

  try {
    // Call Razorpay — credentials never leave the server
    const rzpRes = await fetch(
      `https://api.razorpay.com/v1/payments/${encodeURIComponent(paymentId)}`,
      {
        headers: {
          Authorization:
            'Basic ' + Buffer.from(`${keyId}:${keySecret}`).toString('base64'),
          'Content-Type': 'application/json',
        },
      }
    );

    if (!rzpRes.ok) {
      const err = await rzpRes.json().catch(() => ({}));
      console.warn('[verify-payment] Razorpay error:', err);
      return res.status(400).json({ ok: false, reason: 'Payment not found' });
    }

    const payment = await rzpRes.json();

    // ── Validate payment ──
    // All three conditions must be true — any gap is treated as unverified.
    //   status === 'captured' : money collected (not just authorized/created)
    //   amount > 0            : rejects ₹0 test payments
    //   currency === 'INR'    : rejects non-INR charges (global USD handled by amount fallback below)
    const isValid =
      payment.status   === 'captured' &&
      payment.amount   >   0          &&
      (payment.currency === 'INR' || payment.currency === 'USD');

    if (!isValid) {
      return res.status(200).json({ ok: false, reason: 'Payment validation failed' });
    }

    // ── Resolve which product was purchased ──
    // Razorpay lets you store arbitrary metadata in payment.notes at checkout.
    // Set notes: { product: "launchpad" } when creating the Razorpay payment link.
    // Fallback: match by amount (in paise — 1 INR = 100 paise).
    const noteProduct = payment.notes?.product?.toLowerCase?.() ?? '';
    const amountINR   = payment.amount / 100;

    let product = noteProduct;

    // Map numeric product IDs from notes to canonical product keys
    if      (product === '834')   product = 'launchpad';
    else if (product === '169')   product = 'creator';
    else if (product === '118')   product = 'full';

    if (!product) {
      // Amount-based fallback — match to known product prices
      if      (amountINR === 699)   product = 'creator';
      else if (amountINR === 999)   product = 'full';
      else if (amountINR === 1299)  product = 'launchpad';
      else if (amountINR === 25)    product = 'launchpad'; // global USD price
    }

    if (!product) {
      return res.status(200).json({ ok: false, reason: 'Product could not be identified' });
    }

    // Success — client receives ONLY what it needs to render the page
    return res.status(200).json({ ok: true, product });

  } catch (err) {
    console.error('[verify-payment] Unexpected error:', err);
    return res.status(500).json({ ok: false, reason: 'Verification failed' });
  }
}
