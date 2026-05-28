import React, { useState } from 'react';

export default function FaqAccordion({ items }) {
  const [openIdx, setOpenIdx] = useState(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {items.map((item, i) => (
        <div
          key={i}
          style={{
            border: '1px solid',
            borderColor: openIdx === i ? 'rgba(212,175,55,0.4)' : 'rgba(212,175,55,0.1)',
            borderRadius: 6,
            overflow: 'hidden',
            background: openIdx === i ? '#111111' : '#0D0D0D',
            transition: 'all 0.3s ease',
            marginBottom: 4,
          }}
        >
          <button
            onClick={() => setOpenIdx(openIdx === i ? null : i)}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '20px 24px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              gap: 16,
              textAlign: 'left',
            }}
          >
            <span style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '0.95rem',
              fontWeight: 500,
              color: openIdx === i ? '#F9E498' : '#ffffff',
              transition: 'color 0.3s',
              lineHeight: 1.5,
            }}>
              {item.q}
            </span>
            <svg
              width="20" height="20" viewBox="0 0 20 20" fill="none"
              className={`faq-arrow ${openIdx === i ? 'open' : ''}`}
              style={{ flexShrink: 0 }}
            >
              <line x1="10" y1="4" x2="10" y2="16" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round"/>
              <line x1="4" y1="10" x2="16" y2="10" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
          <div className={`faq-content ${openIdx === i ? 'open' : ''}`}>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.9rem',
              color: '#8E8E8E',
              lineHeight: 1.7,
              padding: '0 24px 20px',
            }}>
              {item.a}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}