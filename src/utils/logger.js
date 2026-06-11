import * as Sentry from '@sentry/react';

const isProduction = import.meta.env.MODE === 'production';

export const logger = {
  info(message, ...args) {
    console.log(`[INFO] ${message}`, ...args);
    if (isProduction) {
      Sentry.addBreadcrumb({
        category: 'log',
        message: message + (args.length ? ' ' + JSON.stringify(args) : ''),
        level: 'info',
      });
    }
  },
  warn(message, ...args) {
    console.warn(`[WARN] ${message}`, ...args);
    if (isProduction) {
      Sentry.addBreadcrumb({
        category: 'log',
        message: message + (args.length ? ' ' + JSON.stringify(args) : ''),
        level: 'warning',
      });
    }
  },
  error(message, error, ...args) {
    console.error(`[ERROR] ${message}`, error, ...args);
    if (import.meta.env.VITE_SENTRY_DSN) {
      Sentry.withScope((scope) => {
        if (args.length) {
          scope.setExtra('extra_args', args);
        }
        scope.setLevel('error');
        if (error instanceof Error) {
          Sentry.captureException(error, {
            tags: { context: message }
          });
        } else {
          Sentry.captureMessage(`${message}: ${typeof error === 'object' ? JSON.stringify(error) : String(error)}`);
        }
      });
    }
  }
};
