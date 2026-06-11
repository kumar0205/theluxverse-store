import React, { useEffect } from 'react';
import Navbar from '@/components/lux/Navbar';
import Footer from '@/components/lux/Footer';
import ScrollReveal from '@/components/lux/ScrollReveal';

export default function TermsAndConditions() {
  // Set page meta description and title for SEO
  useEffect(() => {
    document.title = "Terms & Conditions - TheLuxVerse";
    
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', 'Terms & Conditions for TheLuxVerse. Review details on product access, licenses, redistribution restrictions, and modifications.');
  }, []);

  return (
    <div style={{ background: '#0F0F13', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', color: '#ffffff', fontFamily: 'Inter, sans-serif' }}>
      <Navbar />

      <main style={{ flex: 1, padding: '120px 20px 80px', maxWidth: '800px', margin: '0 auto', width: '100%' }}>
        <ScrollReveal>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span className="section-label" style={{ marginBottom: '12px', display: 'inline-block' }}>LEGAL POLICY</span>
            <h1 className="font-bebas gold-text" style={{ fontSize: 'clamp(36px, 6vw, 64px)', marginBottom: '16px' }}>
              TERMS & CONDITIONS
            </h1>
            <div style={{ height: '2px', width: '60px', background: '#D4AF37', margin: '0 auto 24px' }} />
            <p style={{ color: '#8E8E8E', fontSize: '14px' }}>Last updated: June 2026</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', lineHeight: 1.8, fontSize: '16px', color: '#E0E0E0' }}>
            <section style={{ background: '#111', border: '1px solid rgba(212, 175, 55, 0.15)', borderRadius: '12px', padding: '32px' }}>
              <h2 className="font-poppins" style={{ fontSize: '20px', fontWeight: 'bold', color: '#ffffff', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#D4AF37' }}>1.</span> Scope of Services
              </h2>
              <p>
                TheLuxVerse sells premium digital products and educational resources designed for digital creators, entrepreneurs, and developers. Our offerings include high-value AI tools, templates, creator resources, courses, ebooks, and downloadable materials.
              </p>
            </section>

            <section style={{ background: '#111', border: '1px solid rgba(212, 175, 55, 0.15)', borderRadius: '12px', padding: '32px' }}>
              <h2 className="font-poppins" style={{ fontSize: '20px', fontWeight: 'bold', color: '#ffffff', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#D4AF37' }}>2.</span> License and Usage
              </h2>
              <p style={{ marginBottom: '16px' }}>
                Upon successful purchase, you are granted a non-exclusive, non-transferable, single-user license to access and use the purchased materials for personal or business development purposes.
              </p>
              <div style={{ padding: '16px', background: 'rgba(212,175,55,0.05)', borderLeft: '3px solid #D4AF37', borderRadius: '4px', color: '#F9E498', fontWeight: 500 }}>
                Unauthorized sharing, redistribution, resale, or sub-licensing of any TheLuxVerse product, course content, templates, or files is strictly prohibited.
              </div>
            </section>

            <section style={{ background: '#111', border: '1px solid rgba(212, 175, 55, 0.15)', borderRadius: '12px', padding: '32px' }}>
              <h2 className="font-poppins" style={{ fontSize: '20px', fontWeight: 'bold', color: '#ffffff', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#D4AF37' }}>3.</span> Product Content & Updates
              </h2>
              <p>
                To maintain the highest quality standards and stay up to date with modern trends, product content may be updated, expanded, or modified over time. As a licensed buyer, you will receive lifetime access to these updates unless stated otherwise.
              </p>
            </section>

            <section style={{ background: '#111', border: '1px solid rgba(212, 175, 55, 0.15)', borderRadius: '12px', padding: '32px' }}>
              <h2 className="font-poppins" style={{ fontSize: '20px', fontWeight: 'bold', color: '#ffffff', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#D4AF37' }}>4.</span> Right to Modify Website
              </h2>
              <p>
                TheLuxVerse reserves the right to modify, suspend, or discontinue any product, page, pricing plan, or section of the website at any time without prior notice.
              </p>
            </section>

            <section style={{ background: '#111', border: '1px solid rgba(212, 175, 55, 0.15)', borderRadius: '12px', padding: '32px' }}>
              <h2 className="font-poppins" style={{ fontSize: '20px', fontWeight: 'bold', color: '#ffffff', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#D4AF37' }}>5.</span> Technical Support
              </h2>
              <p>
                For any license queries, unauthorized usage reports, or support questions, please contact our administrative team at <a href="mailto:theluxverse2@gmail.com" style={{ color: '#D4AF37', textDecoration: 'underline' }}>theluxverse2@gmail.com</a>.
              </p>
            </section>
          </div>
        </ScrollReveal>
      </main>

      <Footer />
    </div>
  );
}
