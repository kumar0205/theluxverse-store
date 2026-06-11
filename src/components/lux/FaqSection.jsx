import React, { useState } from 'react';
import { FAQ_ITEMS } from '@/data/launchpad';
import ScrollReveal from '@/components/lux/ScrollReveal';

const FaqSection = () => {
  const [faqOpenIdx, setFaqOpenIdx] = useState(null);

  return (
    <section style={{ padding: 'clamp(56px, 8vw, 100px) 20px', background: '#050505' }}>
      <ScrollReveal style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 50 }}>
          <span className="section-label">QUICK ANSWERS, ZERO FLUFF</span>
          <h2 className="font-bebas" style={{ fontSize: 'clamp(32px, 5vw, 48px)', color: '#ffffff', marginTop: 12, lineHeight: 1.1 }}>
            Frequently Asked Questions
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = faqOpenIdx === idx;
            return (
              <div
                key={idx}
                style={{
                  border: '1px solid',
                  borderColor: isOpen ? 'rgba(212,175,55,0.4)' : 'rgba(212,175,55,0.1)',
                  borderRadius: '8px',
                  background: isOpen ? '#111111' : '#0D0D0D',
                  transition: 'all 0.3s ease',
                  marginBottom: '8px',
                  overflow: 'hidden'
                }}
              >
                <button
                  onClick={() => setFaqOpenIdx(isOpen ? null : idx)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '20px 24px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    gap: '16px'
                  }}
                >
                  <span style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: 600,
                    fontSize: '1rem',
                    color: isOpen ? '#D4AF37' : '#ffffff',
                    transition: 'color 0.3s'
                  }}>
                    {item.q}
                  </span>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#D4AF37"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 200ms ease',
                      flexShrink: 0
                    }}
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateRows: isOpen ? '1fr' : '0fr',
                    opacity: isOpen ? 1 : 0,
                    transition: 'grid-template-rows 300ms cubic-bezier(0.4, 0, 0.2, 1), opacity 250ms ease-in-out',
                    overflow: 'hidden'
                  }}
                >
                  <div style={{ minHeight: 0 }}>
                    <p
                      className="faq-answer-text"
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '0.95rem',
                        color: '#8E8E8E',
                        lineHeight: 1.7,
                        padding: '0 24px 20px'
                      }}
                      dangerouslySetInnerHTML={{ __html: item.a }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollReveal>
    </section>
  );
};

export default React.memo(FaqSection);
