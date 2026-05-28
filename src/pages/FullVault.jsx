import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/lux/Navbar';
import Footer from '@/components/lux/Footer';
import useFadeUp from '@/hooks/useFadeUp';

// ── PLACEHOLDER LINKS — ctrl+F to replace ──
const REPLACE_RAZORPAY_FULL = '#REPLACE_RAZORPAY_FULL';
const REPLACE_INSTAGRAM = '#REPLACE_INSTAGRAM';

const DELIVERY_STEPS = [
  { icon: '💳', step: '01', title: 'Click Buy', desc: 'Hit the button below — you\'ll land on the secure Razorpay payment page.' },
  { icon: '⚡', step: '02', title: 'Complete Payment', desc: 'Pay via UPI, card, or net banking. Takes under 60 seconds.' },
  { icon: '📁', step: '03', title: 'Access Your Vault', desc: 'Instant redirect to your Google Drive link. Download everything immediately.' },
];

const PERSONAS = [
  'You want the complete digital products arsenal — nothing left out',
  'You want to learn AND earn at the same time',
  'You want AI tools to sell to businesses and freelancers',
  'You want 1000+ premium courses to resell at high ticket',
  'You\'re ready to build a serious digital income, not just side money',
];

const COMPARISON = [
  { feature: 'Ebooks Pack', starter: true, creator: true, full: true },
  { feature: 'Digital Products Bundle', starter: true, creator: true, full: true },
  { feature: 'Resell Rights', starter: true, creator: true, full: true },
  { feature: '10,000+ Reels Pack', starter: false, creator: true, full: true },
  { feature: 'Caption Swipe File', starter: false, creator: true, full: true },
  { feature: '1000+ Premium Courses', starter: false, creator: false, full: true },
  { feature: '15K AI Agent Templates', starter: false, creator: false, full: true },
];

