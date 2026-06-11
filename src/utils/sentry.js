import * as Sentry from '@sentry/react';

export function initSentry() {
  const dsn = import.meta.env.VITE_SENTRY_DSN;
  if (!dsn) {
    console.log('[Sentry] DSN not found. Skipping initialization.');
    return;
  }

  Sentry.init({
    dsn,
    environment: import.meta.env.MODE || 'development',
    tracesSampleRate: 0.1, // Sample 10% of transactions for performance to save quota
  });
  console.log(`[Sentry] Initialized in ${import.meta.env.MODE} environment.`);
}
