import React, { useState } from 'react';
import Navbar from '@/components/lux/Navbar';
import Footer from '@/components/lux/Footer';
import FaqAccordion from '@/components/lux/FaqAccordion';
import useFadeUp from '@/hooks/useFadeUp';

// ── PLACEHOLDER LINKS — ctrl+F to replace ──
const REPLACE_AFFILIATE_LINK = '#REPLACE_AFFILIATE_LINK';
const REPLACE_INSTAGRAM = '#REPLACE_INSTAGRAM';

const STEPS = [
  {
    number: '01',
    title: 'Pick Your Product',
    desc: 'Choose from 1M+ ready-to-sell digital products in your vault. No creation needed. Just select and go.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect x="6" y="8" width="28" height="24" rx="3" stroke="url(#lp1)" strokeWidth="1.5" fill="none"/>
        <path d="M14 18h12M14 23h8" stroke="url(#lp1)" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="30" cy="12" r="5" fill="none" stroke="url(#lp1)" strokeWidth="1.5"/>
        <path d="M28.5 12h3M30 10.5v3" stroke="url(#lp1)" strokeWidth="1.2" strokeLinecap="round"/>
        <defs><linearGradient id="lp1" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse"><stop stopColor="#D4AF37"/><stop offset="1" stopColor="#F9E498"/></linearGradient></defs>
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Set Up Your Link Page',
    desc: 'Create a simple link-in-bio page (like this one). Link your product. Share your price. Done in under 10 minutes.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect x="8" y="4" width="24" height="32" rx="3" stroke="url(#lp2)" strokeWidth="1.5" fill="none"/>
        <rect x="13" y="12" width="14" height="3" rx="1.5" fill="url(#lp2)" opacity="0.5"/>
        <rect x="13" y="18" width="14" height="3" rx="1.5" fill="url(#lp2)" opacity="0.5"/>
        <rect x="13" y="24" width="9" height="3" rx="1.5" fill="url(#lp2)" opacity="0.5"/>
        <path d="M12 7h16" stroke="url(#lp2)" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
        <defs><linearGradient id="lp2" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse"><stop stopColor="#D4AF37"/><stop offset="1" stopColor="#F9E498"/></linearGradient></defs>
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Post Content & Earn',
    desc: 'Use the 10K+ reels and templates to post daily content. Drive traffic. People pay. You earn. Repeat.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <path d="M8 32 L8 20 L14 26 L20 14 L26 22 L32 8" stroke="url(#lp3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="32" cy="8" r="3" fill="url(#lp3)" opacity="0.6"/>
        <path d="M28 32h8M32 28v8" stroke="url(#lp3)" strokeWidth="1.5" strokeLinecap="round"/>
        <defs><linearGradient id="lp3" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse"><stop stopColor="#D4AF37"/><stop offset="1" stopColor="#F9E498"/></linearGradient></defs>
      </svg>
    ),
  },
];

const INCLUDES = [
  'Master Resell Rights on all vault products',
  'Done-for-you pricing strategy guide',
  'Reels script templates (plug and post)',
  'Caption swipe file (100+ viral captions)',
  'Sales funnel blueprint for beginners',
  'Payment setup walkthrough (UPI + Razorpay)',
  'DM closing scripts that convert',
  'Ongoing updates as trends change',
];

const LP_FAQ = [
  {
    q: 'Do I need to have a following to start?',
    a: 'No. The Launchpad teaches you how to build and monetize from zero. Many students made their first sale before reaching 500 followers.',
  },
  {
    q: 'What products will I be selling?',
    a: 'The same products from the vault — ebooks, reels packs, AI templates, and courses — all with resell rights. You keep 100% of what you earn.',
  },
  {
    q: 'How fast can I make my first sale?',
    a: 'Most people land their first sale within 7 days of following the system. Some within 48 hours. Results vary by effort.',
  },
  {
    q: 'Is this an MLM or pyramid scheme?',
    a: 'Absolutely not. You\'re buying digital products with resell rights and selling them independently. No recruitment required. No uplines. Just business.',
  },
];

