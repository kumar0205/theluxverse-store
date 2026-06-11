import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/lux/Navbar';
import Footer from '@/components/lux/Footer';
import useFadeUp from '@/hooks/useFadeUp';
import Particles from '@/components/lux/Particles';
import ArrowIcon from '@/components/lux/ArrowIcon';
import { VAULT_PRODUCTS } from '@/data/vaultData';

import { PRODUCTS, GLOBAL_CONFIG, DELIVERY_STEPS } from '@/config/products';
import CheckMark from '@/components/lux/CheckMark';

// ── PLACEHOLDER LINKS — ctrl+F to replace ──
const REPLACE_RAZORPAY_CREATOR = PRODUCTS.creatorVault.url;
const REPLACE_INSTAGRAM = GLOBAL_CONFIG.instagram;

const PERSONAS = [
  'You want to learn AND earn at the same time',
  'You want AI tools to sell to businesses and freelancers',
  'You want premium courses to resell at high ticket',
  'You want the starter benefits PLUS the courses and AI templates',
  'You\'re serious about building an online income in 30 days',
];

const COMPARISON = [
  { feature: 'Ebooks Pack', creator: true, full: true },
  { feature: 'Digital Products Bundle', creator: true, full: true },
  { feature: 'Resell Rights', creator: true, full: true },
  { feature: '1000+ Premium Courses', creator: true, full: true },
  { feature: '15K+ AI Agent Templates', creator: true, full: true },
  { feature: '15,000+ Reels Pack', creator: false, full: true },
  { feature: 'Caption Swipe File (100+)', creator: false, full: true },
];

