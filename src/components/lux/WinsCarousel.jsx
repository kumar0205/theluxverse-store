import React, { useState, useEffect } from 'react';
import { WIN_SLIDES } from '@/data/launchpad';

const WinsCarousel = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isAutoScrollActive, setIsAutoScrollActive] = useState(true);
  const minSwipeDistance = 50;

  const slides = WIN_SLIDES;

  useEffect(() => {
    if (!isAutoScrollActive) return;
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isAutoScrollActive, slides.length]);

  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      setIsAutoScrollActive(false);
      setActiveIdx((prev) => (prev + 1) % slides.length);
    }
    if (isRightSwipe) {
      setIsAutoScrollActive(false);
      setActiveIdx((prev) => (prev - 1 + slides.length) % slides.length);
    }
  };

  const arrowStyle = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    background: 'rgba(255, 215, 0, 0.15)',
    border: '1px solid rgba(212, 175, 55, 0.3)',
    color: '#D4AF37',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    zIndex: 10
  };

  return (
    <div
      className="relative overflow-hidden max-w-xl mx-auto w-full pb-10"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translate3d(-${activeIdx * 100}%, 0, 0)` }}
      >
        {slides.map((slide, idx) => (
          <div key={idx} className="flex-shrink-0 w-full p-2">
            <div style={{
              background: '#111111',
              border: '1px solid rgba(201,168,76,0.35)',
              borderRadius: '16px',
              padding: '16px',
              height: '100%',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <div className="mb-3">
                <span style={{ color: '#D4AF37', fontSize: '13px', fontWeight: 'bold' }}>🎉 Member Win</span>
              </div>
              <div
                className="w-full h-[320px] sm:h-[450px] md:h-[500px]"
                style={{
                  border: '2px solid rgba(201,168,76,0.5)',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  flexGrow: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: '#000000'
                }}
              >
                {slide.type === 'video' ? (
                  <video
                    src={slide.src}
                    autoPlay
                    muted
                    loop
                    playsInline
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  />
                ) : (
                  <img
                    src={slide.src}
                    alt="Member Win"
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    loading={idx === 0 ? "eager" : "lazy"}
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => {
          setIsAutoScrollActive(false);
          setActiveIdx((prev) => (prev - 1 + slides.length) % slides.length);
        }}
        style={{ ...arrowStyle, left: '16px' }}
        onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255, 215, 0, 0.3)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255, 215, 0, 0.15)'; }}
        aria-label="Previous"
      >
        ❮
      </button>
      <button
        onClick={() => {
          setIsAutoScrollActive(false);
          setActiveIdx((prev) => (prev + 1) % slides.length);
        }}
        style={{ ...arrowStyle, right: '16px' }}
        onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255, 215, 0, 0.3)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255, 215, 0, 0.15)'; }}
        aria-label="Next"
      >
        ❯
      </button>

      <div className="flex justify-center gap-2 mt-4 absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setIsAutoScrollActive(false);
              setActiveIdx(idx);
            }}
            className={`w-2.5 h-2.5 rounded-full border border-[rgba(212,175,55,0.6)] transition-colors ${activeIdx === idx ? 'bg-gradient-to-r from-[#D4AF37] to-[#F9E498]' : 'bg-[#111111]'}`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default React.memo(WinsCarousel);
