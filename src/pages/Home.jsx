import React, { useEffect, useRef, useState } from 'react';
import Navbar from '@/components/lux/Navbar';
import Footer from '@/components/lux/Footer';
import Particles from '@/components/lux/Particles';
import GoldDivider from '@/components/lux/GoldDivider';
import FaqAccordion from '@/components/lux/FaqAccordion';
import VaultCards from '@/components/lux/VaultCards';
import useFadeUp from '@/hooks/useFadeUp';

// ── PLACEHOLDER LINKS — ctrl+F to replace ──
const REPLACE_RAZORPAY_STARTER = '#REPLACE_RAZORPAY_STARTER';
const REPLACE_RAZORPAY_CREATOR = '#REPLACE_RAZORPAY_CREATOR';
const REPLACE_RAZORPAY_FULL = '#REPLACE_RAZORPAY_FULL';
const REPLACE_INSTAGRAM = '#REPLACE_INSTAGRAM';

const PAIN_POINTS = [
  { text: 'You see others earning online — <strong style="color:#ffffff">except you</strong>' },
  { text: 'You don\'t want to <strong style="color:#ffffff">show your face</strong> & work <strong style="color:#ffffff">24/7</strong> creating content' },
  { text: 'You don\'t have <strong style="color:#ffffff">ad budget. Followers. A clue where to start.</strong>' },
  { text: 'Bought 10 courses. Still made <strong style="color:#ffffff">₹0.</strong> Still searching YouTube for "how to make money online".' },
  { text: 'You just want <strong style="color:#ffffff">one system</strong> that actually works — without the guru nonsense.' },
];

const STATS = [
  { number: '1M+', label: 'Products in Vault' },
  { number: '6K+', label: 'Instagram Followers' },
  { number: '5', label: 'Product Categories' },
  { number: '100%', label: 'Instant Digital Delivery' },
];

const TESTIMONIALS = [
  {
    name: 'Rohit S.',
    location: 'Mumbai',
    result: 'Made ₹12,000 in my first week just reselling the reels pack.',
    stars: 5,
  },
  {
    name: 'Priya M.',
    location: 'Delhi',
    result: 'The AI templates alone are worth 10x the price. Insane value.',
    stars: 5,
  },
  {
    name: 'Aakash T.',
    location: 'Hyderabad',
    result: 'I was stuck for 6 months. This vault gave me a direction in 6 hours.',
    stars: 5,
  },
];

const FAQ_ITEMS = [
  {
    q: 'What exactly do I get after payment?',
    a: 'Instant access to your vault tier — all digital files, templates, reels, and tools — delivered via Google Drive link on the Thank You page immediately after payment.',
  },
  {
    q: 'How is delivery done?',
    a: 'Fully automated. After payment, you\'re redirected to a page with your Google Drive access link. No waiting. No manual steps.',
  },
  {
    q: 'Do I need any experience?',
    a: 'Zero. The vault is built for complete beginners. Step-by-step guides are included. If you can tap a button, you can start.',
  },
  {
    q: 'Can I resell these products?',
    a: 'Yes — most products come with resell rights. The Launchpad teaches you exactly how to do it profitably.',
  },
  {
    q: 'What if I need help?',
    a: 'Reach us on Instagram any time. We respond fast. You\'re not alone in this.',
  },
];

