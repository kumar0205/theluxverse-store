import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/lux/Navbar';
import { scrollToElement } from '@/lib/scroll';
import Footer from '@/components/lux/Footer';
import Particles from '@/components/lux/Particles';
import ScrollReveal from '@/components/lux/ScrollReveal';
import TrustBadges from '@/components/lux/TrustBadges';
import ArrowIcon from '@/components/lux/ArrowIcon';
import useMobileStickyCTA from '@/hooks/useMobileStickyCTA';
import { trackEvent } from '@/utils/analytics';

// Lazy loaded below-the-fold/conditional components
const FullProductsModal = lazy(() => import('@/components/lux/FullProductsModal'));
const WinsCarousel = lazy(() => import('@/components/lux/WinsCarousel'));
const FaqSection = lazy(() => import('@/components/lux/FaqSection'));
import { PRODUCTS, GLOBAL_CONFIG } from '@/config/products';
import {
  TOOLS_DATA,
  PAIN_POINTS,
  PRODUCT_PREVIEWS,
  PRICING_FEATURES,
} from '@/data/launchpad';

// ── URLs from central config ──
const REPLACE_LAUNCHPAD_GLOBAL = PRODUCTS.launchpad.url;
const REPLACE_LAUNCHPAD_INDIA = PRODUCTS.launchpad.url;
const REPLACE_INSTAGRAM = GLOBAL_CONFIG.instagram;

const PainCheckbox = ({ pain, isChecked, onChange }) => {
  return (
    <div
      onClick={onChange}
      style={{
        display: 'flex', alignItems: 'flex-start',
        gap: '14px', padding: '14px 16px',
        background: '#111', borderRadius: '10px',
        border: isChecked ? '1px solid rgba(201,168,76,0.6)' : '1px solid rgba(255,255,255,0.08)',
        cursor: 'pointer',
        transition: 'border 0.2s, background 0.2s',
        boxShadow: isChecked ? '0 4px 12px rgba(201,168,76,0.08)' : 'none'
      }}
    >
      <div style={{
        width: '20px', height: '20px',
        border: isChecked ? '2px solid #22c55e' : '2px solid rgba(255,255,255,0.3)',
        borderRadius: '50%', flexShrink: 0,
        marginTop: '2px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: isChecked ? '#22c55e' : 'transparent',
        transition: 'background 0.2s, border-color 0.2s'
      }}>
        {isChecked && (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        )}
      </div>
      <p style={{
        color: isChecked ? '#F9E498' : '#ffffff',
        fontSize: '14px',
        margin: 0,
        lineHeight: 1.4,
        transition: 'color 0.2s'
      }}>
        {pain}
      </p>
    </div>
  );
};

