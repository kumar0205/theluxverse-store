import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/lux/Navbar';
import ArrowIcon from '@/components/lux/ArrowIcon';
import Footer from '@/components/lux/Footer';
import { PRODUCTS } from '@/config/products';
import CheckMark from '@/components/lux/CheckMark';

// ── PLACEHOLDER LINKS — replace before going live ──
const REPLACE_RAZORPAY_CREATOR = PRODUCTS.creatorVault.url;
const REPLACE_RAZORPAY_FULL = PRODUCTS.fullVault.url;

// ── OUTCOME-BASED FEATURE ROWS ──
// Full Vault: all outcomes included
const FULL_FEATURES = [
  { label: 'Publish products and keep 100% of every sale', included: true },
  { label: 'Never run out of content ideas (15K+ reels)', included: true },
  { label: 'Build authority with 1,000+ premium courses', included: true },
  { label: 'Automate with 15k+ AI agent templates', included: true },
  { label: 'Grow a faceless audience from Day 1', included: true },
  { label: 'Sell reels and keep all profits', included: true },
];

// Creator Vault: reels rows show "Available in Full Vault" note
const CREATOR_FEATURES = [
  { label: 'Publish products and keep 100% of every sale', included: true },
  { label: 'Never run out of content ideas (15K+ reels)', included: false, softNote: 'Available in Full Vault' },
  { label: 'Build authority with 1,000+ premium courses', included: true },
  { label: 'Automate with 15k+ AI agent templates', included: true },
  { label: 'Grow a faceless audience from Day 1', included: false, softNote: 'Available in Full Vault' },
  { label: 'Sell reels and keep all profits', included: false, softNote: 'Available in Full Vault' },
];

// ── FAQ DATA ──
const FAQ_ITEMS = [
  {
    q: 'Is this a one-time payment?',
    a: 'Yes, 100%. You pay once and own everything forever — no subscriptions, no monthly fees, no hidden charges. The price you see is the only payment you ever make.',
  },
  {
    q: 'How do I receive the files after payment?',
    a: 'Instantly. Within seconds of completing your Razorpay payment you will see a secure Google Drive link on screen, and we will also email it to you for permanent access anytime.',
  },
  {
    q: 'Can I legally resell these products?',
    a: 'Yes. Every product in both vaults comes with Master Resell Rights (MRR) or Private Label Rights (PLR). You can edit, rebundle, rename, and sell them — and keep 100% of every rupee you earn.',
  },
];

