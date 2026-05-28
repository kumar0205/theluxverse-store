import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer({ instagramLink = '#REPLACE_INSTAGRAM' }) {
  return (
    <footer style={{
      background: '#050505',
      borderTop: '1px solid rgba(212,175,55,0.08)',
      position: 'relative',
      overflow: 'hidden',
      padding: '60px 20px 30px',
    }}>
      {/* Watermark */}
      <div style={{
        position: 'absolute',
        bottom: 0, left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 0,
        pointerEvents: 'none',
        userSelect: 'none',
      }}>
        <div className="watermark-text">THELUXVERSE</div>
      </div>

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
              color: '#8E8E8E', textDecoration: 'none',
              transition: 'color 0.3s',
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#D4AF37'}
            onMouseLeave={e => e.currentTarget.style.color = '#8E8E8E'}
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
              color: '#8E8E8E', textDecoration: 'none',
              transition: 'color 0.3s',
            }}
            onMouseEnter={e => e.target.style.color = '#D4AF37'}
            onMouseLeave={e => e.target.style.color = '#8E8E8E'}
          >
            Launchpad
          </Link>
          <Link to="/links"
            style={{
              fontFamily: 'Poppins, sans-serif', fontSize: '0.85rem',
              color: '#8E8E8E', textDecoration: 'none',
              transition: 'color 0.3s',
            }}
            onMouseEnter={e => e.target.style.color = '#D4AF37'}
            onMouseLeave={e => e.target.style.color = '#8E8E8E'}
          >
            Links
          </Link>
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
      </div>
    </footer>
  );
}