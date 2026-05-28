import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          {/* Logo */}
          <Link to="/" style={{ textDecoration: 'none' }}>
            <span className="font-bebas gold-text" style={{
              fontSize: 'clamp(24px, 4vw, 32px)',
              letterSpacing: '0.08em',
              transition: 'filter 0.3s ease',
              filter: 'drop-shadow(0 0 12px rgba(212,175,55,0))',
            }}
              onMouseEnter={e => e.target.style.filter = 'drop-shadow(0 0 12px rgba(212,175,55,0.5))'}
              onMouseLeave={e => e.target.style.filter = 'drop-shadow(0 0 12px rgba(212,175,55,0))'}
            >
              theluxverse
            </span>
          </Link>

          {/* Desktop CTA */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <Link
              to="/#vault"
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '0.85rem',
                color: '#8E8E8E',
                textDecoration: 'none',
                letterSpacing: '0.05em',
                transition: 'color 0.3s',
              }}
              onMouseEnter={e => e.target.style.color = '#D4AF37'}
              onMouseLeave={e => e.target.style.color = '#8E8E8E'}
            >
              The Vault
            </Link>
            <Link
              to="/launchpad"
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '0.85rem',
                color: '#8E8E8E',
                textDecoration: 'none',
                letterSpacing: '0.05em',
                transition: 'color 0.3s',
                display: 'none',
              }}
              className="md-show"
            >
              Launchpad
            </Link>
            <a href="#vault" className="btn-gold" style={{ padding: '10px 22px', fontSize: '0.85rem' }}>
              Get The Vault →
            </a>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(true)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                display: 'flex', flexDirection: 'column', gap: 6, padding: 4,
              }}
            >
              <div style={{ width: 24, height: 1.5, background: '#D4AF37', borderRadius: 2 }} />
              <div style={{ width: 16, height: 1.5, background: '#D4AF37', borderRadius: 2 }} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Full-Screen Menu */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <button
          onClick={() => setMenuOpen(false)}
          style={{
            position: 'absolute', top: 24, right: 24,
            background: 'none', border: 'none', cursor: 'pointer',
            color: '#D4AF37', fontSize: '2rem', lineHeight: 1,
          }}
        >
          ×
        </button>
        <span className="font-bebas gold-text" style={{ fontSize: 'clamp(32px, 8vw, 52px)', letterSpacing: '0.08em', marginBottom: 16 }}>
          theluxverse
        </span>
        <div style={{ height: 1, width: 80, background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)', marginBottom: 40 }} />
        {[
          { label: 'Home', to: '/' },
          { label: 'The Vault', to: '/#vault' },
          { label: 'Launchpad', to: '/launchpad' },
          { label: 'Links', to: '/links' },
        ].map((item, i) => (
          <Link
            key={i}
            to={item.to}
            onClick={() => setMenuOpen(false)}
            style={{
              fontFamily: 'Bebas Neue, sans-serif',
              fontSize: 'clamp(28px, 6vw, 40px)',
              color: '#F9E498',
              textDecoration: 'none',
              letterSpacing: '0.08em',
              transition: 'color 0.3s',
            }}
          >
            {item.label}
          </Link>
        ))}
        <a href="#vault" className="btn-gold" style={{ marginTop: 24 }} onClick={() => setMenuOpen(false)}>
          Get The Vault →
        </a>
      </div>
    </>
  );
}