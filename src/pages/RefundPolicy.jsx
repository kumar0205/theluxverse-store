import React, { useEffect } from 'react';
import Navbar from '@/components/lux/Navbar';
import Footer from '@/components/lux/Footer';
import ScrollReveal from '@/components/lux/ScrollReveal';

export default function RefundPolicy() {
  // Set page meta description and title for SEO
  useEffect(() => {
    document.title = "Refund Policy - TheLuxVerse";
    
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', 'Refund Policy for TheLuxVerse. Read our policy on digital products, download delivery, and technical assistance.');
  }, []);

  return (
    <div style={{ background: '#0F0F13', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', color: '#ffffff', fontFamily: 'Inter, sans-serif' }}>
      <Navbar />

      <main style={{ flex: 1, padding: '120px 20px 80px', maxWidth: '800px', margin: '0 auto', width: '100%' }}>
        <ScrollReveal>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span className="section-label" style={{ marginBottom: '12px', display: 'inline-block' }}>REFUND POLICY</span>
            <h1 className="font-bebas gold-text" style={{ fontSize: 'clamp(36px, 6vw, 64px)', marginBottom: '16px' }}>
              REFUND POLICY
            </h1>
            <div style={{ height: '2px', width: '60px', background: '#D4AF37', margin: '0 auto 24px' }} />
            <p style={{ color: '#8E8E8E', fontSize: '14px' }}>Last updated: June 2026</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', lineHeight: 1.8, fontSize: '16px', color: '#E0E0E0' }}>
            <section style={{ 
              background: 'linear-gradient(135deg, rgba(212,175,55,0.06) 0%, rgba(212,175,55,0.01) 100%)', 
              border: '2px solid #D4AF37', 
              borderRadius: '16px', 
              padding: '40px 32px',
              textAlign: 'center',
              boxShadow: '0 10px 30px rgba(212,175,55,0.08)'
            }}>
              <h2 className="font-bebas gold-text" style={{ fontSize: '32px', marginBottom: '20px', letterSpacing: '0.05em' }}>
                DIGITAL SALES POLICY
              </h2>
              <p style={{ fontSize: '18px', fontWeight: '500', color: '#ffffff', marginBottom: '24px', lineHeight: 1.6 }}>
                "Due to the digital nature of our products and instant access delivery, all sales are generally final and refunds are not provided."
              </p>
              <div style={{ height: '1px', width: '100%', maxWidth: '300px', background: 'rgba(212,175,55,0.2)', margin: '0 auto 24px' }} />
              <p style={{ fontSize: '15px', color: '#8E8E8E' }}>
                Once digital files are unlocked or downloaded, the service is deemed completed, which prevents us from accepting returns.
              </p>
            </section>

            <section style={{ background: '#111', border: '1px solid rgba(212, 175, 55, 0.15)', borderRadius: '12px', padding: '32px' }}>
              <h2 className="font-poppins" style={{ fontSize: '20px', fontWeight: 'bold', color: '#ffffff', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#D4AF37' }}>✓</span> Need Help? We are here.
              </h2>
              <p style={{ marginBottom: '16px' }}>
                Although sales are final, customer satisfaction is our top priority. We want to ensure you get the full value out of your purchase.
              </p>
              <p style={{ color: '#F9E498', fontWeight: 500 }}>
                "If you face any access or technical issues, contact us at <a href="mailto:theluxverse2@gmail.com" style={{ color: '#D4AF37', textDecoration: 'underline' }}>theluxverse2@gmail.com</a> and we will assist you."
              </p>
            </section>

            <section style={{ background: '#111', border: '1px solid rgba(212, 175, 55, 0.15)', borderRadius: '12px', padding: '32px' }}>
              <h2 className="font-poppins" style={{ fontSize: '20px', fontWeight: 'bold', color: '#ffffff', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#D4AF37' }}>⚙</span> Technical Support Scope
              </h2>
              <p>
                Our support desk is equipped to resolve problems such as broken download links, zip extraction errors, file access permissions, or platform navigation questions. We will reply to your support request as quickly as possible.
              </p>
            </section>
          </div>
        </ScrollReveal>
      </main>

      <Footer />
    </div>
  );
}
