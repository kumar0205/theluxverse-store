import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/lux/Navbar';
import Footer from '@/components/lux/Footer';
import Particles from '@/components/lux/Particles';
import VaultItem from '@/components/lux/VaultItem';
import ArrowIcon from '@/components/lux/ArrowIcon';
import useFadeUp from '@/hooks/useFadeUp';
import { VAULT_PRODUCTS } from '@/data/vaultData';

import { PRODUCTS, GLOBAL_CONFIG, DELIVERY_STEPS } from '@/config/products';
import CheckMark from '@/components/lux/CheckMark';

// ── PLACEHOLDER LINKS ──
const REPLACE_RAZORPAY_FULL = PRODUCTS.fullVault.url;
const REPLACE_INSTAGRAM = GLOBAL_CONFIG.instagram;

const PERSONAS = [
  'You want the complete digital products arsenal — nothing left out',
  'You want a plug-and-post system for reels with 15k+ ready-made videos',
  'You want to grow on Instagram without filming yourself daily',
  'You want the starter benefits PLUS a full content engine',
  'You\'re ready to build a serious digital income, not just side money',
];

const COMPARISON = [
  { feature: 'Ebooks & Digital Products', full: true, launchpad: true },
  { feature: 'Resell Rights & License', full: true, launchpad: true },
  { feature: '1000+ Premium Courses', full: true, launchpad: true },
  { feature: '15K+ AI Agent Templates', full: true, launchpad: true },
  { feature: '15k+ Reels & swipe file', full: true, launchpad: true },
  { feature: 'Step-by-Step Video Training', full: false, launchpad: true },
  { feature: 'Discord Private Community', full: false, launchpad: true },
  { feature: 'Hand-Holding Support', full: false, launchpad: true },
];