function HeroParticles() {
  const particles = [
    { style: { top: '18%', left: '12%', width: 6, height: 6, animation: 'float1 6s ease-in-out infinite' } },
    { style: { top: '35%', right: '15%', width: 4, height: 4, animation: 'float2 8s ease-in-out infinite 1s' } },
    { style: { top: '65%', left: '25%', width: 5, height: 5, animation: 'float3 7s ease-in-out infinite 0.5s' } },
    { style: { top: '25%', right: '30%', width: 3, height: 3, animation: 'float4 9s ease-in-out infinite 2s' } },
    { style: { top: '75%', right: '20%', width: 6, height: 6, animation: 'float5 5.5s ease-in-out infinite 1.5s' } },
    { style: { top: '50%', left: '8%', width: 4, height: 4, animation: 'float6 7.5s ease-in-out infinite 0.8s' } },
  ];
  return (
    <>
      {particles.map((p, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            borderRadius: '50%',
            background: 'radial-gradient(circle, #F9E498, #D4AF37)',
            boxShadow: '0 0 12px rgba(212,175,55,0.8)',
            pointerEvents: 'none',
            ...p.style,
          }}
        />
      ))}
    </>
  );
}

export default function Home() {
  const { ref: painRef, visible: painVisible } = useFadeUp();
  const { ref: statsRef, visible: statsVisible } = useFadeUp();
  const { ref: testimonialsRef, visible: testimonialsVisible } = useFadeUp();
  const { ref: faqRef, visible: faqVisible } = useFadeUp();
  const { ref: ctaRef, visible: ctaVisible } = useFadeUp();

  return (
    <div style={{ background: '#050505', minHeight: '100vh', overflowX: 'hidden' }}>
      <Navbar />

      {/* ── HERO SECTION ── */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: 'radial-gradient(ellipse at center, #1a1400 0%, #0a0800 40%, #050505 100%)',
        padding: '120px 20px 80px',
        textAlign: 'center',
      }}>
        <HeroParticles />

        {/* Vault line */}
        <div style={{
          position: 'absolute', top: 0, bottom: 0, left: '50%',
          width: 1,
          background: 'linear-gradient(to bottom, transparent, rgba(212,175,55,0.15), transparent)',
          pointerEvents: 'none',
        }} />

        {/* Label */}
        <div style={{ position: 'relative', zIndex: 2, marginBottom: 28 }}>
          <span className="section-label" style={{
            background: 'rgba(212,175,55,0.08)',
            border: '1px solid rgba(212,175,55,0.3)',
            padding: '6px 16px',
            borderRadius: 3,
          }}>
            1M+ DIGITAL PRODUCTS INSIDE
          </span>
        </div>

        {/* Headline */}
        <div style={{ position: 'relative', zIndex: 2, marginBottom: 24 }}>
          <h1 className="font-bebas" style={{
            fontSize: 'clamp(52px, 10vw, 120px)',
            lineHeight: 1.05,
            letterSpacing: '0.02em',
            marginBottom: 8,
          }}>
            <span className="gold-text hero-word" style={{ animationDelay: '0.1s', display: 'block' }}>STOP SCROLLING.</span>
            <span className="hero-word" style={{
              animationDelay: '0.3s',
              display: 'block',
              color: '#ffffff',
            }}>START EARNING.</span>
          </h1>
        </div>

        {/* Subtext */}
        <p className="hero-word" style={{
          animationDelay: '0.6s',
          fontFamily: 'Inter, sans-serif',
          fontSize: 'clamp(16px, 2.5vw, 20px)',
          color: '#8E8E8E',
          maxWidth: 560,
          lineHeight: 1.7,
          marginBottom: 44,
          position: 'relative',
          zIndex: 2,
        }}>
          <strong style={{ color: '#F9E498' }}>6,000+ people follow this page.</strong>{' '}
          Most of them are still waiting for the right moment.{' '}
          <em>The vault is open.</em> Are you getting in or not?
        </p>

        {/* CTAs */}
        <div style={{
          display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center',
          position: 'relative', zIndex: 2, marginBottom: 64,
        }}>
          <a href={REPLACE_RAZORPAY_CREATOR} className="btn-gold pulse-glow"
            style={{ fontSize: 'clamp(0.85rem, 2vw, 1rem)' }}>
            Get The Vault →
          </a>
          <a href="#vault" className="btn-outline">
            See What's Inside
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="scroll-bounce" style={{
          position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)',
          zIndex: 2,
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 5v14M5 12l7 7 7-7" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </section>

      <div className="gold-divider" />

      {/* ── PAIN SECTION — "Tell me I'm wrong" style ── */}
      <section style={{
        padding: 'clamp(60px, 10vw, 120px) 20px',
        background: '#050505',
        position: 'relative',
      }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>

          {/* Top context block */}
          <div ref={painRef} style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 className="font-bebas" style={{
              fontSize: 'clamp(36px, 6vw, 72px)',
              color: '#ffffff',
              lineHeight: 1.05,
              marginBottom: 20,
            }}>
              99% of people earning on Instagram are selling{' '}
              <span className="gold-text">digital products.</span>
            </h2>
            <div style={{
              background: 'rgba(212,175,55,0.05)',
              border: '1px solid rgba(212,175,55,0.15)',
              borderRadius: 8,
              padding: '18px 28px',
              marginBottom: 28,
            }}>
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 'clamp(14px, 1.8vw, 16px)',
                color: '#8E8E8E',
                lineHeight: 1.7,
              }}>
                People like you have generated <strong style={{ color: '#F9E498' }}>100M+ views</strong> in the past 30 days — and{' '}
                <strong style={{ color: '#F9E498' }}>thousands in sales</strong> using these exact products.
              </p>
            </div>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 'clamp(14px, 1.8vw, 16px)',
              color: '#8E8E8E',
              lineHeight: 1.8,
              marginBottom: 12,
            }}>
              You've only got two options: keep buying their stuff — stay broke. Or flip the table. <strong style={{ color: '#F9E498' }}>Start selling yourself.</strong>
            </p>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 'clamp(14px, 1.8vw, 16px)',
              color: '#8E8E8E',
              lineHeight: 1.8,
            }}>
              People are pulling millions from this <strong style={{ color: '#F9E498' }}>₹500B+ market.</strong> And you think you're so stuck you can't pull an extra <strong style={{ color: '#F9E498' }}>₹50K/month?</strong>
            </p>
          </div>

          {/* "Tell me I'm wrong" headline */}
          <h3 className="font-bebas" style={{
            fontSize: 'clamp(40px, 7vw, 80px)',
            color: '#ffffff',
            textAlign: 'center',
            marginBottom: 32,
            lineHeight: 1.05,
          }}>
            Tell me I'm <span className="gold-text">wrong.</span>
          </h3>

          {/* Pain point rows */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {PAIN_POINTS.map((pain, i) => (
              <div
                key={i}
                className={`fade-up ${painVisible ? 'visible' : ''}`}
                style={{
                  transitionDelay: `${i * 0.1}s`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  background: '#0D0D0D',
                  border: '1px solid rgba(212,175,55,0.1)',
                  borderRadius: 8,
                  padding: '18px 24px',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(212,175,55,0.3)';
                  e.currentTarget.style.background = '#111111';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(212,175,55,0.1)';
                  e.currentTarget.style.background = '#0D0D0D';
                }}
              >
                {/* Red X icon */}
                <div style={{
                  flexShrink: 0,
                  width: 32, height: 32,
                  borderRadius: 6,
                  background: 'rgba(220,38,38,0.12)',
                  border: '1px solid rgba(220,38,38,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M3 3l8 8M11 3l-8 8" stroke="#ef4444" strokeWidth="1.8" strokeLinecap="round"/>
                  </svg>
                </div>
                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 'clamp(14px, 1.8vw, 16px)',
                  color: '#F9E498',
                  lineHeight: 1.5,
                }}
                  dangerouslySetInnerHTML={{ __html: pain.text }}
                />
              </div>
            ))}
          </div>

          {/* Resolution line */}
          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <h3 className="font-bebas" style={{
              fontSize: 'clamp(28px, 4vw, 52px)',
              color: '#ffffff',
              lineHeight: 1.1,
            }}>
              Let <span className="gold-text">theluxverse</span> fix it.
            </h3>
          </div>

        </div>
      </section>

      <div className="gold-divider" />

      {/* ── VAULT / BUNDLES SECTION ── */}
      <section id="vault" style={{
        padding: 'clamp(60px, 10vw, 120px) 20px',
        background: 'radial-gradient(ellipse at center top, #100d00 0%, #050505 60%)',
        position: 'relative',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <span className="section-label" style={{ marginBottom: 16, display: 'block' }}>THE VAULT</span>
            <h2 className="font-bebas" style={{
              fontSize: 'clamp(36px, 6vw, 72px)',
              color: '#ffffff',
              lineHeight: 1.05,
            }}>
              Pick Your <span className="gold-text">Power Level</span>
            </h2>
          </div>
          <VaultCards
            razorpayStarter={REPLACE_RAZORPAY_STARTER}
            razorpayCreator={REPLACE_RAZORPAY_CREATOR}
            razorpayFull={REPLACE_RAZORPAY_FULL}
          />
        </div>
      </section>

      <div className="gold-divider" />

      {/* ── LAUNCHPAD TEASER SECTION ── */}
      <section style={{
        padding: 'clamp(60px, 10vw, 120px) 20px',
        background: '#111111',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Subtle bg accent */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 600, height: 400, background: 'radial-gradient(ellipse, rgba(212,175,55,0.04), transparent)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <span className="section-label" style={{ marginBottom: 16, display: 'block' }}>WANT TO SELL THESE YOURSELF?</span>
            <h2 className="font-bebas" style={{ fontSize: 'clamp(36px, 6vw, 72px)', color: '#ffffff', lineHeight: 1.05, marginBottom: 20 }}>
              THE LAUNCHPAD —{' '}
              <span className="gold-text">YOUR RESELL SYSTEM</span>
            </h2>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(15px, 2vw, 18px)', color: '#8E8E8E', maxWidth: 620, margin: '0 auto', lineHeight: 1.7 }}>
              You just bought the products. Now flip them.{' '}
              <strong style={{ color: '#F9E498' }}>Others are making ₹50K/month</strong> reselling the same vault you just accessed. Here's the exact 3-step system:
            </p>
          </div>

          {/* 3 Steps */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20, marginBottom: 48 }}>
            {[
              { num: '01', title: 'Pick a Product', desc: 'Choose from your vault, set your price. No creation needed — everything is ready to sell.' },
              { num: '02', title: 'Share Your Link', desc: 'One link page. One link. Done in under 10 minutes. We show you exactly how.' },
              { num: '03', title: 'Earn Per Sale', desc: '100% profit, straight to your UPI or Razorpay account. Repeat for every sale.' },
            ].map((step, i) => (
              <div key={i} style={{
                background: '#0D0D0D', border: '1px solid rgba(212,175,55,0.1)',
                borderRadius: 8, padding: '28px 24px',
                transition: 'all 0.3s ease',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(212,175,55,0.3)'; e.currentTarget.style.background = '#161616'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(212,175,55,0.1)'; e.currentTarget.style.background = '#0D0D0D'; }}
              >
                <div className="font-bebas" style={{ fontSize: '3rem', color: '#D4AF37', lineHeight: 1, marginBottom: 12 }}>{step.num}</div>
                <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '1.05rem', color: '#ffffff', marginBottom: 10 }}>{step.title}</h3>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.88rem', color: '#8E8E8E', lineHeight: 1.6 }}>{step.desc}</p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <a href="/launchpad" className="btn-gold" style={{ fontSize: '1rem' }}>
              Start Selling Today →
            </a>
          </div>
        </div>
      </section>

      <div className="gold-divider" />

      {/* ── SOCIAL PROOF SECTION ── */}
      <section style={{
        padding: 'clamp(60px, 10vw, 120px) 20px',
        background: '#050505',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          {/* Stats */}
          <div
            ref={statsRef}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
              gap: 40,
              textAlign: 'center',
              marginBottom: 80,
            }}
          >
            {STATS.map((s, i) => (
              <div
                key={i}
                className={`fade-up ${statsVisible ? 'visible' : ''}`}
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className="stat-number">{s.number}</div>
                <div style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '0.75rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: '#8E8E8E',
                  marginTop: 8,
                }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* Testimonials */}
          <div
            ref={testimonialsRef}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 24,
            }}
          >
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className={`testimonial-card fade-up ${testimonialsVisible ? 'visible' : ''}`}
                style={{ transitionDelay: `${i * 0.12}s` }}
              >
                <div style={{ display: 'flex', gap: 4, marginBottom: 16 }}>
                  {[...Array(t.stars)].map((_, si) => (
                    <svg key={si} width="14" height="14" viewBox="0 0 14 14" fill="#D4AF37">
                      <path d="M7 1l1.8 3.6L13 5.3l-3 2.9.7 4.1L7 10.2l-3.7 2.1.7-4.1-3-2.9 4.2-.7z"/>
                    </svg>
                  ))}
                </div>
                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.95rem',
                  color: '#F9E498',
                  lineHeight: 1.6,
                  marginBottom: 20,
                }}>
                  "{t.result}"
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: '50%',
                    background: 'linear-gradient(135deg, #D4AF37, #F9E498)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'Bebas Neue, sans-serif',
                    fontSize: '1.1rem',
                    color: '#050505',
                  }}>
                    {t.name[0]}
                  </div>
                  <div>
                    <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.85rem', fontWeight: 600, color: '#ffffff' }}>{t.name}</div>
                    <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', color: '#8E8E8E' }}>{t.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="gold-divider" />

      {/* ── FAQ SECTION ── */}
      <section style={{
        padding: 'clamp(60px, 10vw, 120px) 20px',
        background: '#050505',
      }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div
            ref={faqRef}
            className={`fade-up ${faqVisible ? 'visible' : ''}`}
            style={{ textAlign: 'center', marginBottom: 56 }}
          >
            <span className="section-label" style={{ marginBottom: 16, display: 'block' }}>GOT QUESTIONS?</span>
            <h2 className="font-bebas" style={{
              fontSize: 'clamp(36px, 5vw, 60px)',
              color: '#ffffff',
            }}>
              We've Got <span className="gold-text">Answers</span>
            </h2>
          </div>
          <FaqAccordion items={FAQ_ITEMS} />
        </div>
      </section>

      <div className="gold-divider" />

      {/* ── FINAL CTA SECTION ── */}
      <section style={{
        padding: 'clamp(80px, 12vw, 160px) 20px',
        background: 'radial-gradient(ellipse at center, #1a1400 0%, #050505 80%)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <HeroParticles />
        <div
          ref={ctaRef}
          className={`fade-up ${ctaVisible ? 'visible' : ''}`}
          style={{ position: 'relative', zIndex: 2 }}
        >
          <h2 className="font-bebas" style={{
            fontSize: 'clamp(44px, 8vw, 100px)',
            color: '#ffffff',
            lineHeight: 1.05,
            marginBottom: 24,
          }}>
            THE VAULT WON'T{' '}
            <span className="gold-text">WAIT FOREVER.</span>
          </h2>
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 'clamp(16px, 2vw, 20px)',
            color: '#8E8E8E',
            maxWidth: 500,
            margin: '0 auto 44px',
            lineHeight: 1.7,
          }}>
            Every day you wait is a day someone else is building their income with exactly what's inside.
          </p>
          <a href={REPLACE_RAZORPAY_CREATOR} className="btn-gold pulse-glow" style={{ fontSize: '1.05rem' }}>
            Get The Vault Now →
          </a>
        </div>
      </section>

      <Footer instagramLink={REPLACE_INSTAGRAM} />
    </div>
  );
}