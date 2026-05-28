import React from 'react';
import { Link } from 'react-router-dom';

function SacredGeo() {
  return (
    <svg
      viewBox="0 0 200 200"
      style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%',
        opacity: 0.04, pointerEvents: 'none',
      }}
    >
      <circle cx="100" cy="100" r="80" stroke="#D4AF37" strokeWidth="0.5" fill="none"/>
      <circle cx="100" cy="100" r="55" stroke="#F9E498" strokeWidth="0.5" fill="none"/>
      <circle cx="100" cy="45" r="55" stroke="#D4AF37" strokeWidth="0.5" fill="none"/>
      <circle cx="100" cy="155" r="55" stroke="#D4AF37" strokeWidth="0.5" fill="none"/>
      <circle cx="52" cy="72" r="55" stroke="#D4AF37" strokeWidth="0.5" fill="none"/>
      <circle cx="148" cy="72" r="55" stroke="#D4AF37" strokeWidth="0.5" fill="none"/>
      <circle cx="52" cy="128" r="55" stroke="#D4AF37" strokeWidth="0.5" fill="none"/>
      <circle cx="148" cy="128" r="55" stroke="#D4AF37" strokeWidth="0.5" fill="none"/>
    </svg>
  );
}

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
    <path d="M3 8l3.5 3.5L13 5" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const plans = [
  {
    name: 'STARTER VAULT',
    price: '₹299',
    tagline: 'Your first step into the game',
    badge: 'BEST TO START',
    features: ['Complete Ebooks Pack', 'Digital Products Bundle', 'Resell Rights Included', 'Instant Drive Access'],
    detailPath: '/starter-vault',
    link: 'starter',
    highlighted: false,
  },
  {
    name: 'CREATOR VAULT',
    price: '₹599',
    tagline: 'For those ready to post and profit',
    badge: 'MOST POPULAR',
    features: ['Everything in Starter', '10,000+ Reels Pack', 'Full Content Library', 'Editing Templates', 'Caption Swipe File'],
    detailPath: '/creator-vault',
    link: 'creator',
    highlighted: true,
  },
  {
    name: 'FULL VAULT',
    price: '₹999',
    tagline: 'The complete arsenal',
    badge: 'BEST VALUE',
    features: ['Everything in Creator', '1000+ Premium Courses', '15K AI Agent Templates', 'Private Community Access', 'Lifetime Updates'],
    detailPath: '/full-vault',
    link: 'full',
    highlighted: false,
  },
];

export default function VaultCards({ razorpayStarter, razorpayCreator, razorpayFull }) {
  const links = { starter: razorpayStarter, creator: razorpayCreator, full: razorpayFull };

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: 24,
      alignItems: 'start',
    }}>
      {plans.map((plan) => (
        <div
          key={plan.link}
          className={plan.highlighted ? 'molten-border' : 'vault-card'}
          style={{
            background: '#111111',
            borderRadius: 8,
            padding: plan.highlighted ? '40px 28px' : '32px 24px',
            position: 'relative',
            overflow: 'hidden',
            opacity: plan.highlighted ? 1 : 0.85,
            transform: plan.highlighted ? 'scale(1.04)' : 'scale(1)',
            transition: 'all 0.4s ease',
            boxShadow: plan.highlighted
              ? '0 20px 60px rgba(0,0,0,0.6), 0 0 60px rgba(212,175,55,0.15)'
              : '0 20px 40px rgba(0,0,0,0.4)',
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
            background: plan.highlighted ? 'linear-gradient(135deg, #D4AF37, #F9E498)' : 'rgba(212,175,55,0.1)',
            border: plan.highlighted ? 'none' : '1px solid rgba(212,175,55,0.3)',
            padding: '4px 10px',
            borderRadius: 3,
          }}>
            {plan.badge}
          </div>

          {/* Name */}
          <div className="section-label" style={{ marginBottom: 8 }}>{plan.name}</div>

          {/* Price */}
          <div className="font-bebas" style={{
            fontSize: 'clamp(52px, 8vw, 72px)',
            background: 'linear-gradient(135deg, #D4AF37, #F9E498)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            lineHeight: 1,
            marginBottom: 8,
          }}>
            {plan.price}
          </div>

          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.9rem',
            color: '#8E8E8E',
            marginBottom: 28,
            lineHeight: 1.5,
          }}>
            {plan.tagline}
          </p>

          <div style={{ height: 1, background: 'rgba(212,175,55,0.1)', marginBottom: 24 }} />

          {/* Features */}
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
            {plan.features.map((f, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <CheckIcon />
                <span style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.88rem',
                  color: '#F9E498',
                  lineHeight: 1.5,
                }}>
                  {f}
                </span>
              </li>
            ))}
          </ul>

          {/* See What's Inside */}
          <Link
            to={plan.detailPath}
            className={plan.highlighted ? 'btn-gold' : 'btn-outline'}
            style={{ width: '100%', justifyContent: 'center', marginBottom: 10, textDecoration: 'none' }}
          >
            See What's Inside →
          </Link>
          {/* Buy Now */}
          <a
            href={links[plan.link]}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: '100%', padding: '10px 16px', borderRadius: 4,
              fontFamily: 'Poppins, sans-serif', fontWeight: 600,
              fontSize: '0.82rem', letterSpacing: '0.04em',
              color: '#D4AF37', background: 'transparent',
              border: '1px solid rgba(212,175,55,0.2)',
              cursor: 'pointer', textDecoration: 'none',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(212,175,55,0.5)'; e.currentTarget.style.background = 'rgba(212,175,55,0.05)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(212,175,55,0.2)'; e.currentTarget.style.background = 'transparent'; }}
          >
            Buy Now {plan.price} →
          </a>
        </div>
      ))}
    </div>
  );
}