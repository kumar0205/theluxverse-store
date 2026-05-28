import React, { useEffect, useState } from 'react';

// ── PLACEHOLDER LINKS — ctrl+F to replace ──
const REPLACE_INSTAGRAM = '#REPLACE_INSTAGRAM';
const REPLACE_CONTACT = '#REPLACE_CONTACT';

const LINKS = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="2" y="2" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M7 10l4 4 4-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    label: 'Shop The Vault',
    sub: 'Digital products starting ₹299',
    href: '/',
    internal: true,
    primary: true,
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M11 2L13.8 8.3L21 9.3L16 14.1L17.3 21.3L11 17.8L4.7 21.3L6 14.1L1 9.3L8.2 8.3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="none"/>
      </svg>
    ),
    label: 'Join The Launchpad',
    sub: 'Start selling digital products',
    href: '/launchpad',
    internal: true,
    primary: false,
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="2" y="2" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="11" cy="11" r="4" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="16" cy="6" r="1" fill="currentColor"/>
      </svg>
    ),
    label: 'Follow on Instagram',
    sub: '6K+ followers & growing',
    href: REPLACE_INSTAGRAM,
    internal: false,
    primary: false,
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M20 4H2v14h18V4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="none"/>
        <path d="M2 4l9 9 9-9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    label: 'Contact Me',
    sub: 'DMs open. Questions welcome.',
    href: REPLACE_CONTACT,
    internal: false,
    primary: false,
  },
];

function FloatingParticles() {
  const configs = [
    { top: '8%', left: '6%', size: 4, anim: 'float1 7s ease-in-out infinite' },
    { top: '20%', right: '8%', size: 3, anim: 'float2 9s ease-in-out infinite 1s' },
    { top: '45%', left: '3%', size: 5, anim: 'float3 6s ease-in-out infinite 0.5s' },
    { top: '70%', right: '6%', size: 3, anim: 'float4 8s ease-in-out infinite 2s' },
    { top: '85%', left: '15%', size: 4, anim: 'float5 6.5s ease-in-out infinite 1.5s' },
    { top: '55%', right: '15%', size: 2, anim: 'float6 10s ease-in-out infinite 0.8s' },
    { top: '35%', left: '25%', size: 2, anim: 'float1 8s ease-in-out infinite 3s' },
    { top: '15%', left: '40%', size: 3, anim: 'float3 7s ease-in-out infinite 0.3s' },
  ];
  return (
    <>
      {configs.map((c, i) => (
        <div key={i} style={{
          position: 'fixed',
          top: c.top, left: c.left, right: c.right, bottom: c.bottom,
          width: c.size, height: c.size,
          borderRadius: '50%',
          background: 'radial-gradient(circle, #F9E498, #D4AF37)',
          boxShadow: '0 0 10px rgba(212,175,55,0.7)',
          pointerEvents: 'none',
          zIndex: 0,
          animation: c.anim,
        }} />
      ))}
    </>
  );
}

function RippleEffect({ x, y }) {
  return (
    <div
      className="ripple-effect"
      style={{
        left: x - 20,
        top: y - 20,
      }}
    />
  );
}