const ProofScreenshot = React.memo(({ src, alt, maxWidth = '360px', isBlock = false }) => {
  return (
    <div style={{
      flex: isBlock ? 'none' : '0 0 auto',
      width: isBlock ? '100%' : '85%',
      maxWidth: maxWidth,
      margin: isBlock ? '0 auto 40px' : '0',
      borderRadius: '12px',
      border: '1px solid rgba(212, 175, 55, 0.25)',
      boxShadow: '0 15px 35px rgba(0,0,0,0.8), 0 0 15px rgba(212, 175, 55, 0.15)',
      overflow: 'hidden',
      background: '#111111',
      display: isBlock ? 'block' : 'inline-block'
    }}>
      {/* Device Browser Chrome Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        padding: '10px 14px',
        background: '#161616',
        borderBottom: '1px solid rgba(255,255,255,0.06)'
      }}>
        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ff5f56' }} />
        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ffbd2e' }} />
        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#27c93f' }} />
        <div style={{
          flex: 1,
          height: '18px',
          background: '#0D0D0D',
          borderRadius: '4px',
          marginLeft: '12px',
          display: 'flex',
          alignItems: 'center',
          paddingLeft: '8px'
        }}>
          <div style={{ width: '60px', height: '6px', background: 'rgba(255,255,255,0.15)', borderRadius: '2px' }} />
        </div>
      </div>
      <div style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
        <img
          src={src}
          alt={alt}
          style={{
            width: '100%',
            height: 'auto',
            display: 'block'
          }}
        />
        {/* Subtle dark overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.25)',
          pointerEvents: 'none'
        }} />
      </div>
    </div>
  );
});

export default function LaunchpadPage() {
  const timelineContainerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const heroRef = useRef(null);
  const finalCtaRef = useRef(null);

  const [selectedPains, setSelectedPains] = useState({});

  const selectedCount = Object.values(selectedPains).filter(Boolean).length;

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineContainerRef.current) return;
      const rect = timelineContainerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      const startPoint = viewportHeight * 0.6;
      const totalHeight = rect.height;

      const scrolled = startPoint - rect.top;
      let progress = scrolled / (totalHeight - viewportHeight * 0.2);

      progress = Math.max(0, Math.min(1, progress));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <div style={{ background: '#0F0F13', minHeight: '100vh', paddingBottom: '80px' }}>
      <Navbar />

      <style>{`
        @keyframes evmotishine {
          0% { transform: translateX(-120%); }
          100% { transform: translateX(140%); }
        }
        .ev-moti-shine {
          animation: evmotishine 2.4s ease-out infinite;
        }
        @keyframes pulsedot {
          0% { transform: scale(0.9); box-shadow: 0 0 0 0 rgba(74, 222, 128, 0.7); }
          70% { transform: scale(1); box-shadow: 0 0 0 8px rgba(74, 222, 128, 0); }
          100% { transform: scale(0.9); box-shadow: 0 0 0 0 rgba(74, 222, 128, 0); }
        }
        .pulse-green-dot {
          width: 8px;
          height: 8px;
          background-color: #4ade80;
          border-radius: 50%;
          display: inline-block;
          animation: pulsedot 1.8s infinite;
        }
        .faq-answer-text strong {
          color: #ffffff !important;
          font-weight: 700;
        }
      `}</style>

      {/* ── 2. HERO ── */}
      <section style={{ paddingTop: '160px', paddingBottom: '80px', paddingLeft: '20px', paddingRight: '20px', textAlign: 'center', background: 'radial-gradient(ellipse at center top, #1a1400 0%, #0F0F13 60%)', position: 'relative', overflow: 'hidden' }}>
        <Particles count={8} />
        <ScrollReveal style={{ maxWidth: 900, margin: '0 auto' }} className="flex flex-col items-center gap-8 relative z-10">

          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(212, 175, 55, 0.1)',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            borderRadius: '999px',
            padding: '6px 16px',
            color: '#D4AF37',
            fontSize: '14px',
            fontWeight: '600',
            fontFamily: 'Poppins, sans-serif'
          }}>
            👥 2,500+ Members Already Inside
          </div>

          <h1 className="font-bebas" style={{ fontSize: 'clamp(48px, 8vw, 84px)', color: '#ffffff', lineHeight: 1.05, marginBottom: '16px', letterSpacing: '0.03em' }}>
            Start Your <span className="gold-text">Online Income </span>Journey<br />Without
            <span className="gold-text"> Quitting Your Job.</span>
          </h1>

          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(15px, 2vw, 18px)', color: '#8E8E8E', marginBottom: 24, maxWidth: 640, width: '100%', lineHeight: 1.7 }}>
            Build, launch, and automate your faceless digital product brand, grow your audience, and build a consistent source of online income on autopilot.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={() => {
                trackEvent('launchpad_hero_cta_click');
                scrollToElement('final-cta');
              }}
              className="btn-gold pulse-glow"
              style={{ fontSize: '18px', padding: '16px 40px', fontWeight: 'bold' }}
            >
              Get Complete System <ArrowIcon />
            </button>
            <span style={{ fontSize: '13px', color: '#8E8E8E', fontFamily: 'Inter, sans-serif', letterSpacing: '0.03em' }}>
              Instant Access • Lifetime Updates
            </span>
            <TrustBadges />
          </div>

        </ScrollReveal>
      </section>

      {/* ── 3. PAIN POINTS CHECKBOXES ── */}
      <section style={{ padding: '100px 20px', background: '#111111', borderTop: '1px solid rgba(212,175,55,0.08)' }}>
        <ScrollReveal style={{ maxWidth: '600px', margin: '0 auto' }}>
          <span className="section-label" style={{ marginBottom: '12px', display: 'block', textAlign: 'center' }}>
            BE HONEST WITH YOURSELF
          </span>
          <h2 className="font-bebas" style={{
            fontSize: 'clamp(36px, 6vw, 56px)',
            color: '#ffffff', textAlign: 'center',
            lineHeight: 1.1, marginBottom: '16px'
          }}>
            Which of these sounds like you?
          </h2>
          <p style={{
            color: '#a0a0a0', textAlign: 'center',
            fontSize: '15px', marginBottom: '40px'
          }}>
            Check the ones that hit home.
          </p>
          <div style={{
            maxWidth: '480px', margin: '0 auto',
            display: 'flex', flexDirection: 'column', gap: '12px'
          }}>
            {PAIN_POINTS.map((pain, i) => (
              <PainCheckbox
                key={i}
                pain={pain}
                isChecked={!!selectedPains[i]}
                onChange={() => {
                  const newChecked = !selectedPains[i];
                  trackEvent('launchpad_pain_select', { index: i, checked: newChecked, text: pain });
                  setSelectedPains(prev => ({ ...prev, [i]: newChecked }));
                }}
              />
            ))}
          </div>
          <div style={{
            maxWidth: '480px',
            background: 'rgba(201,168,76,0.08)',
            border: '1px solid, #c9a84c',
            borderRadius: '12px',
            textAlign: 'center',
            opacity: selectedCount >= 2 ? 1 : 0,
            transform: selectedCount >= 2 ? 'scale(1)' : 'scale(0.95)',
            pointerEvents: selectedCount >= 2 ? 'auto' : 'none',
            transition: 'opacity 0.4s ease, transform 0.4s ease, max-height 0.4s ease, padding 0.4s ease, margin 0.4s ease',
            maxHeight: selectedCount >= 2 ? '200px' : '0px',
            overflow: 'hidden',
            padding: selectedCount >= 2 ? '24px' : '0px 24px',
            marginTop: selectedCount >= 2 ? '32px' : '0px'
          }}>
            <p style={{ color: '#fffffeff', fontSize: '15px', fontWeight: '700', marginBottom: 0 }}>YOU TICKED EVEN OF 2 -</p>
            <p style={{ color: '#c9a84c', fontSize: '15px', fontWeight: '700', marginBottom: 0 }}>
              THIS SYSTEM WAS BUILT EXACTLY FOR YOU.
            </p>
          </div>
        </ScrollReveal>
      </section>

      <div className="gold-divider" />

      {/* ── 3-STEP BLUEPRINT SECTION (MOVED UP) ── */}
      <section style={{ padding: 'clamp(80px, 10vw, 120px) 20px', background: '#111111', borderTop: '1px solid rgba(212,175,55,0.08)' }}>
        <ScrollReveal style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <span className="section-label">THE EXACT BLUEPRINT</span>
            <h2 className="font-bebas" style={{ fontSize: 'clamp(36px, 6vw, 64px)', color: '#ffffff', marginTop: 12, lineHeight: 1.1 }}>
              3 Simple Steps <span className="gold-text">To Get Started</span>
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
            {/* Step 1 */}
            <div className="vault-card" style={{ border: '1px solid rgba(212,175,55,0.15)', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}>
              <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }} className="flex-col sm:flex-row">
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                  <div className="font-bebas" style={{
                     color: '#D4AF37',
                     fontSize: '48px',
                     lineHeight: 1,
                     letterSpacing: '0.03em',
                     flexShrink: 0,
                   }}>
                     01
                   </div>
                  <div style={{
                    width: '2px',
                    height: '140px',
                    borderLeft: '2px dashed rgba(212, 175, 55, 0.3)',
                    marginTop: '12px',
                    marginBottom: '-140px',
                    zIndex: 1
                  }} className="hidden sm:block" />
                </div>
                <div>
                  <h3 style={{ display: 'flex', alignItems: 'center', gap: '12px', fontFamily: 'Poppins, sans-serif', fontSize: '24px', fontWeight: 600, color: '#ffffff', marginBottom: 12 }}>
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#D4AF37"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ flexShrink: 0 }}
                    >
                      <circle cx="6.5" cy="5.5" r="4.5" />
                      <circle cx="16.5" cy="5.5" r="4.5" />
                      <rect x="1.5" y="11.5" width="14" height="11" rx="2" />
                      <path d="M15.5 14.5L22.5 11.5V22.5L15.5 19.5Z" />
                    </svg>
                    <span>Grow Your Audience (15,000+ Reels)</span>
                  </h3>
                  <ul style={{ listStyleType: 'none', paddingLeft: 0, color: '#8E8E8E', fontFamily: 'Inter, sans-serif', fontSize: '15.5px', lineHeight: 1.8, marginBottom: 16, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <li style={{ display: 'flex', gap: '8px', alignItems: 'center' }}><span style={{ color: '#D4AF37' }}>•</span> <span>Download ready-made content from our 15,000+ library</span></li>
                    <li style={{ display: 'flex', gap: '8px', alignItems: 'center' }}><span style={{ color: '#D4AF37' }}>•</span> <span>Upload daily to your account to trigger growth algorithms</span></li>
                    <li style={{ display: 'flex', gap: '8px', alignItems: 'center' }}><span style={{ color: '#D4AF37' }}>•</span> <span>No editing or filming required — 100% faceless format</span></li>
                  </ul>
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    background: '#161616',
                    borderLeft: '4px solid #D4AF37',
                    padding: '10px 16px',
                    borderRadius: '0 8px 8px 0',
                    color: '#ffffff',
                    fontSize: '15px',
                    fontWeight: '500',
                    fontFamily: 'Inter, sans-serif',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                  }}>
                    <span>What you get : 15,000+ Ready-Made Reels</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '8px', flexShrink: 0 }}>
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="vault-card" style={{ border: '1px solid rgba(212,175,55,0.15)', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}>
              <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }} className="flex-col sm:flex-row">
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                  <div className="font-bebas" style={{
                     color: '#D4AF37',
                     fontSize: '48px',
                     lineHeight: 1,
                     letterSpacing: '0.03em',
                     flexShrink: 0,
                   }}>
                     02
                   </div>
                  <div style={{
                    width: '2px',
                    height: '140px',
                    borderLeft: '2px dashed rgba(212, 175, 55, 0.3)',
                    marginTop: '12px',
                    marginBottom: '-140px',
                    zIndex: 1
                  }} className="hidden sm:block" />
                </div>
                <div>
                  <h3 style={{ display: 'flex', alignItems: 'center', gap: '12px', fontFamily: 'Poppins, sans-serif', fontSize: '24px', fontWeight: 600, color: '#ffffff', marginBottom: 12 }}>
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#D4AF37"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ flexShrink: 0 }}
                    >
                      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                    </svg>
                    <span>Turn Viewers Into Customers</span>
                  </h3>
                  <ul style={{ listStyleType: 'none', paddingLeft: 0, color: '#8E8E8E', fontFamily: 'Inter, sans-serif', fontSize: '15.5px', lineHeight: 1.8, marginBottom: 16, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <li style={{ display: 'flex', gap: '8px', alignItems: 'center' }}><span style={{ color: '#D4AF37' }}>•</span> <span>Instant setup with your digital store link placed directly in bio</span></li>
                    <li style={{ display: 'flex', gap: '8px', alignItems: 'center' }}><span style={{ color: '#D4AF37' }}>•</span> <span>Viewers click and browse your preloaded 1M+ digital products</span></li>
                    <li style={{ display: 'flex', gap: '8px', alignItems: 'center' }}><span style={{ color: '#D4AF37' }}>•</span> <span>No product creation, technical setup, or website maintenance required</span></li>
                  </ul>
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    background: '#161616',
                    borderLeft: '4px solid #D4AF37',
                    padding: '10px 16px',
                    borderRadius: '0 8px 8px 0',
                    color: '#ffffff',
                    fontSize: '15px',
                    fontWeight: '500',
                    fontFamily: 'Inter, sans-serif',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    marginBottom: '16px'
                  }}>
                    <span>What you get : 1M+ sellable Resource Library</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '8px', flexShrink: 0 }}>
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div><br />
                  <Link to="/what-is-digital-product" style={{ color: '#D4AF37', textDecoration: 'underline' }}>Beginner guide for digital products -{'>'}</Link>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="vault-card" style={{ border: '1px solid rgba(212,175,55,0.15)', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}>
              <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }} className="flex-col sm:flex-row">
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                  <div className="font-bebas" style={{
                     color: '#D4AF37',
                     fontSize: '48px',
                     lineHeight: 1,
                     letterSpacing: '0.03em',
                     flexShrink: 0,
                   }}>
                     03
                   </div>
                </div>
                <div>
                  <h3 style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontFamily: 'Poppins, sans-serif', fontSize: '24px', fontWeight: 600, color: '#ffffff', marginBottom: 12 }}>
                    <svg
                      width="60"
                      height="60"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#D4AF37"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ flexShrink: 0, marginTop: '4px' }}
                    >
                      {/* Collar/Top opening */}
                      <path d="M8 5c0-1.5 1-2.5 4-2.5s4 1 4 2.5l-1 4H9L8 5z" />
                      {/* Tie loops/ears */}
                      <path d="M8 9c-1.5 0-2.5-.8-2-2 .3-.8 1-.5 2 2zM16 9c1.5 0 2.5-.8 2-2-.3-.8-1-.5-2 2z" />
                      {/* Main bag body */}
                      <path d="M9 9c-2 1-3.5 3-4 6.5C4.3 19 7 21 12 21s7.7-2 7-5.5C18.5 12 17 10 15 9" />
                      {/* Dollar sign */}
                      <path d="M12 11.5v6M14 13a1.5 1.5 0 0 0-1.5-1.5h-1a1.5 1.5 0 0 0 0 3h1a1.5 1.5 0 0 1 0 3h-1A1.5 1.5 0 0 1 10 16" />
                    </svg>
                    <span>
                      Receive 100% of the Profits
                    </span>
                  </h3>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', color: '#8E8E8E', lineHeight: 1.6, marginBottom: 16 }}>
                    Connect direct payment processors in minutes using our step-by-step setup guides.<br /><br />
                    Every sale goes straight to your bank account instantly — zero middleman commissions, and zero fees taken by us.
                  </p>
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    background: '#161616',
                    borderLeft: '4px solid #D4AF37',
                    padding: '10px 16px',
                    borderRadius: '0 8px 8px 0',
                    color: '#ffffff',
                    fontSize: '15px',
                    fontWeight: '500',
                    fontFamily: 'Inter, sans-serif',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                  }}>
                    <span>What you get : Payment Setup Guide</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '8px', flexShrink: 0 }}>
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA & Trust Badges */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 52 }}>
            <button
              onClick={() => {
                trackEvent('launchpad_blueprint_cta_click');
                scrollToElement('final-cta');
              }}
              className="btn-gold pulse-glow"
              style={{ fontSize: '18px', padding: '16px 40px', fontWeight: 'bold' }}
            >
              Get Lifetime Access <ArrowIcon />
            </button>
            <span style={{ fontSize: '13px', color: '#8E8E8E', fontFamily: 'Inter, sans-serif', marginTop: '12px' }}>
              Instant Access • Lifetime Updates
            </span>
            <TrustBadges />
          </div>
        </ScrollReveal>
      </section>

      <div className="gold-divider" />

      {/* ── 4. PROOF SECTION (Instagram 3M + Gumroad ₹68,572) — MOVED UP ── */}
      <section style={{ padding: 'clamp(80px, 10vw, 120px) 20px', background: '#050505', textAlign: 'center' }}>
        <ScrollReveal style={{ maxWidth: '900px', margin: '0 auto' }}>


          {/* Part 1: Instagram Proof */}
          <span className="section-label" style={{ marginBottom: '12px' }}>
            THIS IS WHAT HAPPENED WHEN WE POSTED
          </span>
          <h2 className="font-bebas" style={{ fontSize: 'clamp(36px, 6vw, 64px)', color: '#ffffff', lineHeight: 1.1, marginBottom: '16px' }}>
            We Posted Reels From This <span className="gold-text">System.</span><br />
            Look What Happened.
          </h2>
          <p style={{ color: '#a0a0a0', fontSize: '16px', maxWidth: '600px', margin: '0 auto 32px', lineHeight: 1.7 }}>
            No camera. No editing. No original content. We downloaded reels from the same pack you get — and posted them on Instagram.
          </p>

          <div style={{
            display: 'flex',
            gap: '16px',
            overflowX: 'auto',
            paddingBottom: '24px',
            marginBottom: '32px',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
          }} className="proof-scroll-container">
            <ProofScreenshot src="/src/assets/proof.webp" alt="Instagram 3M Views Proof" />
            <ProofScreenshot src="/src/assets/proof1.webp" alt="Instagram Proof 2" />
          </div>

          {/* Extracted Stats Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            maxWidth: '520px',
            margin: '0 auto 16px',
          }}>
            <div style={{
              background: '#111111',
              border: '1px solid rgba(212,175,55,0.15)',
              borderRadius: '12px',
              padding: '20px 16px',
              textAlign: 'center',
              boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
            }}>
              <div className="font-bebas" style={{ fontSize: '42px', color: '#D4AF37', letterSpacing: '0.05em', lineHeight: 1.1 }}>
                3,087,725
              </div>
              <div style={{ fontSize: '12px', color: '#8E8E8E', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '6px', fontFamily: 'Poppins, sans-serif' }}>
                Total Video Views
              </div>
            </div>
            <div style={{
              background: '#111111',
              border: '1px solid rgba(212,175,55,0.15)',
              borderRadius: '12px',
              padding: '20px 16px',
              textAlign: 'center',
              boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
            }}>
              <div className="font-bebas" style={{ fontSize: '42px', color: '#D4AF37', letterSpacing: '0.05em', lineHeight: 1.1 }}>
                1,998,229
              </div>
              <div style={{ fontSize: '12px', color: '#8E8E8E', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '6px', fontFamily: 'Poppins, sans-serif' }}>
                Accounts Reached
              </div>
            </div>
          </div>
          <div style={{ fontSize: '13px', color: '#555555', marginBottom: '40px', fontFamily: 'Inter, sans-serif' }}>
            Source: Instagram Insights (Verified Proof Visuals Above)
          </div>

          <div style={{
            background: 'rgba(201,168,76,0.06)',
            border: '1px solid rgba(201,168,76,0.2)',
            borderRadius: '12px',
            padding: '24px',
            maxWidth: '520px',
            margin: '0 auto 60px',
            textAlign: 'left'
          }}>
            <p style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 'bold', fontSize: '20px', color: '#ffffff', marginBottom: '8px' }}>
              One Single Reel. 3 Million Views.
            </p>
            <p style={{ color: '#a0a0a0', fontSize: '14px', lineHeight: 1.7, margin: 0 }}>
              Every one of those followers saw a bio link. Some clicked. Some bought. That's how a faceless account makes money — views turn into followers, followers turn into customers.
            </p>
          </div>

          {/* Part 2: Payment Proof */}
          <div style={{
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.3) 50%, transparent)',
            position: 'relative',
            margin: '40px 0',
            width: '100%',
            zIndex: 1
          }}>
            <div style={{
              position: 'absolute',
              top: '-150px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '100%',
              maxWidth: '800px',
              height: '300px',
              background: 'radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 70%)',
              pointerEvents: 'none',
              zIndex: -1
            }} />
          </div>

          <span className="section-label" style={{ marginBottom: '12px' }}>
            THEN THIS HAPPENED TO OUR BANK
          </span>
          <h2 className="font-bebas" style={{ fontSize: 'clamp(36px, 6vw, 64px)', color: '#ffffff', lineHeight: 1.1, marginBottom: '16px' }}>
            Those Views Turned Into Real Earnings.<br />
            <span className="gold-text">₹68,572 Credited.</span>
          </h2>
          <p style={{ color: '#a0a0a0', fontSize: '16px', maxWidth: '600px', margin: '0 auto 32px', lineHeight: 1.7 }}>
            This is what our store earned from the same reels pack and methods you get inside the system.
          </p>

          <ProofScreenshot src="/src/assets/proof3.webp" alt="Gumroad Earnings Proof" maxWidth="400px" isBlock={true} />

          <div style={{
            background: 'rgba(201,168,76,0.06)',
            border: '1px solid rgba(201,168,76,0.2)',
            borderRadius: '12px',
            padding: '24px',
            maxWidth: '520px',
            margin: '0 auto',
            textAlign: 'left'
          }}>
            <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '16px', fontWeight: 'bold', color: '#ffffff', marginBottom: '8px' }}>
              Built to Repeat.
            </p>
            <p style={{ color: '#a0a0a0', fontSize: '14px', lineHeight: 1.7, margin: 0 }}>
              The system that generated this is exactly what we teach you to set up. We give you the products, the templates, the video guides, and daily network support to launch.
            </p>
          </div>

          {/* CTA after Proof */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 32 }}>
            <button
              onClick={() => {
                trackEvent('launchpad_proof_cta_click');
                scrollToElement('final-cta');
              }}
              className="btn-gold pulse-glow"
              style={{ fontSize: '18px', padding: '16px 40px', fontWeight: 'bold' }}
            >
              Get Lifetime Access <ArrowIcon />
            </button>
            <span style={{ fontSize: '13px', color: '#8E8E8E', fontFamily: 'Inter, sans-serif', marginTop: '12px' }}>
              Instant Access • Lifetime Updates
            </span>
          </div>

        </ScrollReveal>
      </section>

      <div className="gold-divider" />

      {/* ── 5. WHAT'S INSIDE LAUNCHPAD (VERTICAL TIMELINE) ── */}
      <section style={{ padding: 'clamp(80px, 10vw, 120px) 20px', background: '#111111', borderTop: '1px solid rgba(212,175,55,0.08)' }}>
        <ScrollReveal style={{ maxWidth: 1000, margin: '0 auto' }}>
          {/* Why Start Now Card */}
          <div style={{
            background: '#050505',
            border: '1px solid rgba(212,175,55,0.15)',
            borderRadius: '16px',
            padding: '40px 24px',
            maxWidth: '640px',
            margin: '0 auto 80px',
            textAlign: 'center',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.5)'
          }}>
            <span className="section-label" style={{ marginBottom: '16px' }}>
              WHY START NOW
            </span>
            <h2 className="font-bebas" style={{
              fontSize: 'clamp(32px, 5vw, 48px)',
              color: '#ffffff',
              lineHeight: 1.1,
              marginBottom: '20px'
            }}>
              Every Day Without a System is<br />
              <span className="gold-text">Money Left Behind</span>
            </h2>
            <p style={{
              color: '#a0a0a0',
              fontSize: '15px',
              lineHeight: 1.7,
              margin: '0 0 24px',
              fontFamily: 'Inter, sans-serif'
            }}>
              People with the same phone, same internet, and same 24 hours are already building their digital income. The only difference is they took action and started.
            </p>
          </div>

          <div style={{ textAlign: 'center', marginBottom: 80 }}>
            <span className="section-label">A STEP-BY-STEP PATH</span>
            <h2 className="font-bebas" style={{ fontSize: 'clamp(36px, 6vw, 64px)', color: '#ffffff', marginTop: 12, marginBottom: 16, lineHeight: 1.1 }}>
              Tools You <span className="gold-text">Get Inside</span>
            </h2>

            <div style={{
              display: 'inline-block',
              background: 'rgba(212,175,55,0.04)',
              border: '1px solid rgba(212,175,55,0.15)',
              borderRadius: '8px',
              padding: '10px 20px',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              <p style={{
                color: '#c9a84c',
                fontSize: '14px',
                fontFamily: 'Inter, sans-serif',
                lineHeight: 1.5,
                margin: 0
              }}>
                <span style={{ fontWeight: 'bold' }}>⚠️ IMPORTANT NOTE:</span> Training videos are restricted to registered founding members and cannot be accessed publicly on YouTube.
              </p>
            </div>
          </div>

          <div ref={timelineContainerRef} className="relative select-none">
            {/* Background Line */}
            <div
              style={{
                position: 'absolute',
                top: '20px',
                bottom: '20px',
                width: '2px',
                background: 'linear-gradient(to bottom, rgba(212,175,55,0.05), rgba(212,175,55,0.2) 15%, rgba(212,175,55,0.2) 85%, rgba(212,175,55,0.05))',
                zIndex: 1
              }}
              className="left-[16px] md:left-1/2 transform -translate-x-1/2"
            />
            {/* Progress Line */}
            <div
              style={{
                position: 'absolute',
                top: '20px',
                height: `calc(${scrollProgress * 100}% - 40px)`,
                width: '2px',
                background: '#D4AF37',
                zIndex: 2,
                transition: 'height 0.1s cubic-bezier(0.25, 0.8, 0.25, 1)'
              }}
              className="left-[16px] md:left-1/2 transform -translate-x-1/2"
            />

            {/* Traveling Scroll Dot */}
            <div
              style={{
                position: 'absolute',
                top: `${scrollProgress * 100}%`,
                transform: 'translate(-50%, -50%)',
                transition: 'top 0.1s cubic-bezier(0.25, 0.8, 0.25, 1)',
                willChange: 'top',
                zIndex: 10,
              }}
              className="left-[16px] md:left-1/2"
            >
              <img
                src="https://d1yei2z3i6k35z.cloudfront.net/11609799/68f51a2a09b04_5-min.webp"
                alt="scrolling ball icon"
                className="w-8 h-8 md:w-10 md:h-10 object-contain drop-shadow-[0_0_10px_rgba(212,175,55,0.8)]"
              />
            </div>

            {/* Timeline Items */}
            <div className="flex flex-col gap-16 md:gap-24">
              {TOOLS_DATA.map((tool, i) => {
                const isEven = i % 2 === 0;
                const isPassed = scrollProgress > ((i + 0.4) / TOOLS_DATA.length);
                return (
                  <div key={i} className="relative pl-12 md:pl-0">
                    <div className="hidden md:grid grid-cols-2 gap-16 items-center">
                      {isEven ? (
                        <>
                          <div className="flex justify-end pr-8"><ToolMedia tool={tool} /></div>
                          <div className="flex justify-start pl-8"><ToolText tool={tool} /></div>
                        </>
                      ) : (
                        <>
                          <div className="flex justify-end pr-8 text-right"><ToolText tool={tool} alignRight /></div>
                          <div className="flex justify-start pl-8"><ToolMedia tool={tool} /></div>
                        </>
                      )}
                    </div>

                    <div className="block md:hidden flex flex-col mb-[32px] bg-[#050505] rounded-[12px] overflow-hidden border border-[rgba(201,168,76,0.15)] shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
                      {/* Browser Chrome Header Mockup */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '10px 14px',
                        background: '#161616',
                        borderBottom: '1px solid rgba(255,255,255,0.06)'
                      }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ff5f56' }} />
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ffbd2e' }} />
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#27c93f' }} />
                        <div style={{
                          flex: 1,
                          height: '18px',
                          background: '#0D0D0D',
                          borderRadius: '4px',
                          marginLeft: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          paddingLeft: '8px'
                        }}>
                          <div style={{ width: '60px', height: '6px', background: 'rgba(255,255,255,0.15)', borderRadius: '2px' }} />
                        </div>
                      </div>

                      <div style={{ position: 'relative', width: '100%', height: '180px', overflow: 'hidden' }}>
                        {tool.isVideo ? (
                          <video src={tool.image} autoPlay muted loop playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                          <img src={tool.image} alt={tool.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        )}
                        {/* Dark overlay */}
                        <div style={{
                          position: 'absolute',
                          inset: 0,
                          background: 'rgba(0, 0, 0, 0.25)',
                          pointerEvents: 'none'
                        }} />
                      </div>
                      <div style={{ borderTop: '2px solid #D4AF37' }}></div>
                      <div className="p-5 flex flex-col gap-4">
                        <div className="flex items-center gap-3">
                          <img src={tool.icon} alt="" className="w-[32px] h-auto object-contain" />
                          <h3 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '20px', fontWeight: 600, color: '#D4AF37', margin: 0, letterSpacing: '0.01em' }}>
                            {tool.title}
                          </h3>
                        </div>
                        <ul className="flex flex-col gap-3">
                          {tool.points.map((point, idx) => (
                            <li key={idx} className="flex items-center gap-3 px-4 py-2.5 rounded-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.16)]">
                              <span style={{ color: '#D4AF37', fontWeight: 'bold', fontSize: '1.1rem' }}>✓</span>
                              <p className="font-sans text-[rgba(255,255,255,0.8)] text-[13px] m-0 leading-tight" dangerouslySetInnerHTML={{ __html: point }} />
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className={`absolute left-[16px] md:left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-[#D4AF37] z-[5] transition-colors duration-300 ${isPassed ? 'bg-[#D4AF37]' : 'bg-[#050505]'}`} />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex justify-center mt-16 relative z-10">
            <button onClick={() => {
              trackEvent('launchpad_catalog_open');
              setIsCatalogOpen(true);
            }} className="btn-outline text-[16px] md:text-[18px] px-8 py-4">
              View Full Product List
            </button>
          </div>
        </ScrollReveal>
      </section>

      <div className="gold-divider" />

      {/* ── PRODUCT PREVIEW SECTION ── */}
      <section style={{ padding: '100px 20px', background: '#050505' }}>
        <ScrollReveal style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span className="section-label">INSIDE THE VAULT</span>
            <h2 className="font-bebas" style={{ fontSize: 'clamp(32px, 5vw, 48px)', color: '#ffffff', marginTop: '12px', lineHeight: 1.1 }}>
              Visual Product Preview
            </h2>
            <p style={{ color: '#8E8E8E', fontSize: '15px', marginTop: '12px', maxWidth: '600px', margin: '12px auto 0' }}>
              Here is exactly what you get access to inside. Real folder screenshots, content packs, templates, and courses.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px'
          }}>
            {PRODUCT_PREVIEWS.map((preview, idx) => (
              <div key={idx} style={{
                background: '#0D0D0D',
                border: '1px solid rgba(212,175,55,0.15)',
                borderRadius: '12px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 4px 20px rgba(0,0,0,0.4)'
              }}>
                <div style={{ width: '100%', height: '180px', overflow: 'hidden', position: 'relative' }}>
                  <img src={preview.img} alt={preview.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.15)', pointerEvents: 'none' }} />
                </div>
                <div style={{ padding: '20px', flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <h3 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '17px', fontWeight: 600, color: '#ffffff', margin: 0 }}>
                    {preview.title}
                  </h3>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13.5px', color: '#8E8E8E', lineHeight: 1.4, margin: 0 }}>
                    {preview.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      <div className="gold-divider" />
      <div style={{
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.3) 50%, transparent)',
        position: 'relative',
        margin: '0',
        width: '100%',
        zIndex: 1
      }}>
        <div style={{
          position: 'absolute',
          top: '-150px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          maxWidth: '800px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: -1
        }} />
      </div>

      {/* ── 8. MEMBERS WINS SECTION (CAROUSEL) ── */}
      <section style={{ padding: 'clamp(56px, 8vw, 100px) 20px', background: '#111111', borderTop: '1px solid rgba(212,175,55,0.08)' }}>
        <ScrollReveal style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <span className="section-label">2,500+ MEMBERS ALREADY INSIDE</span>
            <h2 className="font-bebas" style={{ fontSize: 'clamp(36px, 6vw, 64px)', color: '#ffffff', marginTop: 12, lineHeight: 1.1 }}>
              Real Member <span className="gold-text">Wins</span>
            </h2>
            <p style={{ color: '#8E8E8E', fontSize: '15px', marginTop: '12px', fontFamily: 'Inter, sans-serif' }}>
              These are actual results from members using the same system you are about to access.
            </p>
          </div>

          <Suspense fallback={
            <div style={{
              maxWidth: '36rem',
              marginLeft: 'auto',
              marginRight: 'auto',
              width: '100%',
              height: '400px',
              background: '#111111',
              borderRadius: '16px',
              border: '1px solid rgba(201,168,76,0.35)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#8E8E8E'
            }}>
              Loading Wins...
            </div>
          }>
            <WinsCarousel />
          </Suspense>
        </ScrollReveal>
      </section>

      {/* Subtle radial divider */}
      <div style={{
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.3) 50%, transparent)',
        position: 'relative',
        margin: '0',
        width: '100%',
        zIndex: 1
      }}>
        <div style={{
          position: 'absolute',
          top: '-150px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          maxWidth: '800px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: -1
        }} />
      </div>

      {/* ── 9. FAQ SECTION ── */}
      <Suspense fallback={null}>
        <FaqSection />
      </Suspense>

      {/* Subtle radial divider */}
      <div style={{
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.3) 50%, transparent)',
        position: 'relative',
        margin: '0',
        width: '100%',
        zIndex: 1
      }}>
        <div style={{
          position: 'absolute',
          top: '-150px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          maxWidth: '800px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: -1
        }} />
      </div>

      {/* ── 10. FINAL CTA SECTION (APPLE-STYLE) ── */}
      <section
        id="final-cta"
        ref={finalCtaRef}
        style={{ position: 'relative', overflow: 'hidden', padding: 'clamp(100px, 12vw, 140px) 20px', textAlign: 'center', background: 'radial-gradient(ellipse at center top, #1a1400 0%, #050505 70%)' }}
      >
        <Particles count={6} />
        <ScrollReveal style={{ maxWidth: 640, margin: '0 auto' }}>

          {/* Live pricing badge */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '28px' }}>
            <div style={{
              width: '8px', height: '8px', borderRadius: '50%',
              background: '#4ade80',
              animation: 'pulse 1.5s ease-in-out infinite'
            }} />
            <span style={{ color: '#4ade80', fontSize: '13px', fontWeight: '600', fontFamily: 'Poppins, sans-serif', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Founding Member Pricing — Active Now
            </span>
          </div>

          <h2 className="font-bebas" style={{ fontSize: 'clamp(40px, 7vw, 80px)', color: '#ffffff', marginBottom: '20px', lineHeight: 1.05 }}>
            Everything You Need to Start<br />
            <span className="gold-text">Your Digital Income Journey</span>
          </h2>

          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '17px', color: '#B0B0B0', lineHeight: 1.7, marginBottom: '40px', maxWidth: '520px', margin: '0 auto 40px' }}>
            One-time payment. Lifetime access. No subscriptions, no upsells, no hidden costs.
          </p>

          {/* Pricing card */}
          <div style={{
            background: '#111111',
            border: '1px solid rgba(212,175,55,0.3)',
            borderRadius: '20px',
            padding: '32px 28px',
            maxWidth: '420px',
            margin: '0 auto 32px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.6)'
          }}>
            {/* Price display */}
            <div style={{ textAlign: 'center', marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid rgba(212,175,55,0.15)' }}>
              <div style={{ fontSize: '12px', letterSpacing: '0.12em', color: '#4ade80', fontFamily: 'Poppins, sans-serif', fontWeight: 600, textTransform: 'uppercase', marginBottom: '8px' }}>
                🔥 Founding Member Price
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
                <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '18px', color: '#666', textDecoration: 'line-through', fontWeight: '200' }}>₹21,493</span>
                <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '56px', fontWeight: '700', color: '#D4AF37', lineHeight: 1 }}>₹1,299</span>
              </div>
              <p style={{ color: '#8E8E8E', fontSize: '13px', fontFamily: 'Inter, sans-serif', margin: '6px 0 0' }}>One-time payment • Lifetime Access</p>
            </div>

            {/* Feature price breakdown */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
                {PRICING_FEATURES.map((feat, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(212,175,55,0.07)', paddingBottom: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ color: '#22c55e', fontWeight: 'bold', fontSize: '0.95rem', flexShrink: 0 }}>✓</span>
                      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#C0C0C0' }}>{feat.name}</span>
                    </div>
                    {feat.price ? (
                      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '12.5px', color: '#666', textDecoration: 'line-through', whiteSpace: 'nowrap', marginLeft: '8px' }}>₹{feat.price.toLocaleString('en-IN')}</span>
                    ) : (
                      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '12.5px', color: '#c9a84c', fontWeight: 600, whiteSpace: 'nowrap', marginLeft: '8px' }}>Priceless</span>
                    )}
                  </div>
                ))}
              </div>
              {/* Total vs discounted */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.4)', borderRadius: '10px', padding: '12px 16px' }}>
                <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '13px', color: '#D4AF37', fontWeight: 700 }}>🔥 You Pay Today</span>
                <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '18px', color: '#D4AF37', fontWeight: 700 }}>₹1,299 only</span>
              </div>
            </div>

            {/* Primary CTA */}
            <a
              href={REPLACE_LAUNCHPAD_INDIA}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('launchpad_checkout_click', { region: 'IN', price: '₹1299' })}
              className="btn-gold pulse-glow"
              style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '17px', padding: '18px', fontWeight: 'bold', textDecoration: 'none', borderRadius: '12px' }}
            >
              Get Lifetime Access — India <ArrowIcon />
            </a>

            <a
              href={REPLACE_LAUNCHPAD_GLOBAL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('launchpad_checkout_click', { region: 'global', price: '$25' })}
              style={{ display: 'block', marginTop: '12px', fontFamily: 'Inter, sans-serif', fontSize: '13.5px', color: '#8E8E8E', textDecoration: 'underline', textAlign: 'center' }}
            >
              Outside India? Pay $25 globally →
            </a>
          </div>

          {/* Risk Reversal + Trust line */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13.5px', color: '#8E8E8E', margin: 0 }}>
              🔒 Secure Checkout &nbsp;•&nbsp; ⚡ Instant Access &nbsp;•&nbsp; 💬 Support Available
            </p>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#555', margin: 0 }}>
              By proceeding you agree to our Terms & Conditions
            </p>
          </div>

          {/* Downsell Checkout Link to Vault */}
          <div style={{ marginTop: '36px' }}>
            <Link
              to="/vault"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px dashed rgba(212,175,55,0.35)',
                borderRadius: '8px',
                padding: '11px 22px',
                color: '#8E8E8E',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '13px',
                fontWeight: 600,
                textDecoration: 'none',
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = '#D4AF37';
                e.currentTarget.style.background = 'rgba(212,175,55,0.07)';
                e.currentTarget.style.borderColor = 'rgba(212,175,55,0.65)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = '#8E8E8E';
                e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                e.currentTarget.style.borderColor = 'rgba(212,175,55,0.35)';
              }}
            >
              Not ready for the full system? Start with just core assets (starts at ₹699) →
            </Link>
          </div>

        </ScrollReveal>
      </section>

      {/* ── MOBILE STICKY CTA ── */}
      <MobileStickyCTA launchpadLink={REPLACE_LAUNCHPAD_INDIA} finalCtaRef={finalCtaRef} />

      <Footer instagramLink={REPLACE_INSTAGRAM} />

      {/* ── FULL PRODUCTS CATALOG MODAL ── */}
      {isCatalogOpen && (
        <Suspense fallback={null}>
          <FullProductsModal isOpen={isCatalogOpen} onClose={() => setIsCatalogOpen(false)} />
        </Suspense>
      )}
    </div>
  );
}

