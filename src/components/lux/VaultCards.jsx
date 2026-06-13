import React from 'react';
import ScrollReveal from '@/components/lux/ScrollReveal';
import { Link } from 'react-router-dom';
import ArrowIcon from '@/components/lux/ArrowIcon';
import { PRODUCTS } from '@/config/products';

function SacredGeo() {
  return (
    <svg
      viewBox="0 0 200 200"
      style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%',
        opacity: 0.05, pointerEvents: 'none',
      }}
    >
      <circle cx="100" cy="100" r="80" stroke="#D4AF37" strokeWidth="0.5" fill="none" />
      <circle cx="100" cy="100" r="55" stroke="#F9E498" strokeWidth="0.5" fill="none" />
      <circle cx="100" cy="45" r="55" stroke="#D4AF37" strokeWidth="0.5" fill="none" />
      <circle cx="100" cy="155" r="55" stroke="#D4AF37" strokeWidth="0.5" fill="none" />
      <circle cx="52" cy="72" r="55" stroke="#D4AF37" strokeWidth="0.5" fill="none" />
      <circle cx="148" cy="72" r="55" stroke="#D4AF37" strokeWidth="0.5" fill="none" />
      <circle cx="52" cy="128" r="55" stroke="#D4AF37" strokeWidth="0.5" fill="none" />
      <circle cx="148" cy="128" r="55" stroke="#D4AF37" strokeWidth="0.5" fill="none" />
    </svg>
  );
}

import { useDb } from '@/config/DbContext';

const CheckIcon = () => (
  <span style={{ color: '#D4AF37', fontWeight: 'bold', fontSize: '1.1rem', lineHeight: 1, flexShrink: 0, marginTop: 1 }}>✓</span>
);

export default React.memo(function VaultCards({ razorpayStarter, razorpayCreator, razorpayFull }) {
  const { products } = useDb();

  const plans = [
    {
      ...products.fullVault,
      detailPath: '/full-vault',
      link: 'full',
      // Format prices if they are numbers
      price: typeof products.fullVault.price === 'number' ? `₹${products.fullVault.price.toLocaleString('en-IN')}` : products.fullVault.price,
      originalPrice: typeof products.fullVault.originalPrice === 'number' ? `₹${products.fullVault.originalPrice.toLocaleString('en-IN')}` : products.fullVault.originalPrice,
    },
    {
      ...products.creatorVault,
      detailPath: '/creator-vault',
      link: 'creator',
      // Format prices if they are numbers
      price: typeof products.creatorVault.price === 'number' ? `₹${products.creatorVault.price.toLocaleString('en-IN')}` : products.creatorVault.price,
      originalPrice: typeof products.creatorVault.originalPrice === 'number' ? `₹${products.creatorVault.originalPrice.toLocaleString('en-IN')}` : products.creatorVault.originalPrice,
    },
  ];

  const links = { 
    starter: razorpayStarter, 
    creator: razorpayCreator || products.creatorVault.url, 
    full: razorpayFull || products.fullVault.url 
  };


  return (
    <>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 24,
        alignItems: 'start',
      }}>
        {plans.map((plan, index) => (
          <ScrollReveal key={plan.link} delay={index * 0.15}>
            <div
              id={`${plan.link}-vault`}
              className="vault-card"
              style={{
                background: plan.highlighted ? '#1a1a1a' : '#111111',
                borderRadius: 12,
                border: plan.highlighted ? '2.5px solid #D4AF37' : '1px solid rgba(255,255,255,0.15)',
                padding: '38px 26px',
                position: 'relative',
                opacity: 1,
                boxShadow: plan.highlighted ? '0 15px 45px rgba(212, 175, 55, 0.25), 0 20px 40px rgba(0,0,0,0.6)' : '0 20px 40px rgba(0,0,0,0.4)',
                transform: plan.highlighted ? 'scale(1.02)' : 'none',
                transition: 'all 0.3s ease',
              }}
            >
              <SacredGeo />

              {/* Badge */}
              <div style={{
                position: 'absolute',
                top: 16, right: 16,
                fontFamily: 'Poppins, sans-serif',
                fontSize: '0.6rem',
                fontWeight: 700,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: plan.highlighted ? '#050505' : '#D4AF37',
                background: plan.highlighted ? '#D4AF37' : 'rgba(212,175,55,0.1)',
                border: plan.highlighted ? 'none' : '1px solid rgba(212,175,55,0.3)',
                padding: '4px 10px',
                borderRadius: 3,
                zIndex: 2,
              }}>
                {plan.badge}
              </div>

              {/* Name */}
              <h3 className="font-bebas" style={{ fontSize: '32px', color: '#ffffff', letterSpacing: '0.05em', marginBottom: 8, position: 'relative', zIndex: 2 }}>{plan.name}</h3>

              {/* Price */}
              <div style={{
                marginBottom: plan.highlighted ? 4 : 8,
                position: 'relative',
                zIndex: 2,
              }}>
                <div style={{ display: 'flex', alignItems: 'baseline' }}>
                  <span style={{
                    color: plan.highlighted ? '#555' : 'rgba(255, 255, 255, 0.5)', fontSize: '14px',
                    textDecoration: 'line-through',
                    marginRight: '8px'
                  }}>
                    {plan.originalPrice}
                  </span>
                  <span style={{
                    fontFamily: 'Bebas Neue',
                    fontSize: '42px', color: '#c9a84c',
                    lineHeight: 1
                  }}>
                    {plan.price}
                  </span>
                </div>
              </div>
              {plan.tagline && (
                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.9rem',
                  color: '#ffffff',
                  marginBottom: 28,
                  lineHeight: 1.5,
                  position: 'relative',
                  zIndex: 2,
                }}>
                  {plan.tagline}
                </p>
              )}

              <div style={{ height: 1, background: 'rgba(212,175,55,0.1)', marginBottom: 24, position: 'relative', zIndex: 2 }} />

              {/* Features */}
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32, position: 'relative', zIndex: 2 }}>
                {plan.features.map((f, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                    <CheckIcon />
                    <span style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.88rem',
                      color: '#ffffff',
                      lineHeight: 1.5,
                    }}>
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Upgrade note for non-highlighted plan */}
              {plan.missNote && (
                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.78rem',
                  color: 'rgba(255, 255, 255, 0.5)',
                  fontStyle: 'italic',
                  marginBottom: 24,
                  marginTop: -12,
                  position: 'relative',
                  zIndex: 2,
                }}>
                  ⚠ {plan.missNote} — upgrade to Full Vault for ₹100 more
                </p>
              )}

              {/* See Details */}
              <div style={{ position: 'relative', zIndex: 2 }}>
                <Link
                  to={plan.detailPath}
                  className="buy-directly-btn"
                  style={{ marginBottom: '12px', position: 'relative', zIndex: 2 }}
                >
                  See Details <ArrowIcon size={14} />
                </Link>
              </div>

              {/* Buy Now directly */}
              <a
                id={plan.link === 'creator' ? 'buy-699' : undefined}
                href={links[plan.link]}
                className={plan.highlighted ? "btn-gold" : "btn-outline"}
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  marginTop: '12px',
                  textDecoration: 'none',
                  position: 'relative',
                  zIndex: 2,
                }}
              >
                Buy directly {plan.price}
              </a>
              <p style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '12px', marginTop: '12px', fontFamily: 'Inter, sans-serif', textAlign: 'center', position: 'relative', zIndex: 2 }}>
                One-time payment · Lifetime access
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>


    </>
  );
});