export default function FullVault() {
  const { ref: contentRef, visible: contentVisible } = useFadeUp();
  const { ref: deliveryRef, visible: deliveryVisible } = useFadeUp();
  const { ref: personaRef, visible: personaVisible } = useFadeUp();
  const { ref: compareRef, visible: compareVisible } = useFadeUp();

  return (
    <div style={{ background: '#050505', minHeight: '100vh' }}>
      <Navbar />

      {/* ── HERO ── */}
      <section style={{
        minHeight: '75vh',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '120px 20px 80px', textAlign: 'center',
        background: 'radial-gradient(ellipse at center, #1a1400 0%, #050505 80%)',
        position: 'relative', overflow: 'hidden'
      }}>
        <Particles count={6} />
        <Link to="/vault" style={{
          position: 'absolute', top: 100, left: 24,
          fontFamily: 'Poppins, sans-serif', fontSize: '0.85rem',
          color: '#ffffff', textDecoration: 'none',
          display: 'flex', alignItems: 'center', gap: 6, transition: 'color 0.3s',
        }}
          onMouseEnter={e => e.currentTarget.style.color = '#D4AF37'}
          onMouseLeave={e => e.currentTarget.style.color = '#ffffff'}
        >
          ← Back to All Vaults
        </Link>


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
          Buy Full Vault for ₹999 <ArrowIcon />
        </a>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.78rem', color: 'rgba(255, 255, 255, 0.5)', marginTop: 14, letterSpacing: '0.05em' }}>
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

          <div className={`fade-up ${contentVisible ? 'visible' : ''}`}>
            <VaultItem
              icon={
                <div style={{ flexShrink: 0, width: 44, height: 44, borderRadius: 8, background: 'linear-gradient(135deg, #D4AF37, #F9E498)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.4rem', color: '#050505' }}>E</div>
              }
              title="Ebooks Pack + Digital Products Bundle"
              desc="Premium ebooks, templates, guides, and digital products with full resell rights."
              perfectFor="Reselling, knowledge building, creating offers"
              products={[...VAULT_PRODUCTS.ebooks, ...VAULT_PRODUCTS.digitalProducts.filter(p => p !== '+ Many More...')]}
            />

            <VaultItem
              icon={
                <div style={{ flexShrink: 0, width: 44, height: 44, borderRadius: 8, background: 'linear-gradient(135deg, #D4AF37, #F9E498)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.4rem', color: '#050505' }}>R</div>
              }
              title="15k+ Reels + Content Library"
              desc="Faceless viral reels ready to post, plus the full content library with editing templates and 100+ caption swipe file."
              perfectFor="Instagram growth, daily posting, traffic generation"
              products={[...VAULT_PRODUCTS.reels, '100+ Caption Swipe File', 'Editing Templates']}
            />

            <VaultItem
              icon={
                <div style={{ flexShrink: 0, width: 44, height: 44, borderRadius: 8, background: 'linear-gradient(135deg, #D4AF37, #F9E498)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.4rem', color: '#050505' }}>C</div>
              }
              title="1,000+ Premium Courses"
              desc="Full courses on business, marketing, AI, coding, investing, dropshipping and more — professionally made, high-value, fully resellable."
              perfectFor="Learning, reselling at high-ticket, building authority"
              products={VAULT_PRODUCTS.courses}
            />

            <VaultItem
              icon={
                <div style={{ flexShrink: 0, width: 44, height: 44, borderRadius: 8, background: 'linear-gradient(135deg, #D4AF37, #F9E498)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.4rem', color: '#050505' }}>AI</div>
              }
              title="15k+ AI Agent Templates"
              desc="Ready-made AI automation templates for ChatGPT, Claude, and other AI tools. The hottest category to sell right now."
              perfectFor="Productivity, freelancing, selling to businesses"
              products={VAULT_PRODUCTS.aiTemplates}
            />
          </div>
        </div>
      </section>

      <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.15), transparent)' }} />

      {/* ── COMPARISON TABLE ── */}
      <section style={{ padding: 'clamp(60px, 8vw, 100px) 20px', background: '#050505' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div ref={compareRef} style={{ textAlign: 'center', marginBottom: 40 }}>
            <span className="section-label" style={{ marginBottom: 16, display: 'block' }}>COMPARE UPGRADES</span>
            <h2 className="font-bebas" style={{ fontSize: 'clamp(32px, 5vw, 56px)', color: '#ffffff' }}>
              Full Vault vs <span className="gold-text">Launchpad</span>
            </h2>
          </div>
          <div className={`fade-up ${compareVisible ? 'visible' : ''}`} style={{ background: '#0D0D0D', border: '1px solid rgba(212,175,55,0.12)', borderRadius: 8, overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', background: '#111111', borderBottom: '1px solid rgba(212,175,55,0.1)' }} className="text-[10px] sm:text-sm p-3 sm:p-4">
              <span style={{ fontFamily: 'Poppins, sans-serif', color: '#8E8E8E' }}>Feature</span>
              <span style={{ fontFamily: 'Poppins, sans-serif', color: '#ffffff', textAlign: 'center', fontWeight: 600 }}>Full Vault (₹999)</span>
              <span style={{ fontFamily: 'Poppins, sans-serif', color: '#D4AF37', textAlign: 'center', fontWeight: 600 }}>Launchpad ✦</span>
            </div>
            {COMPARISON.map((row, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', borderBottom: i < COMPARISON.length - 1 ? '1px solid rgba(212,175,55,0.06)' : 'none', alignItems: 'center' }} className="text-[10px] sm:text-sm p-3 sm:p-4">
                <span style={{ fontFamily: 'Inter, sans-serif', color: '#D4AF37' }}>{row.feature}</span>
                <div style={{ display: 'flex', justifyContent: 'center' }}><CheckMark yes={row.full} /></div>
                <div style={{ display: 'flex', justifyContent: 'center' }}><CheckMark yes={row.launchpad} /></div>
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
                  <circle cx="11" cy="11" r="10" stroke="#D4AF37" strokeWidth="1" fill="rgba(212,175,55,0.06)" />
                  <path d="M6.5 11L9.5 14L15.5 8" stroke="#D4AF37" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.95rem', color: '#D4AF37', lineHeight: 1.5 }}>{p}</span>
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
          TAKE ACTION TODAY.<br /> <span className="gold-text">SEE RESULTS TOMORROW.</span>
        </h2>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(15px, 2vw, 17px)', color: '#8E8E8E', marginBottom: 36 }}>
          One-time payment. Everything unlocked. Yours forever.
        </p>
        <a href={REPLACE_RAZORPAY_FULL} className="btn-gold pulse-glow" style={{ fontSize: '1.05rem' }}>
          Get Full Vault for ₹999 <ArrowIcon />
        </a>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.78rem', color: 'rgba(255, 255, 255, 0.5)', marginTop: 16, letterSpacing: '0.05em' }}>
          🔒 Secure payment via Razorpay | Instant delivery
        </p>
      </section>

      <Footer instagramLink={REPLACE_INSTAGRAM} />
    </div>
  );
}