function LinkButton({ link, delay, visible }) {
  const [ripples, setRipples] = useState([]);

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipples(prev => [...prev, { id, x, y }]);
    setTimeout(() => setRipples(prev => prev.filter(r => r.id !== id)), 700);
  };

  const Tag = link.internal ? 'a' : 'a';

  return (
    <div
      className={`fade-up ${visible ? 'visible' : ''}`}
      style={{ transitionDelay: `${delay}s`, width: '100%', display: 'flex', justifyContent: 'center' }}
    >
      <a
        href={link.href}
        onClick={handleClick}
        style={{
          width: '100%',
          maxWidth: 480,
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          padding: '18px 24px',
          background: link.primary
            ? 'linear-gradient(135deg, #D4AF37, #F9E498, #a8832e)'
            : 'rgba(17,17,17,0.85)',
          border: link.primary ? 'none' : '1px solid rgba(212,175,55,0.25)',
          borderRadius: 6,
          cursor: 'pointer',
          textDecoration: 'none',
          color: link.primary ? '#050505' : '#F9E498',
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 600,
          transition: 'all 0.3s ease',
          position: 'relative',
          overflow: 'hidden',
          backdropFilter: 'blur(10px)',
          boxShadow: link.primary
            ? '0 0 30px rgba(212,175,55,0.3)'
            : '0 4px 20px rgba(0,0,0,0.3)',
        }}
        onMouseEnter={e => {
          const el = e.currentTarget;
          el.style.transform = 'scale(1.02)';
          el.style.boxShadow = link.primary
            ? '0 0 50px rgba(212,175,55,0.5)'
            : '0 0 30px rgba(212,175,55,0.15), 0 4px 20px rgba(0,0,0,0.3)';
          el.style.borderColor = 'rgba(212,175,55,0.5)';
        }}
        onMouseLeave={e => {
          const el = e.currentTarget;
          el.style.transform = 'scale(1)';
          el.style.boxShadow = link.primary
            ? '0 0 30px rgba(212,175,55,0.3)'
            : '0 4px 20px rgba(0,0,0,0.3)';
          el.style.borderColor = 'rgba(212,175,55,0.25)';
        }}
        onMouseDown={e => { e.currentTarget.style.transform = 'scale(0.96)'; }}
        onMouseUp={e => { e.currentTarget.style.transform = 'scale(1.02)'; }}
        target={link.internal ? '_self' : '_blank'}
        rel="noopener noreferrer"
      >
        {ripples.map(r => <RippleEffect key={r.id} x={r.x} y={r.y} />)}
        <span style={{ opacity: link.primary ? 1 : 0.9 }}>{link.icon}</span>
        <div style={{ flex: 1, textAlign: 'left' }}>
          <div style={{ fontSize: '1rem', fontWeight: 600 }}>{link.label}</div>
          <div style={{
            fontSize: '0.75rem',
            fontWeight: 400,
            opacity: 0.65,
            marginTop: 2,
            fontFamily: 'Inter, sans-serif',
          }}>
            {link.sub}
          </div>
        </div>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ opacity: 0.6 }}>
          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </a>
    </div>
  );
}

export default function Links() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: '#050505',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <FloatingParticles />

      {/* Background radial glow */}
      <div style={{
        position: 'fixed',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80vw', height: '80vh',
        background: 'radial-gradient(ellipse at center, rgba(212,175,55,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      <div style={{
        position: 'relative', zIndex: 2,
        width: '100%', maxWidth: 520,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', gap: 24,
      }}>
        {/* Logo */}
        <div
          className={`fade-up ${visible ? 'visible' : ''}`}
          style={{ transitionDelay: '0s', textAlign: 'center' }}
        >
          <div className="font-bebas gold-text" style={{
            fontSize: 'clamp(44px, 12vw, 72px)',
            letterSpacing: '0.1em',
            lineHeight: 1,
            textShadow: '0 0 40px rgba(212,175,55,0.3)',
          }}>
            theluxverse
          </div>
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.85rem',
            color: '#8E8E8E',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginTop: 8,
          }}>
            The Vault. The Edge. The Life.
          </p>
        </div>

        {/* Divider */}
        <div
          className={`fade-up ${visible ? 'visible' : ''}`}
          style={{
            transitionDelay: '0.1s',
            width: '100%', height: 1,
            background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.3), transparent)',
          }}
        />

        {/* Links */}
        {LINKS.map((link, i) => (
          <LinkButton key={i} link={link} delay={0.15 + i * 0.1} visible={visible} />
        ))}

        {/* Divider */}
        <div style={{
          width: '100%', height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.1), transparent)',
        }} />

        {/* Footer */}
        <div
          className={`fade-up ${visible ? 'visible' : ''}`}
          style={{ transitionDelay: '0.7s', textAlign: 'center' }}
        >
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.72rem',
            color: '#555',
            letterSpacing: '0.08em',
          }}>
            © {new Date().getFullYear()} theluxverse. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}