export default function CreatorVault() {
  const { ref: contentRef, visible: contentVisible } = useFadeUp();
  const { ref: deliveryRef, visible: deliveryVisible } = useFadeUp();
  const { ref: personaRef, visible: personaVisible } = useFadeUp();
  const { ref: compareRef, visible: compareVisible } = useFadeUp();
  const [expandedItem, setExpandedItem] = useState(null);

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
        position: 'relative',
        overflow: 'hidden'
      }}>
        <Particles count={5} />
        <Link to="/vault" style={{
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


        <span className="section-label" style={{ marginBottom: 20, display: 'block' }}>CREATOR VAULT</span>
        <h1 className="font-bebas" style={{ fontSize: 'clamp(52px, 10vw, 110px)', color: '#ffffff', lineHeight: 1.05, marginBottom: 12 }}>
          SELL, PROFIT, <span className="gold-text">REPEAT.</span>
        </h1>
        <div className="font-bebas" style={{
          fontSize: 'clamp(44px, 8vw, 80px)',
          background: 'linear-gradient(135deg, #D4AF37, #F9E498)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          marginBottom: 20,
        }}>
          ₹699
        </div>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(15px, 2vw, 18px)', color: '#8E8E8E', maxWidth: 520, lineHeight: 1.7, marginBottom: 36 }}>
          1,000+ premium courses, 15,000+ AI templates, and hundreds of ready-to-sell ebooks. Built for creators who want to learn and earn — without showing their face.
        </p>
        <a href={REPLACE_RAZORPAY_CREATOR} className="btn-gold pulse-glow" style={{ fontSize: '1.05rem' }}>
          Buy Creator Vault for ₹699 <ArrowIcon />
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

          {[
            {
              icon: <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><rect x="8" y="6" width="32" height="36" rx="3" stroke="url(#cv1)" strokeWidth="1.5" fill="none" /><line x1="14" y1="16" x2="34" y2="16" stroke="url(#cv1)" strokeWidth="1.5" strokeLinecap="round" /><line x1="14" y1="22" x2="34" y2="22" stroke="url(#cv1)" strokeWidth="1.5" strokeLinecap="round" /><line x1="14" y1="28" x2="26" y2="28" stroke="url(#cv1)" strokeWidth="1.5" strokeLinecap="round" /><defs><linearGradient id="cv1" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse"><stop stopColor="#D4AF37" /><stop offset="1" stopColor="#F9E498" /></linearGradient></defs></svg>,
              title: 'Ebooks Pack + Digital Products Bundle',
              desc: 'Hundreds of ebooks, templates, guides and digital products with full resell rights.',
              perfect: 'Reading, reselling, building offers',
              delay: '0s',
              products: [
                ...VAULT_PRODUCTS.digitalProducts.filter(p => p !== '+ Many More...'),
                ...VAULT_PRODUCTS.ebooks.filter(p => p !== '+ Many More...'),
                '+ Many More...'
              ],
            },
            {
              icon: <div style={{ flexShrink: 0, width: 44, height: 44, borderRadius: 8, background: 'linear-gradient(135deg, #D4AF37, #F9E498)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.4rem', color: '#050505' }}>C</div>,
              title: '1,000+ Premium Courses',
              desc: 'Full courses on business, marketing, AI, coding, investing, dropshipping and more — professionally made, high-value, fully resellable.',
              perfect: 'Learning, reselling at high-ticket, building authority',
              delay: '0.1s',
              products: [...VAULT_PRODUCTS.courses.filter(p => p !== '+ Many More...'), '+ Many More...'],
            },
            {
              icon: <div style={{ flexShrink: 0, width: 44, height: 44, borderRadius: 8, background: 'linear-gradient(135deg, #D4AF37, #F9E498)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.4rem', color: '#050505' }}>AI</div>,
              title: '15,000+ AI Agent Templates',
              desc: 'Ready-made AI automation templates for ChatGPT, Claude, and other AI tools. The hottest category to sell right now.',
              perfect: 'Productivity, freelancing, selling to businesses',
              delay: '0.2s',
              products: [...VAULT_PRODUCTS.aiTemplates.filter(p => p !== '+ Many More...'), '+ Many More...'],
            },
          ].map((item, i) => (
            <div key={i} className={`vault-card fade-up ${contentVisible ? 'visible' : ''}`} style={{ marginBottom: 20, transitionDelay: item.delay }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20, flexWrap: 'wrap' }}>
                <div style={{ flexShrink: 0 }}>{item.icon}</div>
                <div style={{ flex: 1, minWidth: 200 }}>

                  {/* Header Row: Title + Arrow */}
                  <div
                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', cursor: item.products ? 'pointer' : 'default' }}
                    onClick={() => {
                      if (item.products) setExpandedItem(expandedItem === i ? null : i);
                    }}
                  >
                    <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '1.25rem', color: '#F9E498', marginBottom: 12, paddingRight: 20 }}>
                      {item.title}
                    </h3>
                    {item.products && (
                      <button
                        style={{
                          background: 'none', border: 'none', color: '#F9E498',
                          cursor: 'pointer', padding: '4px', marginTop: '-4px'
                        }}
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: expandedItem === i ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}>
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      </button>
                    )}
                  </div>

                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.92rem', color: '#8E8E8E', lineHeight: 1.7, marginBottom: 16 }}>{item.desc}</p>

                  <div style={{ display: 'inline-flex', alignItems: 'center', background: 'rgba(212,175,55,0.04)', border: '1px solid rgba(212,175,55,0.15)', borderRadius: 4, padding: '8px 14px' }}>
                    <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.72rem', color: '#D4AF37', letterSpacing: '0.08em' }}>PERFECT FOR: {item.perfect}</span>
                  </div>

                  {/* Expandable Product List */}
                  {item.products && (
                    <div style={{
                      display: 'grid',
                      gridTemplateRows: expandedItem === i ? '1fr' : '0fr',
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      opacity: expandedItem === i ? 1 : 0,
                      marginTop: expandedItem === i ? 24 : 0
                    }}>
                      <div style={{ overflow: 'hidden' }}>
                        <div style={{ paddingTop: 8 }}>
                          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.95rem', color: '#E0E0E0', marginBottom: 16 }}>Detailed Contents:</p>
                          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                            {item.products.map((prod, idx) => (
                              <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="#D4AF37" style={{ marginTop: 4, flexShrink: 0 }}>
                                  <path d="M12 2L15 9l7 3-7 3-3 7-3-7-7-3 7-3z" />
                                </svg>
                                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', color: '#E0E0E0', lineHeight: 1.4 }}>{prod}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}

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
            <span className="section-label" style={{ marginBottom: 16, display: 'block' }}>CREATOR VS FULL</span>
            <h2 className="font-bebas" style={{ fontSize: 'clamp(32px, 5vw, 56px)', color: '#ffffff' }}>
              See The <span className="gold-text">Difference</span>
            </h2>
          </div>
          <div className={`fade-up ${compareVisible ? 'visible' : ''}`} style={{ background: '#0D0D0D', border: '1px solid rgba(212,175,55,0.12)', borderRadius: 8, overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', background: '#111111', borderBottom: '1px solid rgba(212,175,55,0.1)' }} className="text-xs sm:text-sm p-3 sm:p-5">
              <span style={{ fontFamily: 'Poppins, sans-serif', color: '#8E8E8E' }}>Feature</span>
              <span style={{ fontFamily: 'Poppins, sans-serif', color: '#8E8E8E', textAlign: 'center' }}>Creator ₹699</span>
              <span style={{ fontFamily: 'Poppins, sans-serif', color: '#D4AF37', textAlign: 'center', fontWeight: 600 }}>Full ₹999 ✦</span>
            </div>
            {COMPARISON.map((row, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', borderBottom: i < COMPARISON.length - 1 ? '1px solid rgba(212,175,55,0.06)' : 'none', alignItems: 'center' }} className="text-xs sm:text-sm p-3 sm:p-5">
                <span style={{ fontFamily: 'Inter, sans-serif', color: '#F9E498' }}>{row.feature}</span>
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
              The Creator Vault Is <span className="gold-text">Built For You If...</span>
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {PERSONAS.map((p, i) => (
              <div key={i} className={`fade-up ${personaVisible ? 'visible' : ''}`} style={{ transitionDelay: `${i * 0.08}s`, display: 'flex', alignItems: 'center', gap: 14, background: '#111111', border: '1px solid rgba(212,175,55,0.08)', borderRadius: 8, padding: '16px 20px' }}>
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" style={{ flexShrink: 0 }}>
                  <circle cx="11" cy="11" r="10" stroke="#D4AF37" strokeWidth="1" fill="rgba(212,175,55,0.06)" />
                  <path d="M6.5 11L9.5 14L15.5 8" stroke="#D4AF37" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
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
          TAKE ACTION TODAY.<br /> <span className="gold-text">SEE RESULTS TOMORROW.</span>
        </h2>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(15px, 2vw, 17px)', color: '#8E8E8E', marginBottom: 36 }}>
          One-time payment. Instant access. Yours forever.
        </p>
        <a href={REPLACE_RAZORPAY_CREATOR} className="btn-gold pulse-glow" style={{ fontSize: '1.05rem' }}>
          Get Creator Vault for ₹699 <ArrowIcon />
        </a>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.78rem', color: 'rgba(255, 255, 255, 0.5)', marginTop: 16, letterSpacing: '0.05em' }}>
          🔒 Secure payment via Razorpay | Instant delivery
        </p>
        <div style={{ marginTop: 28 }}>
          <Link to="/full-vault" style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.85rem', color: '#D4AF37', textDecoration: 'none', borderBottom: '1px solid rgba(212,175,55,0.3)', paddingBottom: 2 }}>
            Want everything? See Full Vault <ArrowIcon size={14} />
          </Link>
        </div>
      </section>

      <Footer instagramLink={REPLACE_INSTAGRAM} />
    </div>
  );
}