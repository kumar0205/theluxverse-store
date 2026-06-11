import crypto from 'crypto';

export const config = {
  api: {
    bodyParser: false,
  },
};

async function getRawBody(readable) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, reason: 'Method not allowed' });
  }

  const signature = req.headers['x-razorpay-signature'];
  if (!signature) {
    console.warn('[Webhook] Missing x-razorpay-signature header');
    return res.status(400).json({ ok: false, reason: 'Missing signature' });
  }

  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!secret) {
    console.error('[Webhook] Missing RAZORPAY_WEBHOOK_SECRET in environment variables');
    return res.status(500).json({ ok: false, reason: 'Server configuration error' });
  }

  try {
    const rawBody = await getRawBody(req);
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(rawBody)
      .digest('hex');

    // timingSafeEqual requires buffers of exact same length to prevent throwing RangeError
    if (signature.length !== expectedSignature.length) {
      console.warn('[Webhook] Signature length mismatch');
      return res.status(400).json({ ok: false, reason: 'Invalid signature' });
    }

    const isSignatureValid = crypto.timingSafeEqual(
      Buffer.from(signature, 'utf8'),
      Buffer.from(expectedSignature, 'utf8')
    );

    if (!isSignatureValid) {
      console.warn('[Webhook] Signature verification failed');
      return res.status(400).json({ ok: false, reason: 'Invalid signature' });
    }

    // Successfully verified! Parse payload for logging/analytics
    const payload = JSON.parse(rawBody.toString('utf8'));
    console.log('[Webhook] Verified webhook received successfully. Event:', payload.event);

    // Note: Google Apps Script remains responsible for actual customer email delivery.
    // This serverless webhook is used for telemetry, security validation, and API logging.
    return res.status(200).json({
      ok: true,
      message: 'Signature verified',
      event: payload.event,
      paymentId: payload.payload?.payment?.entity?.id
    });

  } catch (err) {
    console.error('[Webhook] Error processing webhook:', err);
    return res.status(500).json({ ok: false, reason: 'Webhook processing failed' });
  }
}
