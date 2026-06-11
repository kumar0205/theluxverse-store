import { useState, useEffect } from 'react';

export default function useMobileStickyCTA(heroRef, finalCtaRef) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const heroEl = heroRef?.current;
    const finalEl = finalCtaRef?.current;

    let isPastHero = false;
    let isInsideFinal = false;

    const updateVisibility = () => {
      setVisible(isPastHero && !isInsideFinal);
    };

    // Hero observer: detect when the hero fold is scrolled past (hero leaves viewport top)
    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        // isPastHero is true if hero is NOT intersecting AND has scrolled past the top (bounding rect top is negative)
        isPastHero = !entry.isIntersecting && entry.boundingClientRect.top < 0;
        updateVisibility();
      },
      { threshold: 0 }
    );

    // Final CTA observer: hide the sticky banner when final CTA is in view
    const finalObserver = new IntersectionObserver(
      ([entry]) => {
        isInsideFinal = entry.isIntersecting;
        updateVisibility();
      },
      { threshold: 0.1 }
    );

    if (heroEl) heroObserver.observe(heroEl);
    if (finalEl) finalObserver.observe(finalEl);

    return () => {
      if (heroEl) heroObserver.unobserve(heroEl);
      if (finalEl) finalObserver.unobserve(finalEl);
    };
  }, [heroRef, finalCtaRef]);

  return visible;
}
