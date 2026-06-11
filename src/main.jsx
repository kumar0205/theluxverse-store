import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App.jsx'
import '@/index.css'
import { initSentry } from '@/utils/sentry'
import { initAnalytics } from '@/utils/analytics'

// Initialize tracking and logging tools
initSentry();
initAnalytics();

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
);
