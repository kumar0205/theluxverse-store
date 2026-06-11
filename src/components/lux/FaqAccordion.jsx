import React, { useState } from 'react';

export default React.memo(function FaqAccordion({ items }) {
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
              padding: '24px 28px',
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
              width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="#D4AF37" strokeWidth="2.5"
              strokeLinecap="round" strokeLinejoin="round"
              style={{
                flexShrink: 0,
                transform: openIdx === i ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 200ms ease',
              }}
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
          <div
            style={{
              display: 'grid',
              gridTemplateRows: openIdx === i ? '1fr' : '0fr',
              opacity: openIdx === i ? 1 : 0,
              overflow: 'hidden',
              transition: 'grid-template-rows 300ms cubic-bezier(0.4, 0, 0.2, 1), opacity 250ms ease-in-out',
            }}
          >
            <div style={{ minHeight: 0 }}>
              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.9rem',
                  color: '#8E8E8E',
                  lineHeight: 1.7,
                  padding: '0 28px 24px',
                }}
                dangerouslySetInnerHTML={{ __html: item.a }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
});