import React from 'react';

export default function Particles({ count = 6 }) {
  const configs = [
    { top: '10%', left: '8%', size: 5, anim: 'float1 6s ease-in-out infinite' },
    { top: '30%', right: '12%', size: 3, anim: 'float2 8s ease-in-out infinite 1s' },
    { top: '60%', left: '20%', size: 4, anim: 'float3 7s ease-in-out infinite 0.5s' },
    { top: '20%', right: '28%', size: 2, anim: 'float4 9s ease-in-out infinite 2s' },
    { top: '75%', right: '18%', size: 5, anim: 'float5 5.5s ease-in-out infinite 1.5s' },
    { top: '50%', left: '5%', size: 3, anim: 'float6 7.5s ease-in-out infinite 0.8s' },
  ];
  return (
    <>
      {configs.slice(0, count).map((c, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: c.top, left: c.left, right: c.right,
            width: c.size, height: c.size,
            borderRadius: '50%',
            background: 'radial-gradient(circle, #F9E498, #D4AF37)',
            boxShadow: '0 0 10px rgba(212,175,55,0.8)',
            pointerEvents: 'none',
            animation: c.anim,
          }}
        />
      ))}
    </>
  );
}