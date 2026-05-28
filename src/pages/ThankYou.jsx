import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Particles from '@/components/lux/Particles';

// ── PLACEHOLDER LINKS — ctrl+F to replace ──
const REPLACE_DRIVE_STARTER = '#REPLACE_DRIVE_STARTER';
const REPLACE_DRIVE_CREATOR = '#REPLACE_DRIVE_CREATOR';
const REPLACE_DRIVE_FULL = '#REPLACE_DRIVE_FULL';
const REPLACE_LAUNCHPAD_LINK = '#REPLACE_LAUNCHPAD_LINK';

function GoldDustParticle({ style }) {
  return (
    <div style={{
      position: 'absolute',
      width: 4,
      height: 4,
      borderRadius: '50%',
      background: '#D4AF37',
      boxShadow: '0 0 6px rgba(212,175,55,0.8)',
      animation: 'goldDust 1.5s ease-out forwards',
      ...style,
    }} />
  );
}

function AnimatedCheckmark() {
  const [drawn, setDrawn] = useState(false);
  const [showDust, setShowDust] = useState(false);

  useEffect(() => {
    setTimeout(() => setDrawn(true), 200);
    setTimeout(() => setShowDust(true), 1400);
  }, []);

  const dustParticles = Array.from({ length: 16 }, (_, i) => ({
    '--dx': `${(Math.random() - 0.5) * 120}px`,
    top: '50%', left: '50%',
    transform: 'translate(-50%, -50%)',
    animationDelay: `${i * 0.05}s`,
    animationDuration: `${1 + Math.random() * 0.5}s`,
  }));

  return (
    <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 140, height: 140 }}>
      {showDust && dustParticles.map((p, i) => (
        <GoldDustParticle key={i} style={p} />
      ))}
      <svg width="140" height="140" viewBox="0 0 140 140" fill="none" style={{ position: 'relative', zIndex: 2 }}>
        {/* Outer ring glow */}
        <circle cx="70" cy="70" r="60" stroke="rgba(212,175,55,0.1)" strokeWidth="2" fill="none"/>
        {/* Animated circle */}
        <circle
          cx="70" cy="70" r="55"
          stroke="url(#cgGold)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          style={{
            strokeDasharray: 345,
            strokeDashoffset: drawn ? 0 : 345,
            transition: 'stroke-dashoffset 1s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        />
        {/* Checkmark */}
        <path
          d="M42 70 L62 90 L98 52"
          stroke="url(#cgGold)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          style={{
            strokeDasharray: 100,
            strokeDashoffset: drawn ? 0 : 100,
            transition: 'stroke-dashoffset 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.6s',
          }}
        />
        <defs>
          <linearGradient id="cgGold" x1="0" y1="0" x2="140" y2="140" gradientUnits="userSpaceOnUse">
            <stop stopColor="#D4AF37"/>
            <stop offset="0.5" stopColor="#F9E498"/>
            <stop offset="1" stopColor="#D4AF37"/>
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

export default function ThankYou() {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowContent(true), 1600);
  }, []);

  const accessBtns = [
    { label: 'Access Starter Vault', href: REPLACE_DRIVE_STARTER, sub: 'Ebooks + Digital Products' },
    { label: 'Access Creator Vault', href: REPLACE_DRIVE_CREATOR, sub: 'Reels + Content Library' },
    { label: 'Access Full Vault', href: REPLACE_DRIVE_FULL, sub: 'Courses + AI Templates' },
  ];

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
      <Particles count={6} />

      {/* Background glow */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600, height: 600,
        background: 'radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        position: 'relative', zIndex: 2,
        maxWidth: 660,
        width: '100%',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 32,
      }}>
        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none' }}>
          <span className="font-bebas gold-text" style={{ fontSize: 'clamp(22px, 4vw, 28px)', letterSpacing: '0.1em' }}>
            theluxverse
          </span>
        </Link>

        {/* Checkmark */}
        <AnimatedCheckmark />

        {/* Headline */}
        <div style={{
          opacity: showContent ? 1 : 0,
          transform: showContent ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.7s cubic-bezier(0.22,1,0.36,1)',
        }}>
          <h1 className="font-bebas" style={{
            fontSize: 'clamp(52px, 10vw, 88px)',
            color: '#ffffff',
            lineHeight: 1.05,
            marginBottom: 16,
          }}>
            YOU'RE IN. <span className="gold-text">LFG 🔥</span>
          </h1>
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 'clamp(16px, 2vw, 18px)',
            color: '#8E8E8E',
            lineHeight: 1.7,
            maxWidth: 500,
            margin: '0 auto',
          }}>
            Your vault is ready. Click your access link below to get everything instantly.
          </p>
        </div>

        {/* Access Buttons — Glassmorphism container */}
        <div
          className="glass"
          style={{
            width: '100%',
            padding: '32px 28px',
            opacity: showContent ? 1 : 0,
            transform: showContent ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.7s cubic-bezier(0.22,1,0.36,1) 0.15s',
          }}
        >
          <div className="section-label" style={{ marginBottom: 20, display: 'block', textAlign: 'center' }}>
            YOUR ACCESS LINKS
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {accessBtns.map((btn, i) => (
              <a
                key={i}
                href={btn.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold"
                style={{
                  justifyContent: 'space-between',
                  width: '100%',
                  padding: '16px 24px',
                  animation: showContent ? `wordFadeIn 0.5s ease forwards ${0.3 + i * 0.12}s` : 'none',
                  opacity: 0,
                }}
              >
                <span>{btn.label}</span>
                <span style={{ fontSize: '0.75rem', opacity: 0.7, fontWeight: 400 }}>{btn.sub}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div style={{
          width: '100%', height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.2), transparent)',
          opacity: showContent ? 1 : 0,
          transition: 'opacity 0.5s ease 0.6s',
        }} />

        {/* Upsell box */}
        <div
          style={{
            width: '100%',
            background: 'rgba(212,175,55,0.04)',
            border: '1px solid rgba(212,175,55,0.2)',
            borderRadius: 8,
            padding: '28px 24px',
            opacity: showContent ? 1 : 0,
            transform: showContent ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.7s cubic-bezier(0.22,1,0.36,1) 0.5s',
            textAlign: 'center',
          }}
        >
          <div className="section-label" style={{ marginBottom: 12, display: 'block' }}>LEVEL UP</div>
          <h3 className="font-bebas" style={{
            fontSize: 'clamp(24px, 4vw, 36px)',
            color: '#ffffff',
            marginBottom: 10,
          }}>
            Want to <span className="gold-text">sell these yourself?</span>
          </h3>
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.9rem',
            color: '#8E8E8E',
            lineHeight: 1.6,
            marginBottom: 20,
          }}>
            Join the Launchpad and learn how to turn your vault into a money-making machine — no face, no following required.
          </p>
          <a href={REPLACE_LAUNCHPAD_LINK} className="btn-outline">
            Join The Launchpad →
          </a>
        </div>

        {/* Footer */}
        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '0.75rem',
          color: '#555',
          letterSpacing: '0.05em',
        }}>
          © {new Date().getFullYear()} theluxverse · The Vault. The Edge. The Life.
        </p>
      </div>
    </div>
  );
}