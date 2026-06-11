import React from 'react';

export default function CheckMark({ yes, style = {} }) {
  const mergedStyle = { flexShrink: 0, ...style };
  return yes ? (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={mergedStyle}>
      <circle cx="10" cy="10" r="9" fill="rgba(212,175,55,0.1)" stroke="#D4AF37" strokeWidth="1" />
      <path d="M6 10l3 3 5-6" stroke="#D4AF37" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ) : (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={mergedStyle}>
      <circle cx="10" cy="10" r="9" fill="rgba(100,100,100,0.06)" stroke="rgba(100,100,100,0.2)" strokeWidth="1" />
      <path d="M7 10h6" stroke="#555" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