function StarfieldBg() {
  const dots = Array.from({ length: 60 }, (_, i) => ({
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: Math.random() > 0.8 ? 2 : 1,
    delay: `${Math.random() * 4}s`,
    duration: `${3 + Math.random() * 4}s`,
  }));
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {dots.map((d, i) => (
        <div key={i} style={{
          position: 'absolute',
          left: d.left, top: d.top,
          width: d.size, height: d.size,
          borderRadius: '50%',
          background: '#ffffff',
          opacity: 0.3,
          animation: `twinkle ${d.duration} ease-in-out ${d.delay} infinite`,
        }} />
      ))}
    </div>
  );
}

export default function Launchpad() {
  const { ref: stepsRef, visible: stepsVisible } = useFadeUp();
  const { ref: includesRef, visible: includesVisible } = useFadeUp();
  const { ref: faqRef, visible: faqVisible } = useFadeUp();

  const CheckIcon = () => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
      <circle cx="9" cy="9" r="8" stroke="#D4AF37" strokeWidth="1" fill="rgba(212,175,55,0.05)"/>
      <path d="M5.5 9L8 11.5L12.5 7" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  return (
    <div style={{ background: '#050505', minHeight: '100vh', overflowX: 'hidden' }}>
      <Navbar />

      {/* ── HERO ── */}
      <section style={{
        minHeight: '92vh',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '120px 20px 80px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: 'radial-gradient(ellipse at center, #100d00 0%, #050505 70%)',
      }}>
        <StarfieldBg />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: 800 }}>
          <span className="section-label" style={{
            marginBottom: 24, display: 'inline-block',
            background: 'rgba(212,175,55,0.08)',
            border: '1px solid rgba(212,175,55,0.3)',
            padding: '6px 16px', borderRadius: 3,
          }}>
            THE LAUNCHPAD
          </span>
          <h1 className="font-bebas" style={{
            fontSize: 'clamp(44px, 8vw, 100px)',
            lineHeight: 1.05,
            color: '#ffffff',
            marginBottom: 24,
          }}>
            START SELLING DIGITAL PRODUCTS{' '}
            <span className="gold-text">IN 3 STEPS</span>
          </h1>
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 'clamp(16px, 2.5vw, 20px)',
            color: '#8E8E8E',
            lineHeight: 1.7,
            maxWidth: 580,
            margin: '0 auto 44px',
          }}>
            No face. No following. No experience needed. Just a vault, a phone, and the will to execute.
          </p>
          <a href={REPLACE_AFFILIATE_LINK} className="btn-gold pulse-glow" style={{ fontSize: '1rem' }}>
            Start The Launchpad →
          </a>
        </div>
      </section>

      <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.3), transparent)' }} />

      {/* ── PAIN ── */}
      <section style={{
        padding: 'clamp(60px, 8vw, 100px) 20px',
        background: '#050505',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <span className="section-label" style={{ marginBottom: 20, display: 'block' }}>THE PROBLEM</span>
          <h2 className="font-bebas" style={{
            fontSize: 'clamp(32px, 5vw, 60px)',
            color: '#ffffff',
            lineHeight: 1.1,
            marginBottom: 20,
          }}>
            You're sitting on a goldmine{' '}
            <span className="gold-text">and don't even know it.</span>
          </h2>
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 'clamp(15px, 2vw, 18px)',
            color: '#8E8E8E',
            lineHeight: 1.7,
          }}>
            The vault products you just bought? Other people are selling them for thousands of rupees every month. The only difference between you and them is that they took action. The Launchpad gives you the exact system to do the same.
          </p>
        </div>
      </section>

      <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.15), transparent)' }} />

      {/* ── 3 STEPS ── */}
      <section style={{
        padding: 'clamp(60px, 10vw, 120px) 20px',
        background: 'radial-gradient(ellipse at center, #0d0b00 0%, #050505 80%)',
        position: 'relative',
      }}>
        <StarfieldBg />
        <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <span className="section-label" style={{ marginBottom: 16, display: 'block' }}>THE SYSTEM</span>
            <h2 className="font-bebas" style={{
              fontSize: 'clamp(36px, 5vw, 64px)',
              color: '#ffffff',
            }}>
              Three Steps. <span className="gold-text">One Mission.</span>
            </h2>
          </div>
          <div
            ref={stepsRef}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 24,
            }}
          >
            {STEPS.map((step, i) => (
              <div
                key={i}
                className={`vault-card fade-up ${stepsVisible ? 'visible' : ''}`}
                style={{ transitionDelay: `${i * 0.15}s` }}
              >
                <div style={{ marginBottom: 20 }}>{step.icon}</div>
                <div className="font-bebas" style={{
                  fontSize: '3rem',
                  background: 'linear-gradient(135deg, #D4AF37, #F9E498)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  lineHeight: 1,
                  marginBottom: 12,
                }}>
                  {step.number}
                </div>
                <h3 style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  color: '#F9E498',
                  marginBottom: 12,
                }}>
                  {step.title}
                </h3>
                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.9rem',
                  color: '#8E8E8E',
                  lineHeight: 1.6,
                }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.2), transparent)' }} />

      {/* ── WHAT'S INCLUDED ── */}
      <section style={{
        padding: 'clamp(60px, 10vw, 120px) 20px',
        background: '#050505',
      }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div
            ref={includesRef}
            className={`fade-up ${includesVisible ? 'visible' : ''}`}
            style={{ textAlign: 'center', marginBottom: 48 }}
          >
            <span className="section-label" style={{ marginBottom: 16, display: 'block' }}>WHAT YOU GET</span>
            <h2 className="font-bebas" style={{
              fontSize: 'clamp(32px, 5vw, 60px)',
              color: '#ffffff',
            }}>
              Everything You Need <span className="gold-text">To Win</span>
            </h2>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 14,
          }}>
            {INCLUDES.map((item, i) => (
              <div
                key={i}
                className={`fade-up ${includesVisible ? 'visible' : ''}`}
                style={{
                  transitionDelay: `${i * 0.08}s`,
                  display: 'flex', alignItems: 'flex-start', gap: 12,
                  padding: '14px 18px',
                  background: '#0D0D0D',
                  border: '1px solid rgba(212,175,55,0.08)',
                  borderRadius: 6,
                }}
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
                  <circle cx="9" cy="9" r="8" stroke="#D4AF37" strokeWidth="1" fill="rgba(212,175,55,0.05)"/>
                  <path d="M5.5 9L8 11.5L12.5 7" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.9rem',
                  color: '#F9E498',
                  lineHeight: 1.5,
                }}>
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.2), transparent)' }} />

      {/* ── BIG CTA ── */}
      <section style={{
        padding: 'clamp(80px, 12vw, 160px) 20px',
        background: 'radial-gradient(ellipse at center, #1a1400 0%, #050505 80%)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <StarfieldBg />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 700, margin: '0 auto' }}>
          <h2 className="font-bebas" style={{
            fontSize: 'clamp(44px, 8vw, 96px)',
            color: '#ffffff',
            lineHeight: 1.05,
            marginBottom: 20,
          }}>
            STOP WATCHING. <span className="gold-text">START EARNING.</span>
          </h2>
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 'clamp(15px, 2vw, 18px)',
            color: '#8E8E8E',
            lineHeight: 1.7,
            marginBottom: 40,
            maxWidth: 500,
            margin: '0 auto 40px',
          }}>
            The Launchpad gives you the exact blueprint. Your vault gives you the products. The only thing missing is your decision.
          </p>
          <a href={REPLACE_AFFILIATE_LINK} className="btn-gold pulse-glow" style={{ fontSize: '1.05rem' }}>
            Join The Launchpad Now →
          </a>
        </div>
      </section>

      <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.2), transparent)' }} />

      {/* ── FAQ ── */}
      <section style={{
        padding: 'clamp(60px, 8vw, 100px) 20px',
        background: '#050505',
      }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div
            ref={faqRef}
            className={`fade-up ${faqVisible ? 'visible' : ''}`}
            style={{ textAlign: 'center', marginBottom: 48 }}
          >
            <span className="section-label" style={{ marginBottom: 16, display: 'block' }}>FAQ</span>
            <h2 className="font-bebas" style={{ fontSize: 'clamp(32px, 5vw, 56px)', color: '#ffffff' }}>
              Real Questions. <span className="gold-text">Real Answers.</span>
            </h2>
          </div>
          <FaqAccordion items={LP_FAQ} />
        </div>
      </section>

      <Footer instagramLink={REPLACE_INSTAGRAM} />
    </div>
  );
}