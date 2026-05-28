import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/lux/Navbar';
import Footer from '@/components/lux/Footer';
import FaqAccordion from '@/components/lux/FaqAccordion';
import useFadeUp from '@/hooks/useFadeUp';

// ── PLACEHOLDER LINKS — ctrl+F to replace ──
const REPLACE_RAZORPAY_STARTER = '#REPLACE_RAZORPAY_STARTER';
const REPLACE_INSTAGRAM = '#REPLACE_INSTAGRAM';

const DELIVERY_STEPS = [
  { icon: '💳', step: '01', title: 'Click Buy', desc: 'Hit the button below — you\'ll land on the secure Razorpay payment page.' },
  { icon: '⚡', step: '02', title: 'Complete Payment', desc: 'Pay via UPI, card, or net banking. Takes under 60 seconds.' },
  { icon: '📁', step: '03', title: 'Access Your Vault', desc: 'Instant redirect to your Google Drive link. Download everything immediately.' },
];

const PERSONAS = [
  'You want to start with low investment (just ₹299)',
  'You want to test digital products before going all-in',
  'You\'re building your first online income stream',
  'You want ready-made products you can resell immediately',
  'You\'re tired of courses that teach theory — you want assets',
];

export default function StarterVault() {
  const { ref: contentRef, visible: contentVisible } = useFadeUp();
  const { ref: deliveryRef, visible: deliveryVisible } = useFadeUp();
  const { ref: personaRef, visible: personaVisible } = useFadeUp();

  return (
    <div style={{ background: '#050505', minHeight: '100vh', overflowX: 'hidden' }}>
      <Navbar />

      {/* ── HERO ── */}
      <section style={{
        minHeight: '75vh',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '120px 20px 80px',
        textAlign: 'center',
        background: 'radial-gradient(ellipse at center, #1a1400 0%, #050505 80%)',
        position: 'relative',
      }}>
        <Link to="/#vault" style={{
          position: 'absolute', top: 100, left: 24,
          fontFamily: 'Poppins, sans-serif', fontSize: '0.85rem',
          color: '#8E8E8E', textDecoration: 'none',
          display: 'flex', alignItems: 'center', gap: 6,
          transition: 'color 0.3s',
        }}
          onMouseEnter={e => e.currentTarget.style.color = '#D4AF37'}
          onMouseLeave={e => e.currentTarget.style.color = '#8E8E8E'}
        >
          ← Back to All Vaults
        </Link>

        <span className="section-label" style={{ marginBottom: 20, display: 'inline-block', background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.3)', padding: '6px 16px', borderRadius: 3 }}>
          STARTER VAULT
        </span>
        <h1 className="font-bebas" style={{ fontSize: 'clamp(52px, 10vw, 110px)', color: '#ffffff', lineHeight: 1.05, marginBottom: 12 }}>
          YOUR FIRST STEP INTO <span className="gold-text">THE GAME</span>
        </h1>
        <div className="font-bebas" style={{
          fontSize: 'clamp(44px, 8vw, 80px)',
          background: 'linear-gradient(135deg, #D4AF37, #F9E498)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          marginBottom: 20,
        }}>
          ₹299
        </div>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(15px, 2vw, 18px)', color: '#8E8E8E', maxWidth: 520, lineHeight: 1.7, marginBottom: 36 }}>
          Premium digital products ready to download, use, and resell — all for less than the price of a lunch.
        </p>
        <a href={REPLACE_RAZORPAY_STARTER} className="btn-gold pulse-glow" style={{ fontSize: '1.05rem' }}>
          Get Instant Access →
        </a>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.78rem', color: '#555', marginTop: 14, letterSpacing: '0.05em' }}>
          🔒 Secure payment via Razorpay | Instant delivery
        </p>
      </section>

      <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.3), transparent)' }} />

      {/* ── WHAT'S INSIDE ── */}
      <section style={{ padding: 'clamp(60px, 10vw, 120px) 20px', background: '#0D0D0D' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div ref={contentRef} style={{ textAlign: 'center', marginBottom: 52 }}>
            <span className="section-label" style={{ marginBottom: 16, display: 'block' }}>WHAT YOU GET</span>
            <h2 className="font-bebas" style={{ fontSize: 'clamp(36px, 5vw, 64px)', color: '#ffffff' }}>
              Everything <span className="gold-text">You Get</span>
            </h2>
          </div>

          {/* Product 1 */}
          <div className={`vault-card fade-up ${contentVisible ? 'visible' : ''}`} style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20, flexWrap: 'wrap' }}>
              <div style={{ fontSize: '2.5rem', flexShrink: 0 }}>
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <rect x="8" y="6" width="32" height="36" rx="3" stroke="url(#sv1)" strokeWidth="1.5" fill="none"/>
                  <line x1="14" y1="16" x2="34" y2="16" stroke="url(#sv1)" strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="14" y1="22" x2="34" y2="22" stroke="url(#sv1)" strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="14" y1="28" x2="26" y2="28" stroke="url(#sv1)" strokeWidth="1.5" strokeLinecap="round"/>
                  <defs><linearGradient id="sv1" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse"><stop stopColor="#D4AF37"/><stop offset="1" stopColor="#F9E498"/></linearGradient></defs>
                </svg>
              </div>
              <div style={{ flex: 1, minWidth: 200 }}>
                <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '1.15rem', color: '#F9E498', marginBottom: 8 }}>
                  Ebooks Pack
                </h3>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.92rem', color: '#8E8E8E', lineHeight: 1.7, marginBottom: 10 }}>
                  Hundreds of premium ebooks across business, mindset, wealth, and lifestyle niches — professionally designed and ready to distribute.
                </p>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(212,175,55,0.06)', border: '1px solid rgba(212,175,55,0.15)', borderRadius: 4, padding: '5px 12px' }}>
                  <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.72rem', color: '#D4AF37', letterSpacing: '0.08em' }}>
                    PERFECT FOR: Reading, reselling, building knowledge
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Product 2 */}
          <div className={`vault-card fade-up ${contentVisible ? 'visible' : ''}`} style={{ transitionDelay: '0.1s' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20, flexWrap: 'wrap' }}>
              <div style={{ flexShrink: 0 }}>
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <rect x="6" y="10" width="36" height="28" rx="3" stroke="url(#sv2)" strokeWidth="1.5" fill="none"/>
                  <path d="M20 24l8-5v10l-8-5z" fill="url(#sv2)" opacity="0.6"/>
                  <defs><linearGradient id="sv2" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse"><stop stopColor="#D4AF37"/><stop offset="1" stopColor="#F9E498"/></linearGradient></defs>
                </svg>
              </div>
              <div style={{ flex: 1, minWidth: 200 }}>
                <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '1.15rem', color: '#F9E498', marginBottom: 8 }}>
                  Digital Products Bundle
                </h3>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.92rem', color: '#8E8E8E', lineHeight: 1.7, marginBottom: 10 }}>
                  Ready-made digital products across multiple categories — templates, guides, planners and more. Each comes with resell rights attached.
                </p>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(212,175,55,0.06)', border: '1px solid rgba(212,175,55,0.15)', borderRadius: 4, padding: '5px 12px' }}>
                  <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.72rem', color: '#D4AF37', letterSpacing: '0.08em' }}>
                    PERFECT FOR: Instant reselling, gifting, building offers
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.15), transparent)' }} />

      {/* ── WHO IS THIS FOR ── */}
      <section style={{ padding: 'clamp(60px, 8vw, 100px) 20px', background: '#050505' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div ref={personaRef} style={{ textAlign: 'center', marginBottom: 40 }}>
            <span className="section-label" style={{ marginBottom: 16, display: 'block' }}>IS THIS YOU?</span>
            <h2 className="font-bebas" style={{ fontSize: 'clamp(32px, 5vw, 60px)', color: '#ffffff' }}>
              The Starter Vault Is <span className="gold-text">Built For You If...</span>
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {PERSONAS.map((p, i) => (
              <div key={i} className={`fade-up ${personaVisible ? 'visible' : ''}`} style={{
                transitionDelay: `${i * 0.08}s`,
                display: 'flex', alignItems: 'center', gap: 14,
                background: '#0D0D0D', border: '1px solid rgba(212,175,55,0.08)',
                borderRadius: 8, padding: '16px 20px',
              }}>
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" style={{ flexShrink: 0 }}>
                  <circle cx="11" cy="11" r="10" stroke="#D4AF37" strokeWidth="1" fill="rgba(212,175,55,0.06)"/>
                  <path d="M6.5 11L9.5 14L15.5 8" stroke="#D4AF37" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.95rem', color: '#F9E498', lineHeight: 1.5 }}>{p}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.15), transparent)' }} />

      {/* ── DELIVERY ── */}
      <section style={{ padding: 'clamp(60px, 8vw, 100px) 20px', background: '#0D0D0D' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div ref={deliveryRef} style={{ textAlign: 'center', marginBottom: 48 }}>
            <span className="section-label" style={{ marginBottom: 16, display: 'block' }}>HOW IT WORKS</span>
            <h2 className="font-bebas" style={{ fontSize: 'clamp(32px, 5vw, 60px)', color: '#ffffff' }}>
              3 Steps to <span className="gold-text">Instant Access</span>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
            {DELIVERY_STEPS.map((s, i) => (
              <div key={i} className={`vault-card fade-up ${deliveryVisible ? 'visible' : ''}`} style={{ transitionDelay: `${i * 0.1}s`, textAlign: 'center' }}>
                <div style={{ fontSize: '1.8rem', marginBottom: 12 }}>{s.icon}</div>
                <div className="font-bebas" style={{ fontSize: '2.5rem', color: '#D4AF37', lineHeight: 1, marginBottom: 10 }}>{s.step}</div>
                <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '1rem', color: '#ffffff', marginBottom: 8 }}>{s.title}</h3>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: '#8E8E8E', lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.3), transparent)' }} />

      {/* ── FINAL CTA ── */}
      <section style={{
        padding: 'clamp(80px, 10vw, 140px) 20px',
        background: 'radial-gradient(ellipse at center, #1a1400 0%, #050505 80%)',
        textAlign: 'center',
      }}>
        <h2 className="font-bebas" style={{ fontSize: 'clamp(40px, 7vw, 88px)', color: '#ffffff', lineHeight: 1.05, marginBottom: 20 }}>
          Get Starter Vault for <span className="gold-text">₹299 →</span>
        </h2>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(15px, 2vw, 17px)', color: '#8E8E8E', marginBottom: 36 }}>
          One-time payment. Instant access. Yours forever.
        </p>
        <a href={REPLACE_RAZORPAY_STARTER} className="btn-gold pulse-glow" style={{ fontSize: '1.05rem' }}>
          Get Starter Vault for ₹299 →
        </a>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.78rem', color: '#555', marginTop: 16, letterSpacing: '0.05em' }}>
          🔒 Secure payment via Razorpay | Instant delivery
        </p>
        <div style={{ marginTop: 28 }}>
          <Link to="/creator-vault" style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.85rem', color: '#D4AF37', textDecoration: 'none', borderBottom: '1px solid rgba(212,175,55,0.3)', paddingBottom: 2 }}>
            Want more? See Creator Vault →
          </Link>
        </div>
      </section>

      <Footer instagramLink={REPLACE_INSTAGRAM} />
    </div>
  );
}