// ── ICONS ──
const CheckIcon = ({ size = 16, color = '#22c55e' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
    style={{ flexShrink: 0 }}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const ChevronIcon = ({ open }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="#D4AF37" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
    style={{ flexShrink: 0, transition: 'transform 250ms ease', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}>
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

// ── FEATURE ROW — handles soft "available in full vault" note ──
const FeatureRow = ({ label, included, softNote, dimmed }) => (
  <li style={{
    display: 'flex', alignItems: 'flex-start', gap: '10px',
    padding: '8px 0',
    borderBottom: '1px solid rgba(255,255,255,0.04)',
  }}>
    {included ? (
      <CheckIcon color={dimmed ? '#3a3a3a' : '#22c55e'} />
    ) : (
      // soft dot instead of cross
      <span style={{
        width: 16, height: 16, flexShrink: 0, display: 'flex',
        alignItems: 'center', justifyContent: 'center', marginTop: 1,
      }}>
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#333' }} />
      </span>
    )}
    <span style={{
      fontFamily: 'Inter, sans-serif', fontSize: dimmed ? '13px' : '13.5px',
      color: included ? (dimmed ? '#3a3a3a' : '#C8C8C8') : '#3a3a3a',
      lineHeight: 1.45, flex: 1,
    }}>
      {label}
      {!included && softNote && (
        <span style={{
          display: 'inline-block', marginLeft: 6,
          fontFamily: 'Inter, sans-serif', fontSize: '11px',
          color: '#D4AF37', fontWeight: 600,
          background: 'rgba(212,175,55,0.08)',
          border: '1px solid rgba(212,175,55,0.2)',
          borderRadius: '4px', padding: '1px 6px',
        }}>
          {softNote}
        </span>
      )}
    </span>
  </li>
);

// ── FAQ ITEM ──
const FaqItem = ({ item, isOpen, onToggle }) => (
  <div style={{
    borderRadius: '10px',
    border: isOpen ? '1px solid rgba(212,175,55,0.35)' : '1px solid rgba(255,255,255,0.07)',
    background: isOpen ? '#111111' : '#0D0D0D',
    transition: 'border-color 0.25s, background 0.25s',
    overflow: 'hidden',
  }}>
    <button
      onClick={onToggle}
      aria-expanded={isOpen}
      style={{
        width: '100%', display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', gap: '16px',
        padding: '20px', background: 'none', border: 'none',
        cursor: 'pointer', textAlign: 'left',
      }}
    >
      <span style={{
        fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '0.95rem',
        color: isOpen ? '#D4AF37' : '#ffffff', transition: 'color 0.25s',
      }}>
        {item.q}
      </span>
      <ChevronIcon open={isOpen} />
    </button>
    <div style={{
      display: 'grid',
      gridTemplateRows: isOpen ? '1fr' : '0fr',
      opacity: isOpen ? 1 : 0,
      overflow: 'hidden',
      transition: 'grid-template-rows 300ms cubic-bezier(0.4, 0, 0.2, 1), opacity 250ms ease-in-out',
    }}>
      <div style={{ minHeight: 0 }}>
        <p style={{
          fontFamily: 'Inter, sans-serif', fontSize: '0.9rem',
          color: '#8E8E8E', lineHeight: 1.7,
          padding: '0 20px 20px', margin: 0,
        }}>
          {item.a}
        </p>
      </div>
    </div>
  </div>
);

// ══════════════════════════════════════════════════
// MAIN COMPONENT
// ══════════════════════════════════════════════════
export default function VaultPage() {
  const [openFaqIdx, setOpenFaqIdx] = useState(null);
  const handleFaqToggle = idx => setOpenFaqIdx(prev => prev === idx ? null : idx);

  return (
    <div style={{
      background: '#0F0F13', minHeight: '100vh',
      display: 'flex', flexDirection: 'column',
    }}>
      <Navbar />

      {/* ── KEYFRAMES ── */}
      <style>{`
        @keyframes ctaPulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(234,179,8,0.3), 0 6px 30px rgba(234,179,8,0.35); }
          50%      { box-shadow: 0 0 0 12px rgba(234,179,8,0), 0 6px 40px rgba(234,179,8,0.55); }
        }
        .cta-pulse { animation: ctaPulse 2.6s ease-in-out infinite; }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fiu  { animation: fadeInUp 0.55s ease forwards; }
        .fiu1 { animation: fadeInUp 0.55s 0.1s ease both; }
        .fiu2 { animation: fadeInUp 0.55s 0.22s ease both; }
        .fiu3 { animation: fadeInUp 0.55s 0.38s ease both; }
        .back-btn:hover svg { transform: translateX(-4px); }
      `}</style>

      {/* ── MAIN CONTENT ── */}
      <div style={{
        flex: 1,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        padding: '160px 20px 80px',
      }}>

        {/* ── HEADLINE ── */}
        <div className="fiu" style={{ maxWidth: '680px', width: '100%', textAlign: 'center', marginBottom: '48px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '32px' }}>
            <Link
              to="/launchpad"
              className="back-btn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.15), rgba(249, 228, 152, 0.05))',
                border: '1px solid #D4AF37',
                borderRadius: '999px',
                padding: '10px 24px',
                color: '#F9E498',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '13px',
                fontWeight: '700',
                textDecoration: 'none',
                boxShadow: '0 4px 15px rgba(212, 175, 55, 0.15)',
                transition: 'all 0.2s ease-in-out',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(212, 175, 55, 0.2)';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(212, 175, 55, 0.3)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(212, 175, 55, 0.12)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(212, 175, 55, 0.15)';
              }}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ transition: 'transform 0.2s ease-in-out' }}
              >
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              Back to System
            </Link>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '12px',
              color: '#666',
              marginTop: '8px',
              marginBottom: 0,
              letterSpacing: '0.02em',
            }}>
              For step-by-step training,lifetime updates, & private community
            </p>
          </div>

          <p style={{
            fontFamily: 'Inter, sans-serif', fontSize: 'clamp(14px, 2vw, 16px)',
            color: '#666', lineHeight: 1.7, maxWidth: '520px', margin: '0 auto',
          }}>
            💡 Not ready for the full{' '}
            <span style={{ color: '#D4AF37', fontWeight: 600 }}>Launchpad</span>{' '}
            system? 
          </p>

          {/* #10 — more conversational headline */}
          <h1 className="font-bebas" style={{
            fontSize: 'clamp(36px, 7vw, 64px)',
            color: '#ffffff',
            lineHeight: 1.05, marginTop: '14px',
            letterSpacing: '0.03em',
          }}>
            Start With The {' '}
            <span style={{
              background: 'linear-gradient(135deg, #D4AF37 0%, #F9E498 50%, #D4AF37 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              Just Core Assets
            </span>
          </h1>

          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#444', marginTop: '10px' }}>
            One-time payment &nbsp;·&nbsp; Instant Google Drive Access &nbsp;·&nbsp; 100% profit kept
          </p>
        </div>

        {/* ── PRICING CARDS ── */}
        <div
          id="vault-cards"
          className="fiu1"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px', width: '100%', maxWidth: '860px',
            alignItems: 'start',
          }}
        >

          {/* ════════════════════════════
            CARD 1 — Full Vault (TARGET)
            ════════════════════════════ */}
          <div style={{
            background: '#111111',
            border: '1px solid #EAB308',
            borderRadius: '16px',
            padding: '32px 26px 36px',           /* #12 — larger padding = taller feel */
            display: 'flex', flexDirection: 'column', gap: '20px',
            boxShadow: '0 0 40px rgba(234,179,8,0.3), 0 20px 60px rgba(0,0,0,0.5)', /* #12 — stronger shadow */
            position: 'relative',
          }}>

            {/* #6 — Bigger BEST VALUE badge */}
            <div style={{
              position: 'absolute', top: '-15px', left: '50%',
              transform: 'translateX(-50%)',
              background: 'linear-gradient(135deg, #D4AF37, #F9E498)',
              color: '#050505',
              fontFamily: 'Poppins, sans-serif', fontWeight: 800,
              fontSize: '11px', letterSpacing: '0.18em',
              padding: '7px 22px', borderRadius: '999px',
              whiteSpace: 'nowrap',
              boxShadow: '0 4px 12px rgba(212,175,55,0.4)',
            }}>
              ✦ BEST VALUE
            </div>

            {/* Header */}
            <div>
              <p style={{
                fontFamily: 'Poppins, sans-serif', fontWeight: 600,
                fontSize: '11px', letterSpacing: '0.15em',
                textTransform: 'uppercase', color: '#D4AF37',
                marginBottom: '8px', marginTop: '8px',
              }}>
                Complete Arsenal
              </p>
              <h2 style={{
                fontFamily: 'Poppins, sans-serif', fontWeight: 700,
                fontSize: '24px', color: '#ffffff', marginBottom: '6px',
              }}>
                Full Vault
              </h2>

              {/* ₹999 price display */}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', flexWrap: 'wrap' }}>
                <span style={{
                  fontFamily: 'Poppins, sans-serif', fontWeight: 700,
                  fontSize: '44px', lineHeight: 1,
                  background: 'linear-gradient(135deg, #D4AF37 0%, #F9E498 50%, #D4AF37 100%)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                }}>₹999</span>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#555' }}>one-time</span>
              </div>
              {/* Best value nudge */}
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                marginTop: '8px',
                background: 'rgba(212,175,55,0.1)',
                border: '1px solid rgba(212,175,55,0.3)',
                borderRadius: '6px', padding: '4px 10px',
              }}>
                <span style={{
                  fontFamily: 'Inter, sans-serif', fontSize: '12px',
                  color: '#D4AF37', fontWeight: 700,
                }}>
                  Includes 15k+ Reels Content Engine
                </span>
              </div>
            </div>

            {/* Summary description */}
            <p style={{
              fontFamily: 'Inter, sans-serif', fontSize: '13.5px',
              color: '#8E8E8E', lineHeight: 1.6, margin: '12px 0 20px',
            }}>
              Unlock everything: all courses, agent templates, ebooks, resell rights, plus the viral 15k+ reels content engine.
            </p>

            {/* #5 — keep gold CTA, make it larger */}
            <a
              href={REPLACE_RAZORPAY_FULL}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-pulse"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                gap: '8px', padding: '19px 20px',
                background: 'linear-gradient(135deg, #D4AF37, #F9E498, #a8832e)',
                borderRadius: '12px',
                fontFamily: 'Poppins, sans-serif', fontWeight: 700,
                fontSize: '17px', color: '#050505',
                textDecoration: 'none', width: '100%',
                letterSpacing: '0.02em',
              }}
            >
              Get Full Vault — ₹999 <ArrowIcon />
            </a>

            {/* #7 — social proof microcopy */}
            <div style={{ textAlign: 'center' }}>
              <p style={{
                fontFamily: 'Inter, sans-serif', fontSize: '13px',
                color: '#D4AF37', fontWeight: 600, margin: '0 0 4px',
              }}>
                Most people choose this option.
              </p>
              <p style={{
                fontFamily: 'Inter, sans-serif', fontSize: '11.5px',
                color: '#444', margin: 0,
              }}>
                🔒 Secure Razorpay checkout &nbsp;·&nbsp; ⚡ Instant Drive access
              </p>
            </div>

            {/* See Details */}
            <Link
              to="/full-vault"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                gap: '6px', fontFamily: 'Inter, sans-serif', fontSize: '13px',
                color: '#D4AF37', opacity: 0.7, textDecoration: 'none',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = '1'}
              onMouseLeave={e => e.currentTarget.style.opacity = '0.7'}
            >
              See full details
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </Link>
          </div>

          {/* ════════════════════════════
            CARD 2 — Creator Vault (DECOY)
            ════════════════════════════ */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: '16px',
            padding: '24px 22px 28px',                /* #12 — less padding = shorter */
            display: 'flex', flexDirection: 'column', gap: '16px',
          }}>

            {/* Header */}
            <div>
              <p style={{
                fontFamily: 'Poppins, sans-serif', fontWeight: 500,
                fontSize: '10px', letterSpacing: '0.12em',
                textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.6)',
                marginBottom: '6px',
              }}>
                Starter
              </p>
              <h2 style={{
                fontFamily: 'Poppins, sans-serif', fontWeight: 600,
                fontSize: '24px', color: '#ffffff', marginBottom: '4px',
              }}>
                Creator Vault
              </h2>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '4px' }}>
                <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '44px', color: '#ffffff', lineHeight: 1, }}>₹699</span>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: 'rgba(255, 255, 255, 0.5)' }}>one-time</span>
              </div>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: 'rgba(255, 255, 255, 0.6)', margin: 0 }}>
                Core assets only — no content engine.
              </p>
            </div>

            {/* Summary description */}
            <p style={{
              fontFamily: 'Inter, sans-serif', fontSize: '13.5px',
              color: '#8E8E8E', lineHeight: 1.6, margin: '12px 0 20px',
            }}>
              Essential starter assets: all courses, agent templates, ebooks, and resell rights. Does not include viral reels.
            </p>

            {/* #4 — "Start Small" button text, standard size */}
            <a
              href={REPLACE_RAZORPAY_CREATOR}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                gap: '8px', padding: '15px 20px',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: '10px', background: 'transparent',
                fontFamily: 'Poppins, sans-serif', fontWeight: 700,
                fontSize: '15px', color: '#ffffff',
                textDecoration: 'none', width: '100%',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
              }}
            >
              Start Small — ₹699  {/* #4 */}
            </a>
            <p style={{
              fontFamily: 'Inter, sans-serif', fontSize: '11px',
              color: 'rgba(255, 255, 255, 0.4)', textAlign: 'center', margin: 0,
            }}>
              🔒 Secure checkout &nbsp;·&nbsp; ⚡ Instant Drive access
            </p>

            {/* See Details */}
            <Link
              to="/creator-vault"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                gap: '5px', fontFamily: 'Inter, sans-serif', fontSize: '12px',
                color: 'rgba(255, 255, 255, 0.6)', textDecoration: 'none', transition: 'color 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#ffffff'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)'}
            >
              See full details
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </Link>
          </div>

        </div>

        {/* ── COMPARISON GRID ── */}
        <div
          className="fiu2"
          style={{
            width: '100%',
            maxWidth: '860px',
            marginTop: '36px',
            background: '#0D0D0D',
            border: '1px solid rgba(212,175,55,0.12)',
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: '0 15px 45px rgba(0,0,0,0.5)',
          }}
        >
          {/* Header Row */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr 1fr',
            background: '#111111',
            borderBottom: '1px solid rgba(212,175,55,0.1)',
            padding: '14px 16px',
            alignItems: 'center',
          }}>
            <span style={{ fontFamily: 'Poppins, sans-serif', color: '#8E8E8E', fontSize: '13px', fontWeight: 600 }}>Feature</span>
            <span style={{ fontFamily: 'Poppins, sans-serif', color: '#8E8E8E', fontSize: '13px', fontWeight: 600, textAlign: 'center' }}>Creator ₹699</span>
            <span style={{ fontFamily: 'Poppins, sans-serif', color: '#8E8E8E', fontSize: '13px', fontWeight: 600, textAlign: 'center' }}>Full ₹999</span>
            <span style={{ fontFamily: 'Poppins, sans-serif', color: '#D4AF37', fontSize: '13px', fontWeight: 700, textAlign: 'center' }}>Launchpad ₹1,299 ✦</span>
          </div>

          {/* Rows */}
          {[
            { name: 'DFY Ebooks & Guides Pack', creator: true, full: true, launchpad: true },
            { name: 'Digital Products Bundle', creator: true, full: true, launchpad: true },
            { name: '1,000+ Premium Courses', creator: true, full: true, launchpad: true },
            { name: '15k+ AI Agent Templates', creator: true, full: true, launchpad: true },
            { name: 'Master Resell Rights (MRR)', creator: true, full: true, launchpad: true },
            { name: 'Keep 100% of Every Sale', creator: true, full: true, launchpad: true },
            { name: '15k+ Ready-made Reels Pack', creator: false, full: true, launchpad: true, highlightRow: true },
            { name: 'Caption Swipe File (100+)', creator: false, full: true, launchpad: true, highlightRow: true },
            { name: 'Step-by-Step Training Roadmap', creator: false, full: false, launchpad: true },
            { name: 'Lifetime Updates & New Additions', creator: false, full: false, launchpad: true },
            { name: 'Private Creator Community Access', creator: false, full: false, launchpad: true },
            { name: '1-on-1 Hand-holding Support', creator: false, full: false, launchpad: true },
          ].map((row, idx, arr) => {
            const isDisclaimer = row.disclaimer;
            return (
              <div
                key={idx}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '2fr 1fr 1fr 1fr',
                  borderBottom: idx < arr.length - 1 ? '1px solid rgba(212,175,55,0.06)' : 'none',
                  alignItems: 'center',
                  padding: '14px 16px',
                  background: isDisclaimer
                    ? 'rgba(239,68,68,0.01)'
                    : (row.highlightRow ? 'rgba(212,175,55,0.02)' : 'transparent'),
                }}
              >
                <span style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '13px',
                  color: isDisclaimer ? '#ff6b6b' : '#F9E498',
                  fontWeight: isDisclaimer ? 600 : 500,
                }}>
                  {isDisclaimer ? `⚠️ ${row.name}` : row.name}
                </span>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <CheckMark yes={row.creator} style={{ margin: '0 auto', display: 'block' }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <CheckMark yes={row.full} style={{ margin: '0 auto', display: 'block' }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <CheckMark yes={row.launchpad} style={{ margin: '0 auto', display: 'block' }} />
                </div>
              </div>
            );
          })}
        </div>

        {/* ── DIVIDER ── */}
        <div style={{
          width: '100%', maxWidth: '640px', height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.2), transparent)',
          margin: '56px auto 48px',
        }} />

        {/* ── FAQ — #9 increased padding ── */}
        <div className="fiu3" style={{ width: '100%', maxWidth: '640px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <span className="section-label" style={{ marginBottom: '8px' }}>
              QUICK ANSWERS
            </span>
            <h2 className="font-bebas" style={{
              fontSize: 'clamp(32px, 5vw, 48px)',
              color: '#ffffff',
              lineHeight: 1.1,
              margin: 0
            }}>
              Frequently Asked Questions
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {FAQ_ITEMS.map((item, idx) => (
              <FaqItem
                key={idx} item={item}
                isOpen={openFaqIdx === idx}
                onToggle={() => handleFaqToggle(idx)}
              />
            ))}
          </div>
          <p style={{
            fontFamily: 'Inter, sans-serif', fontSize: '12px',
            color: '#333', textAlign: 'center', marginTop: '32px',
          }}>
            Questions? DM us on{' '}
            <a
              href="https://instagram.com/theluxverse"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#555', textDecoration: 'underline' }}
            >
              Instagram @theluxverse
            </a>
          </p>
        </div>

      </div>{/* end main content */}

      <Footer />
    </div>
  );
}
