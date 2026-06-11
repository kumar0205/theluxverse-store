import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/lux/Navbar';
import Footer from '@/components/lux/Footer';
import ScrollReveal from '@/components/lux/ScrollReveal';
import FaqAccordion from '@/components/lux/FaqAccordion';
import ArrowIcon from '@/components/lux/ArrowIcon';
import Particles from '@/components/lux/Particles';
import {
  BEGINNER_FAQ_ITEMS,
  PRODUCT_COMPARISON,
  WHY_DIGITAL_WINS,
  TOP_DIGITAL_PRODUCTS,
  REAL_EXAMPLES,
} from '@/data/digitalProduct';

export default function WhatIsDigitalProduct() {
  // Set page meta description and title for SEO
  useEffect(() => {
    document.title = "What is a Digital Product? Complete Beginner Guide (2026)";
    
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', 'What is a digital product? Complete beginner guide for Indians in 2026 — what to sell, how to start, real examples, and how to earn money online without showing your face.');
  }, []);

  return (
    <div style={{ background: '#050505', minHeight: '100vh', color: '#ffffff', fontFamily: 'Inter, sans-serif' }}>
      <Navbar />

      {/* SECTION 1 — HERO */}
      <section style={{
        minHeight: '100vh',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '120px 20px 80px', textAlign: 'center',
        background: 'radial-gradient(ellipse at center, #1a1400 0%, #050505 80%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <Particles count={8} />
        <ScrollReveal>
          <span className="section-label" style={{ marginBottom: 20, display: 'block' }}>YOU MIGHT BE WONDERING</span>
          <h1 className="font-bebas" style={{ fontSize: 'clamp(48px, 9vw, 110px)', lineHeight: 1.05, marginBottom: 24 }}>
            WHAT EXACTLY IS A<br/>
            <span className="gold-text">DIGITAL PRODUCT?</span><br/>
            AND WHY ARE PEOPLE<br/>
            GETTING RICH FROM IT?
          </h1>
          <p style={{ fontSize: 'clamp(16px, 2vw, 20px)', color: '#a0a0a0', maxWidth: 700, margin: '0 auto', lineHeight: 1.6 }}>
            If you've never heard of digital products before —<br/>
            this page will change how you think about money forever.<br/>
            <span style={{ color: '#c9a84c', fontWeight: 'bold' }}>Read every word. It takes 3 minutes.</span>
          </p>
          <div className="scroll-bounce" style={{ marginTop: 60, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path d="M12 5v14M5 12l7 7 7-7" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </ScrollReveal>
      </section>

      <div className="gold-divider" />

      {/* SECTION 2 — SIMPLE EXPLANATION */}
      <section style={{ padding: '100px 20px', background: '#0a0a0a' }}>
        <ScrollReveal style={{ maxWidth: 800, margin: '0 auto' }}>
          <span className="section-label" style={{ marginBottom: 16, display: 'block', textAlign: 'center' }}>THE SIMPLEST EXPLANATION</span>
          <h2 className="font-bebas" style={{ fontSize: 'clamp(36px, 6vw, 64px)', textAlign: 'center', marginBottom: 40, lineHeight: 1.1 }}>
            A DIGITAL PRODUCT IS ANYTHING YOU SELL ONLINE <span className="gold-text">THAT PEOPLE DOWNLOAD.</span>
          </h2>
          
          <div style={{ fontSize: '18px', color: '#E0E0E0', lineHeight: 1.8, marginBottom: 60 }}>
            <p style={{ marginBottom: 24 }}>Think about it like this:</p>
            <p style={{ marginBottom: 24, paddingLeft: 20, borderLeft: '3px solid #333' }}>
              You go to a shop. You buy a book.<br/>
              The owner had to print it, store it, pack it, ship it.<br/>
              Costs money. Takes time.
            </p>
            <p style={{ marginBottom: 24, paddingLeft: 20, borderLeft: '3px solid #D4AF37' }}>
              Now imagine selling that same book online as a PDF.<br/>
              Someone pays you. They download it instantly.<br/>
              No printing. No shipping. No storage. No staff. No shop rent.
            </p>
            <p style={{ fontWeight: 'bold', color: '#c9a84c', fontSize: '22px' }}>
              100% of the money goes straight to YOUR account.
            </p>
            <p style={{ marginTop: 12 }}>That's a digital product.</p>
          </div>

          <div style={{ background: '#111', borderRadius: 12, border: '1px solid rgba(201,168,76,0.2)', overflow: 'hidden', marginBottom: 60 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', background: '#1a1a1a', padding: '16px 20px', borderBottom: '1px solid #333' }}>
              <div style={{ fontWeight: 'bold', color: '#888' }}>❌ Physical Product</div>
              <div style={{ fontWeight: 'bold', color: '#D4AF37' }}>✅ Digital Product</div>
            </div>
            {PRODUCT_COMPARISON.map(([left, right], i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', padding: '16px 20px', borderBottom: i < PRODUCT_COMPARISON.length - 1 ? '1px solid #222' : 'none' }}>
                <div style={{ color: '#888' }}>{left}</div>
                <div style={{ color: '#ffffff', fontWeight: '500' }}>{right}</div>
              </div>
            ))}
          </div>

          {/* ── SECTION A — WHY 2026 IS THE BEST YEAR TO START ── */}
          <div style={{
            background: 'rgba(201,168,76,0.06)',
            border: '1px solid rgba(201,168,76,0.3)',
            borderRadius: '14px',
            padding: '40px 32px',
            textAlign: 'center',
            marginTop: '60px'
          }}>
            <h3 className="font-bebas" style={{ fontSize: 'clamp(28px, 5vw, 44px)', color: '#ffffff', marginBottom: '16px' }}>
              WHY 2026 IS THE BEST YEAR TO START
            </h3>
            <div style={{ height: '2px', width: '60px', background: '#D4AF37', margin: '0 auto 24px' }} />
            <p style={{
              color: '#ffffff',
              fontSize: '16px',
              lineHeight: 1.8,
              margin: 0
            }}>
              In 2019, you needed a YouTube channel with 100K subscribers to make money online.<br />
              In 2026, you need an Instagram account and one digital product.<br /><br />
              The barrier to entry has never been lower. Anyone with a phone can start today.
            </p>
          </div>

        </ScrollReveal>
      </section>

      <div className="gold-divider" />

      {/* SECTION 3 — WHY DIGITAL PRODUCTS WIN */}
      <section style={{ padding: '100px 20px', background: '#050505' }}>
        <ScrollReveal style={{ maxWidth: 800, margin: '0 auto' }}>
          <span className="section-label" style={{ marginBottom: 16, display: 'block', textAlign: 'center' }}>WHY SMART PEOPLE CHOOSE THIS</span>
          <h2 className="font-bebas" style={{ fontSize: 'clamp(36px, 6vw, 64px)', textAlign: 'center', marginBottom: 60 }}>
            7 REASONS DIGITAL PRODUCTS <span className="gold-text">BEAT EVERYTHING ELSE</span>
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {WHY_DIGITAL_WINS.map((item, i) => (
              <div key={i} style={{
                background: '#111',
                border: '1px solid rgba(201,168,76,0.2)',
                borderRadius: '12px',
                padding: '24px',
                display: 'flex',
                gap: '20px',
                alignItems: 'flex-start'
              }}>
                <div style={{ flexShrink: 0, width: 48, height: 48, background: 'rgba(212,175,55,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>
                  {item.icon}
                </div>
                <div>
                  <h3 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '18px', fontWeight: 'bold', color: '#ffffff', marginBottom: 8 }}>
                    {i + 1}. {item.title}
                  </h3>
                  <p style={{ color: '#a0a0a0', lineHeight: 1.6, fontSize: '15px' }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      <div className="gold-divider" />

      {/* SECTION 4 — TOP 10 DIGITAL PRODUCTS */}
      <section style={{ padding: '100px 20px', background: '#0a0a0a' }}>
        <ScrollReveal style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <span className="section-label">WHAT'S ACTUALLY SELLING RIGHT NOW</span>
            <h2 className="font-bebas" style={{ fontSize: 'clamp(36px, 6vw, 64px)', color: '#ffffff' }}>
              TOP 10 DIGITAL PRODUCTS <span className="gold-text">PEOPLE ARE BUYING DAILY</span>
            </h2>
            <p style={{ color: '#a0a0a0', fontSize: '16px', marginTop: 12 }}>
              All of these are inside theluxverse vault. Ready to sell. No creation needed.
            </p>
          </div>

          <div style={{ display: 'grid', gap: 24 }}>
            {TOP_DIGITAL_PRODUCTS.map((prod, i) => (
              <div key={i} className="vault-card flex flex-col sm:flex-row sm:gap-6 gap-4" style={{ alignItems: 'flex-start' }}>
                <div className="font-bebas" style={{ fontSize: '64px', color: '#D4AF37', lineHeight: 0.8, width: 60 }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifycontent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
                    <h3 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '20px', fontWeight: 'bold', color: '#ffffff', marginBottom: 12 }}>
                      {prod.title}
                    </h3>
                    <div style={{ 
                      background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.3)', 
                      padding: '4px 10px', borderRadius: 4, color: '#D4AF37', fontSize: '12px', fontWeight: 'bold' 
                    }}>
                      ✓ INSIDE YOUR VAULT
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: '15px' }}>
                    <div><span style={{ color: '#E0E0E0', fontWeight: '600' }}>What it is:</span> <span style={{ color: '#a0a0a0' }}>{prod.what}</span></div>
                    <div><span style={{ color: '#E0E0E0', fontWeight: '600' }}>Why it sells:</span> <span style={{ color: '#a0a0a0' }}>{prod.why}</span></div>
                    <div><span style={{ color: '#E0E0E0', fontWeight: '600' }}>Income potential:</span> <span style={{ color: '#4caf50', fontWeight: 'bold' }}>{prod.potential}</span></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      <div className="gold-divider" />

      {/* ── SECTION B — REAL EXAMPLES OF WHAT PEOPLE SELL ── */}
      <section style={{ padding: '100px 20px', background: '#050505' }}>
        <ScrollReveal style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span className="section-label">REAL WORLD DATA</span>
            <h2 className="font-bebas" style={{ fontSize: 'clamp(36px, 6vw, 64px)', color: '#ffffff', marginTop: 12 }}>
              REAL EXAMPLES OF <span className="gold-text">WHAT PEOPLE SELL</span>
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '20px'
          }}>
            {REAL_EXAMPLES.map((ex, idx) => {
              const isEasy = ex.diff === 'Easy';
              return (
                <div key={idx} style={{
                  background: '#111',
                  border: '1px solid rgba(201,168,76,0.2)',
                  borderRadius: '12px',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '180px'
                }}>
                  <div>
                    <h3 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '16px', fontWeight: 'bold', color: '#ffffff', marginBottom: '12px' }}>
                      {ex.name}
                    </h3>
                    <p style={{ fontSize: '14px', color: '#8E8E8E', margin: '0 0 6px' }}>
                      <strong>Price Range:</strong> <span style={{ color: '#D4AF37', fontWeight: 'bold' }}>{ex.price}</span>
                    </p>
                    <p style={{ fontSize: '14px', color: '#8E8E8E', margin: 0 }}>
                      <strong>Who buys:</strong> {ex.who}
                    </p>
                  </div>
                  <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-start' }}>
                    <span style={{
                      background: isEasy ? 'rgba(76,175,80,0.15)' : 'rgba(201,168,76,0.15)',
                      color: isEasy ? '#4caf50' : '#c9a84c',
                      fontSize: '11px',
                      fontWeight: 'bold',
                      padding: '4px 10px',
                      borderRadius: '4px',
                      textTransform: 'uppercase'
                    }}>
                      Difficulty: {ex.diff}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollReveal>
      </section>

      <div className="gold-divider" />

      {/* SECTION 5 — THE MATH */}
      <section style={{ padding: '100px 20px', background: '#050505' }}>
        <ScrollReveal style={{ maxWidth: 700, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <span className="section-label">LET THE NUMBERS TALK</span>
            <h2 className="font-bebas" style={{ fontSize: 'clamp(36px, 6vw, 64px)', color: '#ffffff' }}>
              IF YOU SELL JUST <span className="gold-text">1 PRODUCT PER DAY</span>
            </h2>
          </div>

          <div style={{
            background: 'rgba(201,168,76,0.06)',
            border: '1px solid rgba(201,168,76,0.3)',
            borderRadius: '16px',
            padding: '40px 32px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '20px', color: '#E0E0E0', marginBottom: 20, fontFamily: 'monospace' }}>
              1 ebook sale per day × ₹299
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center', fontFamily: 'monospace', fontSize: '24px', color: '#F9E498' }}>
              <div>= ₹299/day</div>
              <div>= ₹8,970/month</div>
            </div>
            
            <div style={{ marginTop: 24, paddingTop: 24, borderTop: '1px dashed rgba(212,175,55,0.3)' }}>
              <div style={{ color: '#a0a0a0', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>Equals</div>
              <div className="font-bebas" style={{ fontSize: '64px', color: '#D4AF37', lineHeight: 1 }}>
                = ₹1,07,640/year
              </div>
            </div>

            <p style={{ color: '#a0a0a0', fontSize: '16px', marginTop: 32, lineHeight: 1.6 }}>
              From ONE product. One sale a day.<br/>
              Not 100 sales. Just ONE.
            </p>

            <div style={{ marginTop: 40, padding: '32px', background: '#0a0a0a', borderRadius: 12, border: '1px solid #222' }}>
              <p style={{ color: '#E0E0E0', fontSize: '18px', marginBottom: 16 }}>
                Now imagine selling 5 different products.<br/>
                Or getting 5 sales a day instead of 1.
              </p>
              <div style={{ color: '#888', fontFamily: 'monospace', fontSize: '18px', marginBottom: 12 }}>
                ₹299 × 5 sales × 30 days
              </div>
              <div className="font-bebas gold-text" style={{ fontSize: '48px' }}>
                = ₹44,850/month
              </div>
            </div>

            <p style={{ color: '#D4AF37', fontSize: '16px', fontWeight: 'bold', marginTop: 32 }}>
              This is exactly what the people inside theluxverse system are doing.
            </p>
          </div>
        </ScrollReveal>
      </section>

      <div className="gold-divider" />

      {/* SECTION 6 — THE CATCH */}
      <section style={{ padding: '100px 20px', background: '#0a0a0a' }}>
        <ScrollReveal style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <span className="section-label" style={{ marginBottom: 16, display: 'block' }}>BUT WAIT — YOU'RE THINKING</span>
          <h2 className="font-bebas" style={{ fontSize: 'clamp(36px, 6vw, 64px)', color: '#ffffff', marginBottom: 40 }}>
            "HOW DO I CREATE ALL THESE PRODUCTS?"
          </h2>
          
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#F9E498', marginBottom: 40 }}>
            You don't.
          </div>
          
          <div style={{ fontSize: '18px', color: '#a0a0a0', lineHeight: 1.8, marginBottom: 40 }}>
            <p style={{ marginBottom: 24 }}>
              Creating a digital product takes weeks.<br/>
              You need design skills, writing skills,<br/>
              recording equipment, editing software.
            </p>
            <p style={{ color: '#ffffff', fontWeight: 'bold', fontSize: '20px', marginBottom: 24 }}>
              That's why theluxverse exists.
            </p>
            <p style={{ marginBottom: 24 }}>
              We give you <span style={{ color: '#D4AF37' }}>1 MILLION+ ready-made digital products.</span><br/>
              Already created. Already designed. Already ready.
            </p>
            <p style={{ color: '#E0E0E0', fontSize: '20px', marginBottom: 24 }}>
              You just sell them and keep 100% of the money.
            </p>
            <p>
              No creation. No skills. No investment.<br/>
              Just sell what's already done.
            </p>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, rgba(212,175,55,0.1), rgba(212,175,55,0.02))',
            border: '1px solid #D4AF37',
            borderRadius: '8px',
            padding: '24px',
            display: 'inline-block'
          }}>
            <h3 className="font-bebas" style={{ fontSize: '32px', color: '#D4AF37', margin: 0, letterSpacing: '1px' }}>
              1 MILLION+ READY-MADE PRODUCTS — YOURS TODAY
            </h3>
          </div>
        </ScrollReveal>
      </section>

      <div className="gold-divider" />

      {/* ── SECTION C — EVERY QUESTION A BEGINNER ASKS ── */}
      <section style={{ padding: '100px 20px', background: '#0a0a0a' }}>
        <ScrollReveal style={{ maxWidth: 760, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span className="section-label">COMMON QUESTIONS</span>
            <h2 className="font-bebas" style={{ fontSize: 'clamp(36px, 6vw, 64px)', color: '#ffffff', marginTop: 12 }}>
              EVERY QUESTION A BEGINNER ASKS
            </h2>
          </div>
          <FaqAccordion items={BEGINNER_FAQ_ITEMS} />
        </ScrollReveal>
      </section>

      <div className="gold-divider" />

      {/* SECTION 7 — FINAL CTA */}
      <section style={{ padding: '120px 20px', background: 'radial-gradient(ellipse at center, #1a1400 0%, #050505 80%)', textAlign: 'center' }}>
        <ScrollReveal>
          <h2 className="font-bebas" style={{ fontSize: 'clamp(40px, 7vw, 88px)', color: '#ffffff', lineHeight: 1.05, marginBottom: 20 }}>
            YOU NOW KNOW WHAT DIGITAL PRODUCTS ARE.<br />
            <span className="gold-text">READY TO SELL THEM?</span>
          </h2>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(15px, 2vw, 17px)', color: '#8E8E8E', maxWidth: 600, margin: '0 auto 40px', lineHeight: 1.6 }}>
            Everything we talked about on this page — ebooks, AI prompts, reels, courses, templates — all of it is inside theluxverse vault. Ready to sell today.
          </p>
          
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/vault" className="btn-outline" style={{ fontSize: '1.05rem', minWidth: 200, justifyContent: 'center' }}>
              See The Vault <ArrowIcon />
            </Link>
            <Link to="/launchpad" className="btn-gold pulse-glow" style={{ fontSize: '1.05rem', minWidth: 200, justifyContent: 'center' }}>
              Join The Full System <ArrowIcon />
            </Link>
          </div>
        </ScrollReveal>
      </section>

      <Footer />
    </div>
  );
}