// ── INTERNAL COMPONENTS ──

const ToolMedia = ({ tool }) => {
  return (
    <div
      style={{
        width: '100%',
        maxWidth: '450px',
        aspectRatio: '16/9',
        borderRadius: '16px',
        border: '1px solid rgba(212,175,55,0.2)',
        background: '#0D0D0D',
        overflow: 'hidden',
        boxShadow: '0 10px 30px rgba(0,0,0,0.6)'
      }}
    >
      {tool.isVideo ? (
        <video
          src={tool.image}
          autoPlay
          muted
          loop
          playsInline
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      ) : (
        <img
          src={tool.image}
          alt={tool.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      )}
    </div>
  );
};

const ToolText = ({ tool, alignRight = false }) => {
  return (
    <div className={`flex flex-col ${alignRight ? 'md:items-end' : 'md:items-start'} items-start w-full max-w-[480px]`}>
      <div className={`flex items-center gap-4 mb-4 ${alignRight ? 'md:flex-row-reverse' : 'flex-row'}`}>
        <img src={tool.icon} alt="" className="w-[38px] h-auto object-contain" />
        <h3 className="font-bebas text-2xl md:text-[28px] gold-text tracking-wide m-0 leading-tight">
          {tool.title}
        </h3>
      </div>
      <ul className={`flex flex-col gap-3 ${alignRight ? 'md:items-end' : 'md:items-start'} items-start text-left w-full`}>
        {tool.points.map((point, idx) => (
          <li
            key={idx}
            className={`flex items-center gap-3 px-4 py-3 rounded-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.16)] max-w-full ${alignRight ? 'md:flex-row-reverse md:text-right' : ''}`}
          >
            <span style={{ color: '#D4AF37', fontWeight: 'bold', fontSize: '1.1rem' }}>✓</span>
            <p className="font-sans text-[rgba(255,255,255,0.8)] text-[14px] md:text-[15px] m-0 leading-tight" dangerouslySetInnerHTML={{ __html: point }} />
          </li>
        ))}
      </ul>
    </div>
  );
};



// ── MOBILE STICKY CTA ──
const MobileStickyCTA = ({ launchpadLink, finalCtaRef, heroRef }) => {
  const visible = useMobileStickyCTA(heroRef, finalCtaRef);
  return (
    <div className={`mobile-sticky-cta ${visible ? 'visible' : ''}`}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '13px', fontWeight: '600', color: '#ffffff' }}>
          Get Lifetime Access
        </span>
        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: '#8E8E8E' }}>
          One-time • ₹1,299
        </span>
      </div>
      <a
        href={launchpadLink}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-gold"
        style={{
          fontSize: '13px',
          padding: '10px 20px',
          fontWeight: 'bold',
          textDecoration: 'none',
          borderRadius: '9999px',
          flexShrink: 0
        }}
      >
        Join Now <ArrowIcon size={11} />
      </a>
    </div>
  );
};
