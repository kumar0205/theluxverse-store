import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/lux/Navbar';
import Footer from '@/components/lux/Footer';
import Particles from '@/components/lux/Particles';
import ScrollReveal from '@/components/lux/ScrollReveal';
import ArrowIcon from '@/components/lux/ArrowIcon';
import { GLOBAL_CONFIG } from '@/config/products';

const REPLACE_INSTAGRAM = GLOBAL_CONFIG.instagram;

export default function Home() {
  return (
    <div style={{ background: '#0F0F13', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative', overflow: 'hidden' }}>
      <Navbar />
      <Particles count={6} />

      {/* ── MAIN BRIDGE SECTION ── */}
      <main style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '120px 20px 80px',
        position: 'relative',
        zIndex: 10,
        width: '100%',
        maxWidth: '1000px',
        margin: '0 auto'
      }}>
        <ScrollReveal style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          
          {/* Logo / Brand Name */}
          <div style={{ marginBottom: '24px', textAlign: 'center' }}>
            <h2 className="font-bebas gold-text" style={{ fontSize: 'clamp(32px, 6vw, 48px)', letterSpacing: '0.08em' }}>
              theluxverse
            </h2>
          </div>

          {/* Headline */}
          <h1 className="font-bebas text-white" style={{
            fontSize: 'clamp(36px, 6vw, 64px)',
            textAlign: 'center',
            marginBottom: '48px',
            letterSpacing: '0.05em'
          }}>
            CHOOSE YOUR STARTING POINT
          </h1>

          {/* Primary Pathway Card */}
          <div style={{
            width: '100%',
            maxWidth: '480px',
            marginBottom: '32px'
          }}>
            
            {/* Card - Beginner (Highlighted with gold border) */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(201,168,76,0.08) 0%, rgba(201,168,76,0.03) 100%)',
              border: '2px solid #D4AF37',
              borderRadius: '16px',
              padding: '36px 28px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
              position: 'relative',
              boxShadow: '0 10px 30px rgba(212,175,55,0.15)',
              minHeight: '320px'
            }}>
              {/* Tag */}
              <div style={{
                position: 'absolute',
                top: '-12px',
                background: '#D4AF37',
                color: '#050505',
                fontSize: '11px',
                fontWeight: '800',
                fontFamily: 'Poppins, sans-serif',
                padding: '4px 14px',
                borderRadius: '999px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                Start Here
              </div>

              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '16px' }}>
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" fill="rgba(212,175,55,0.2)" />
              </svg>
              <div>
                <h3 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '20px', fontWeight: '700', color: '#ffffff', marginBottom: '10px' }}>
                  I WANT A STEP-BY-STEP SYSTEM
                </h3>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#ccc', lineHeight: 1.6, marginBottom: '24px' }}>
                  Training, community and support included.
                </p>
              </div>
              <Link to="/launchpad" className="btn-gold pulse-glow" style={{ width: '100%', justifyContent: 'center', fontSize: '15px', fontWeight: '700' }}>
                See The Full System <ArrowIcon />
              </Link>
            </div>

          </div>

          {/* Secondary Option & Bottom helper link */}
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Link to="/vault" style={{ color: '#D4AF37', fontSize: '16px', textDecoration: 'underline', fontWeight: '600', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
              Or just browse the Vault <ArrowIcon size={16} />
            </Link>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#8E8E8E', margin: 0 }}>
              Not sure?{' '}
              <Link to="/what-is-digital-product" style={{ color: '#D4AF37', textDecoration: 'underline', fontWeight: '600' }}>
                Read: What is a Digital Product? <ArrowIcon size={14} />
              </Link>
            </p>
          </div>

        </ScrollReveal>
      </main>

      <Footer instagramLink={REPLACE_INSTAGRAM} />
    </div>
  );
}