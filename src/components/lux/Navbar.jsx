import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ArrowIcon from '@/components/lux/ArrowIcon';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [showScrollCTA, setShowScrollCTA] = useState(false);
  const [scrollDirection, setScrollDirection] = useState('up');
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const onScroll = () => {
      const currentScroll = window.scrollY;
      setShowScrollCTA(currentScroll > 600);

      if (currentScroll > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      if (currentScroll > lastScrollY && currentScroll > 80) {
        setScrollDirection('down');
      } else if (currentScroll < lastScrollY) {
        setScrollDirection('up');
      }
      lastScrollY = currentScroll;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <style>{`
        .nav-cta-btn {
          padding: 8px 14px !important;
          font-size: 0.72rem !important;
          white-space: nowrap;
          border-radius: 9999px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        @media (max-width: 339px) {
          .nav-cta-btn {
            display: none !important;
          }
        }
        @media (min-width: 768px) {
          .nav-cta-btn {
            padding: 10px 22px !important;
            font-size: 0.85rem !important;
            gap: 8px;
          }
        }
      `}</style>
      <div style={{ position: 'fixed', top: 0, left: 0, zIndex: 1000, width: '100%', pointerEvents: 'none' }}>
        <nav
          className={`navbar ${scrolled ? 'scrolled' : ''}`}
          style={{
            position: 'relative', zIndex: 1002,
            pointerEvents: 'auto'
          }}
        >
          <div style={{
            maxWidth: 1200,
            margin: '0 auto',
            padding: '0 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            {/* Logo */}
            <Link 
              to="/" 
              style={{ 
                textDecoration: 'none',
                opacity: menuOpen ? 0 : 1,
                transition: 'opacity 0.2s',
                pointerEvents: menuOpen ? 'none' : 'auto'
              }}
            >
              <span className="font-bebas gold-text" style={{
                fontSize: 'clamp(18px, 4vw, 32px)',
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

             {/* Desktop & Mobile Header CTA Container */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Link
                to="/launchpad"
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '0.85rem',
                  color: '#ffffff',
                  textDecoration: 'none',
                  letterSpacing: '0.05em',
                  transition: 'color 0.3s',
                }}
                className="hidden md:inline-flex"
              >
                Full System
              </Link>
              {!menuOpen && showScrollCTA && (() => {
                const isVault = location.pathname === '/vault';
                const isLaunchpad = location.pathname === '/launchpad';
                const href = isVault ? '#vault-cards' : isLaunchpad ? '#final-cta' : '/launchpad';
                const label = isLaunchpad ? 'Join Now' : isVault ? 'Get The Vault' : 'Get Lifetime Access';

                return (
                  <a
                    href={href}
                    className="btn-gold nav-cta-btn"
                    style={{ textDecoration: 'none' }}
                  >
                    {label} <ArrowIcon size={12} />
                  </a>
                );
              })()}

              {/* Hamburger / Close Toggle */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  display: 'flex', flexDirection: 'column', gap: 6, padding: 4,
                  position: 'relative', width: 32, height: 32,
                  alignItems: 'center', justifyContent: 'center'
                }}
              >
                {menuOpen ? (
                  <div style={{ position: 'relative', width: 24, height: 24 }}>
                    <div style={{ position: 'absolute', top: 11, left: 0, width: 24, height: 1.5, background: '#D4AF37', borderRadius: 2, transform: 'rotate(45deg)' }} />
                    <div style={{ position: 'absolute', top: 11, left: 0, width: 24, height: 1.5, background: '#D4AF37', borderRadius: 2, transform: 'rotate(-45deg)' }} />
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'flex-end', width: 24 }}>
                    <div style={{ width: 24, height: 1.5, background: '#D4AF37', borderRadius: 2 }} />
                    <div style={{ width: 16, height: 1.5, background: '#D4AF37', borderRadius: 2 }} />
                  </div>
                )}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Full-Screen Menu */}
        <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
          <span className="font-bebas gold-text" style={{ fontSize: 'clamp(32px, 8vw, 52px)', letterSpacing: '0.08em', marginBottom: 16 }}>
            theluxverse
          </span>
          <div style={{ height: 1, width: 80, background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)', marginBottom: 40 }} />
          {[
            { label: 'Home', to: '/' },
            { label: 'The Vault', to: '/vault' },
            { label: 'Full System', to: '/launchpad' },
            { label: 'What is a Digital Product?', to: '/what-is-digital-product' },
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
        </div>
      </div>
    </>
  );
}