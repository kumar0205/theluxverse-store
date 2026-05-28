import React from 'react';

export default function GoldDivider() {
  return (
    <div style={{
      width: '100%',
      height: 1,
      background: 'linear-gradient(90deg, transparent, #D4AF37, #F9E498, #D4AF37, transparent)',
      opacity: 0.3,
      boxShadow: '0 0 12px rgba(212,175,55,0.3)',
    }} />
  );
}