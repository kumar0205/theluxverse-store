import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/lux/Navbar';
import Footer from '@/components/lux/Footer';
import useFadeUp from '@/hooks/useFadeUp';

// ── PLACEHOLDER LINKS — ctrl+F to replace ──
const REPLACE_RAZORPAY_CREATOR = '#REPLACE_RAZORPAY_CREATOR';
const REPLACE_INSTAGRAM = '#REPLACE_INSTAGRAM';

const DELIVERY_STEPS = [
  { icon: '💳', step: '01', title: 'Click Buy', desc: 'Hit the button below — you\'ll land on the secure Razorpay payment page.' },
  { icon: '⚡', step: '02', title: 'Complete Payment', desc: 'Pay via UPI, card, or net banking. Takes under 60 seconds.' },
  { icon: '📁', step: '03', title: 'Access Your Vault', desc: 'Instant redirect to your Google Drive link. Download everything immediately.' },
];

const PERSONAS = [
  'You want to grow on Instagram without filming yourself daily',
  'You\'re ready to post content and earn from it',
  'You want a plug-and-post system for reels',
  'You want the starter benefits PLUS a full content engine',
  'You\'re serious about building an online income in 30 days',
];

const COMPARISON = [
  { feature: 'Ebooks Pack', starter: true, creator: true },
  { feature: 'Digital Products Bundle', starter: true, creator: true },
  { feature: 'Resell Rights', starter: true, creator: true },
  { feature: '10,000+ Reels Pack', starter: false, creator: true },
  { feature: 'Full Content Library', starter: false, creator: true },
  { feature: 'Editing Templates', starter: false, creator: true },
  { feature: 'Caption Swipe File (100+)', starter: false, creator: true },
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

export default function CreatorVault() {
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

        {/* Most Popular badge */}
        <div style={{ marginBottom: 16, display: 'inline-block', background: 'linear-gradient(135deg, #D4AF37, #F9E498)', color: '#050505', fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '0.7rem', letterSpacing: '0.15em', padding: '5px 14px', borderRadius: 3 }}>
          MOST POPULAR
        </div>

        <span className="section-label" style={{ marginBottom: 20, display: 'block' }}>CREATOR VAULT</span>
        <h1 className="font-bebas" style={{ fontSize: 'clamp(52px, 10vw, 110px)', color: '#ffffff', lineHeight: 1.05, marginBottom: 12 }}>
          POST, PROFIT, <span className="gold-text">REPEAT.</span>
        </h1>
        <div className="font-bebas" style={{
          fontSize: 'clamp(44px, 8vw, 80px)',
          background: 'linear-gradient(135deg, #D4AF37, #F9E498)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          marginBottom: 20,
        }}>
          ₹599
        </div>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(15px, 2vw, 18px)', color: '#8E8E8E', maxWidth: 520, lineHeight: 1.7, marginBottom: 36 }}>
          10,000+ ready-to-post reels plus the full Starter Vault. Built for creators who want to post daily and earn daily — without showing their face.
        </p>
        <a href={REPLACE_RAZORPAY_CREATOR} className="btn-gold pulse-glow" style={{ fontSize: '1.05rem' }}>
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
              icon: <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><rect x="8" y="6" width="32" height="36" rx="3" stroke="url(#cv1)" strokeWidth="1.5" fill="none"/><line x1="14" y1="16" x2="34" y2="16" stroke="url(#cv1)" strokeWidth="1.5" strokeLinecap="round"/><line x1="14" y1="22" x2="34" y2="22" stroke="url(#cv1)" strokeWidth="1.5" strokeLinecap="round"/><line x1="14" y1="28" x2="26" y2="28" stroke="url(#cv1)" strokeWidth="1.5" strokeLinecap="round"/><defs><linearGradient id="cv1" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse"><stop stopColor="#D4AF37"/><stop offset="1" stopColor="#F9E498"/></linearGradient></defs></svg>,
              title: 'Ebooks Pack + Digital Products Bundle',
              desc: 'Everything from the Starter Vault — hundreds of ebooks, templates, guides and digital products with full resell rights.',
              perfect: 'Reading, reselling, building offers',
              delay: '0s',
            },
            {
              icon: <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><rect x="4" y="8" width="40" height="28" rx="3" stroke="url(#cv2)" strokeWidth="1.5" fill="none"/><path d="M20 22l10-6v12l-10-6z" fill="url(#cv2)" opacity="0.5"/><defs><linearGradient id="cv2" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse"><stop stopColor="#D4AF37"/><stop offset="1" stopColor="#F9E498"/></linearGradient></defs></svg>,
              title: '10,000+ Reels Pack',
              desc: 'Faceless viral reels ready to download and post — business, wealth, motivation, and lifestyle niches. No filming. No editing. Just download and post.',
              perfect: 'Growing Instagram, driving traffic, going viral',
              delay: '0.1s',
            },
            {
              icon: <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><path d="M8 12h32M8 20h32M8 28h20" stroke="url(#cv3)" strokeWidth="1.5" strokeLinecap="round"/><rect x="6" y="6" width="36" height="36" rx="3" stroke="url(#cv3)" strokeWidth="1" fill="none" opacity="0.3"/><defs><linearGradient id="cv3" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse"><stop stopColor="#D4AF37"/><stop offset="1" stopColor="#F9E498"/></linearGradient></defs></svg>,
              title: 'Caption Swipe File (100+ Captions)',
              desc: '100+ proven viral captions categorized by niche and intent. Copy, paste, post. Built for maximum engagement and profile growth.',
              perfect: 'Instagram growth, content strategy, saving hours daily',
              delay: '0.2s',
            },
          ].map((item, i) => (
            <div key={i} className={`vault-card fade-up ${contentVisible ? 'visible' : ''}`} style={{ marginBottom: 20, transitionDelay: item.delay }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20, flexWrap: 'wrap' }}>
                <div style={{ flexShrink: 0 }}>{item.icon}</div>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '1.15rem', color: '#F9E498', marginBottom: 8 }}>{item.title}</h3>
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
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <div ref={compareRef} style={{ textAlign: 'center', marginBottom: 40 }}>
            <span className="section-label" style={{ marginBottom: 16, display: 'block' }}>STARTER VS CREATOR</span>
            <h2 className="font-bebas" style={{ fontSize: 'clamp(32px, 5vw, 56px)', color: '#ffffff' }}>
              See The <span className="gold-text">Difference</span>
            </h2>
          </div>
          <div className={`fade-up ${compareVisible ? 'visible' : ''}`} style={{ background: '#0D0D0D', border: '1px solid rgba(212,175,55,0.12)', borderRadius: 8, overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', background: '#111111', padding: '14px 20px', borderBottom: '1px solid rgba(212,175,55,0.1)' }}>
              <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.8rem', color: '#8E8E8E' }}>Feature</span>
              <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.8rem', color: '#8E8E8E', textAlign: 'center' }}>Starter ₹299</span>
              <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.8rem', color: '#D4AF37', textAlign: 'center', fontWeight: 600 }}>Creator ₹599</span>
            </div>
            {COMPARISON.map((row, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', padding: '14px 20px', borderBottom: i < COMPARISON.length - 1 ? '1px solid rgba(212,175,55,0.06)' : 'none', alignItems: 'center' }}>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.88rem', color: '#F9E498' }}>{row.feature}</span>
                <div style={{ display: 'flex', justifyContent: 'center' }}><CheckMark yes={row.starter} /></div>
                <div style={{ display: 'flex', justifyContent: 'center' }}><CheckMark yes={row.creator} /></div>
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
              The Creator Vault Is <span className="gold-text">Built For You If...</span>
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
          Get Creator Vault for <span className="gold-text">₹599 →</span>
        </h2>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(15px, 2vw, 17px)', color: '#8E8E8E', marginBottom: 36 }}>
          One-time payment. Instant access. Yours forever.
        </p>
        <a href={REPLACE_RAZORPAY_CREATOR} className="btn-gold pulse-glow" style={{ fontSize: '1.05rem' }}>
          Get Creator Vault for ₹599 →
        </a>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.78rem', color: '#555', marginTop: 16, letterSpacing: '0.05em' }}>
          🔒 Secure payment via Razorpay | Instant delivery
        </p>
        <div style={{ marginTop: 28 }}>
          <Link to="/full-vault" style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.85rem', color: '#D4AF37', textDecoration: 'none', borderBottom: '1px solid rgba(212,175,55,0.3)', paddingBottom: 2 }}>
            Want everything? See Full Vault →
          </Link>
        </div>
      </section>

      <Footer instagramLink={REPLACE_INSTAGRAM} />
    </div>
  );
}