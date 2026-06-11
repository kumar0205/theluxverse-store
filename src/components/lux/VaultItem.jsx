import React, { useState } from 'react';

export default function VaultItem({ icon, title, desc, perfectFor, products }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className={`vault-card`} 
      style={{ 
        marginBottom: 20, 
        cursor: 'pointer',
        border: isOpen ? '1px solid rgba(212,175,55,0.4)' : '1px solid rgba(212,175,55,0.1)',
        background: isOpen ? '#111111' : 'transparent',
        transition: 'all 0.3s ease'
      }} 
      onClick={() => setIsOpen(!isOpen)}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20, flexWrap: 'wrap' }}>
        <div style={{ flexShrink: 0 }}>
          {icon}
        </div>
        <div style={{ flex: 1, minWidth: 200 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '1.15rem', color: '#F9E498', marginBottom: 8 }}>
              {title}
            </h3>
            <svg
              width="24" height="24" viewBox="0 0 24 24" fill="none"
              style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}
            >
              <path d="M6 9L12 15L18 9" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.92rem', color: '#8E8E8E', lineHeight: 1.7, marginBottom: 10 }}>
            {desc}
          </p>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(212,175,55,0.06)', border: '1px solid rgba(212,175,55,0.15)', borderRadius: 4, padding: '5px 12px' }}>
            <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.72rem', color: '#D4AF37', letterSpacing: '0.08em' }}>
              PERFECT FOR: {perfectFor}
            </span>
          </div>

          {/* Accordion Content */}
          <div style={{
            display: 'grid',
            gridTemplateRows: isOpen ? '1fr' : '0fr',
            transition: 'grid-template-rows 0.3s ease-in-out',
            marginTop: isOpen ? 20 : 0,
          }}>
            <div style={{ overflow: 'hidden' }}>
              <div style={{ borderTop: '1px solid rgba(212,175,55,0.1)', paddingTop: 16 }}>
                <h4 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.9rem', color: '#ffffff', marginBottom: 12 }}>Detailed Contents:</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
                  {products.map((item, idx) => (
                    <div key={idx} style={{ 
                      fontFamily: 'Inter, sans-serif', 
                      fontSize: '0.85rem', 
                      color: item.includes('Many More') ? '#D4AF37' : '#ffffff', 
                      display: 'flex', 
                      alignItems: 'flex-start', 
                      gap: 8,
                      fontWeight: item.includes('Many More') ? 600 : 400
                    }}>
                      <span style={{ color: '#D4AF37', marginTop: 1 }}>✦</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