const CheckMark = ({ yes }) => yes ? (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="9" fill="rgba(212,175,55,0.1)" stroke="#D4AF37" strokeWidth="1"/>
    <path d="M6 10l3 3 5-6" stroke="#D4AF37" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
) : (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="9" fill="rgba(100,100,100,0.06)" stroke="rgba(100,100,100,0.2)" strokeWidth="1"/>
    <path d="M7 10h6" stroke="#555" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export default function FullVault() {
  const { ref: contentRef, visible: contentVisible } = useFadeUp();
  const { ref: deliveryRef, visible: deliveryVisible } = useFadeUp();
  const { ref: personaRef, visible: personaVisible } = useFadeUp();
  const { ref: compareRef, visible: compareVisible } = useFadeUp();

  return (
    <div style={{ background: '#050505', minHeight: '100vh', overflowX: 'hidden' }}>
      <Navbar />

      {/* ── HERO ── */}
      <section style={{
        minHeight: '75vh',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '120px 20px 80px', textAlign: 'center',
        background: 'radial-gradient(ellipse at center, #1a1400 0%, #050505 80%)',
        position: 'relative',
      }}>
        <Link to="/#vault" style={{
          position: 'absolute', top: 100, left: 24,
          fontFamily: 'Poppins, sans-serif', fontSize: '0.85rem',
          color: '#8E8E8E', textDecoration: 'none',
          display: 'flex', alignItems: 'center', gap: 6, transition: 'color 0.3s',
        }}
          onMouseEnter={e => e.currentTarget.style.color = '#D4AF37'}
          onMouseLeave={e => e.currentTarget.style.color = '#8E8E8E'}
        >
          ← Back to All Vaults
        </Link>

        <div style={{ marginBottom: 16, display: 'inline-block', background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.3)', color: '#D4AF37', fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '0.7rem', letterSpacing: '0.15em', padding: '5px 14px', borderRadius: 3 }}>
          BEST VALUE
        </div>
        <span className="section-label" style={{ marginBottom: 20, display: 'block' }}>FULL VAULT</span>
        <h1 className="font-bebas" style={{ fontSize: 'clamp(52px, 10vw, 110px)', color: '#ffffff', lineHeight: 1.05, marginBottom: 12 }}>
          THE COMPLETE <span className="gold-text">ARSENAL.</span>
        </h1>
        <div className="font-bebas" style={{
          fontSize: 'clamp(44px, 8vw, 80px)',
          background: 'linear-gradient(135deg, #D4AF37, #F9E498)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          marginBottom: 20,
        }}>
          ₹999
        </div>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(15px, 2vw, 18px)', color: '#8E8E8E', maxWidth: 540, lineHeight: 1.7, marginBottom: 36 }}>
          Every single product. Every single tool. 1M+ digital assets, 1000+ courses, 15K AI templates — all unlocked for one payment. This is the vault that makes the others look like a preview.
        </p>
        <a href={REPLACE_RAZORPAY_FULL} className="btn-gold pulse-glow" style={{ fontSize: '1.05rem' }}>
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

          {[
            {
              title: 'Ebooks Pack + Digital Products Bundle',
              desc: 'Everything from the Starter Vault — premium ebooks, templates, guides, and digital products with full resell rights.',
              perfect: 'Reselling, knowledge building, creating offers',
              delay: '0s',
            },
            {
              title: '10,000+ Reels + Content Library',
              desc: 'Faceless viral reels ready to post, plus the full content library with editing templates and 100+ caption swipe file.',
              perfect: 'Instagram growth, daily posting, traffic generation',
              delay: '0.1s',
            },
            {
              title: '1,000+ Premium Courses',
              desc: 'Full courses on business, marketing, AI, coding, investing, dropshipping and more — professionally made, high-value, fully resellable.',
              perfect: 'Learning, reselling at high-ticket, building authority',
              delay: '0.2s',
            },
            {
              title: '15,000+ AI Agent Templates',
              desc: 'Ready-made AI automation templates for ChatGPT, Claude, and other AI tools. The hottest category to sell right now.',
              perfect: 'Productivity, freelancing, selling to businesses',
              delay: '0.3s',
            },
          ].map((item, i) => (
            <div key={i} className={`vault-card fade-up ${contentVisible ? 'visible' : ''}`} style={{ marginBottom: 20, transitionDelay: item.delay }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, flexWrap: 'wrap' }}>
                <div style={{
                  flexShrink: 0, width: 44, height: 44, borderRadius: 8,
                  background: 'linear-gradient(135deg, #D4AF37, #F9E498)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.4rem', color: '#050505',
                }}>
                  {['E', 'R', 'C', 'AI'][i]}
                </div>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '1.1rem', color: '#F9E498', marginBottom: 8 }}>{item.title}</h3>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.92rem', color: '#8E8E8E', lineHeight: 1.7, marginBottom: 10 }}>{item.desc}</p>
                  <div style={{ display: 'inline-flex', alignItems: 'center', background: 'rgba(212,175,55,0.06)', border: '1px solid rgba(212,175,55,0.15)', borderRadius: 4, padding: '5px 12px' }}>
                    <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.72rem', color: '#D4AF37', letterSpacing: '0.08em' }}>PERFECT FOR: {item.perfect}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.15), transparent)' }} />

      {/* ── COMPARISON TABLE ── */}
      <section style={{ padding: 'clamp(60px, 8vw, 100px) 20px', background: '#050505' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div ref={compareRef} style={{ textAlign: 'center', marginBottom: 40 }}>
            <span className="section-label" style={{ marginBottom: 16, display: 'block' }}>ALL TIERS COMPARED</span>
            <h2 className="font-bebas" style={{ fontSize: 'clamp(32px, 5vw, 56px)', color: '#ffffff' }}>
              Why Full Vault <span className="gold-text">Wins</span>
            </h2>
          </div>
          <div className={`fade-up ${compareVisible ? 'visible' : ''}`} style={{ background: '#0D0D0D', border: '1px solid rgba(212,175,55,0.12)', borderRadius: 8, overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', background: '#111111', padding: '14px 16px', borderBottom: '1px solid rgba(212,175,55,0.1)' }}>
              <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.75rem', color: '#8E8E8E' }}>Feature</span>
              <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.75rem', color: '#8E8E8E', textAlign: 'center' }}>₹299</span>
              <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.75rem', color: '#8E8E8E', textAlign: 'center' }}>₹599</span>
              <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.75rem', color: '#D4AF37', textAlign: 'center', fontWeight: 600 }}>₹999 ✦</span>
            </div>
            {COMPARISON.map((row, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', padding: '13px 16px', borderBottom: i < COMPARISON.length - 1 ? '1px solid rgba(212,175,55,0.06)' : 'none', alignItems: 'center' }}>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: '#F9E498' }}>{row.feature}</span>
                <div style={{ display: 'flex', justifyContent: 'center' }}><CheckMark yes={row.starter} /></div>
                <div style={{ display: 'flex', justifyContent: 'center' }}><CheckMark yes={row.creator} /></div>
                <div style={{ display: 'flex', justifyContent: 'center' }}><CheckMark yes={row.full} /></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.15), transparent)' }} />

      {/* ── WHO IS THIS FOR ── */}
      <section style={{ padding: 'clamp(60px, 8vw, 100px) 20px', background: '#0D0D0D' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div ref={personaRef} style={{ textAlign: 'center', marginBottom: 40 }}>
            <span className="section-label" style={{ marginBottom: 16, display: 'block' }}>IS THIS YOU?</span>
            <h2 className="font-bebas" style={{ fontSize: 'clamp(32px, 5vw, 60px)', color: '#ffffff' }}>
              The Full Vault Is <span className="gold-text">Built For You If...</span>
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {PERSONAS.map((p, i) => (
              <div key={i} className={`fade-up ${personaVisible ? 'visible' : ''}`} style={{ transitionDelay: `${i * 0.08}s`, display: 'flex', alignItems: 'center', gap: 14, background: '#111111', border: '1px solid rgba(212,175,55,0.08)', borderRadius: 8, padding: '16px 20px' }}>
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
      <section style={{ padding: 'clamp(60px, 8vw, 100px) 20px', background: '#050505' }}>
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
      <section style={{ padding: 'clamp(80px, 10vw, 140px) 20px', background: 'radial-gradient(ellipse at center, #1a1400 0%, #050505 80%)', textAlign: 'center' }}>
        <h2 className="font-bebas" style={{ fontSize: 'clamp(40px, 7vw, 88px)', color: '#ffffff', lineHeight: 1.05, marginBottom: 20 }}>
          Get Full Vault for <span className="gold-text">₹999 →</span>
        </h2>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(15px, 2vw, 17px)', color: '#8E8E8E', marginBottom: 36 }}>
          One-time payment. Everything unlocked. Yours forever.
        </p>
        <a href={REPLACE_RAZORPAY_FULL} className="btn-gold pulse-glow" style={{ fontSize: '1.05rem' }}>
          Get Full Vault for ₹999 →
        </a>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.78rem', color: '#555', marginTop: 16, letterSpacing: '0.05em' }}>
          🔒 Secure payment via Razorpay | Instant delivery
        </p>
      </section>

      <Footer instagramLink={REPLACE_INSTAGRAM} />
    </div>
  );
}