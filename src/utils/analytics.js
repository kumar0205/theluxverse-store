export function initAnalytics() {
  const gaId = import.meta.env.VITE_GA_ID;
  const clarityId = import.meta.env.VITE_CLARITY_ID;

  if (gaId) {
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    document.head.appendChild(script1);

    const script2 = document.createElement('script');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      window.gtag = function(){window.dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${gaId}');
    `;
    document.head.appendChild(script2);
    console.log('[Analytics] Google Analytics initialized.');
  }

  if (clarityId) {
    const script3 = document.createElement('script');
    script3.innerHTML = `
      (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window,document,"clarity","script","${clarityId}");
    `;
    document.head.appendChild(script3);
    console.log('[Analytics] Microsoft Clarity initialized.');
  }
}

export function trackEvent(name, params = {}) {
  // 1. Google Analytics Event
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', name, params);
  }
  
  // 2. Microsoft Clarity Event
  if (typeof window !== 'undefined' && typeof window.clarity === 'function') {
    window.clarity('event', name, params);
  }

  // Debug log in dev mode
  if (import.meta.env.DEV) {
    console.log(`[Event Tracked]: ${name}`, params);
  }
}
