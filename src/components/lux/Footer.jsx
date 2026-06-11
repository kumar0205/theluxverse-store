import React from 'react';
import { Link } from 'react-router-dom';
import { GLOBAL_CONFIG } from '@/config/products';

export default function Footer({ instagramLink = GLOBAL_CONFIG.instagram }) {
  return (
    <footer style={{
      background: '#080808',
      borderTop: '1px solid rgba(212,175,55,0.12)',
      position: 'relative',
      overflow: 'hidden',
      padding: '60px 20px 30px',
      width: '100%',
    }}>
      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 1,
        maxWidth: 1100, margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 24,
        textAlign: 'center',
      }}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <span className="font-bebas gold-text" style={{ fontSize: 'clamp(28px, 5vw, 40px)', letterSpacing: '0.08em' }}>
            theluxverse
          </span>
        </Link>
        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '0.85rem',
          color: '#8E8E8E',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}>
          The Vault. The Edge. The Life.
        </p>

        <div style={{ display: 'flex', gap: 32, alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
          <a href={instagramLink} target="_blank" rel="noopener noreferrer"
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              fontFamily: 'Poppins, sans-serif', fontSize: '0.85rem',
              color: '#ffffff', textDecoration: 'none',
              transition: 'color 0.3s',
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#D4AF37'}
            onMouseLeave={e => e.currentTarget.style.color = '#ffffff'}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <circle cx="12" cy="12" r="4"/>
              <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
            </svg>
            Instagram
          </a>
          <Link to="/launchpad"
            style={{
              fontFamily: 'Poppins, sans-serif', fontSize: '0.85rem',
              color: '#ffffff', textDecoration: 'none',
              transition: 'color 0.3s',
            }}
            onMouseEnter={e => e.target.style.color = '#D4AF37'}
            onMouseLeave={e => e.target.style.color = '#ffffff'}
          >
            Full System
          </Link>
        </div>

        {/* Purchase Trust Badges */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '12px',
          flexWrap: 'wrap',
          marginTop: '16px',
          marginBottom: '8px',
          width: '100%',
          maxWidth: '700px'
        }}>
          {[
            { text: 'Secure Checkout', icon: '🛡️' },
            { text: 'Lifetime Access', icon: '🔑' },
            { text: 'Instant Delivery', icon: '⚡' },
            { text: 'Support Available', icon: '💬' }
          ].map((badge, idx) => (
            <div key={idx} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: '#E0E0E0',
              fontFamily: 'Poppins, sans-serif',
              fontSize: '12.5px',
              fontWeight: 500,
              background: 'rgba(212, 175, 55, 0.04)',
              border: '1px solid rgba(212, 175, 55, 0.12)',
              borderRadius: '999px',
              padding: '6px 14px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
            }}>
              <span style={{ display: 'inline-flex' }}>{badge.icon}</span>
              <span>{badge.text}</span>
            </div>
          ))}
        </div>

        <div style={{ height: 1, width: '100%', maxWidth: 400, background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.2), transparent)' }} />

        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '0.75rem',
          color: '#555',
          letterSpacing: '0.05em',
        }}>
          © {new Date().getFullYear()} theluxverse. All rights reserved. Digital products only.
        </p>

        <div style={{
          display:'flex', gap:'16px',
          justifyContent:'center',
          marginTop:'12px', flexWrap:'wrap'
        }}>
          {[
            {label:'Privacy Policy', href:'#REPLACE_LEGAL_LINK'},
            {label:'Terms of Service', href:'#REPLACE_LEGAL_LINK'},
            {label:'Refund Policy', href:'#REPLACE_LEGAL_LINK'},
            {label:'Contact Us', href:'#REPLACE_LEGAL_LINK'}
          ].map((link, i) => (
            <a key={i} href={link.href} style={{
              color:'#444', fontSize:'12px',
              textDecoration:'none'
            }}>
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}