import React, { useEffect } from 'react';
import Navbar from '@/components/lux/Navbar';
import Footer from '@/components/lux/Footer';
import ScrollReveal from '@/components/lux/ScrollReveal';

export default function PrivacyPolicy() {
  // Set page meta description and title for SEO
  useEffect(() => {
    document.title = "Privacy Policy - TheLuxVerse";
    
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', 'Privacy Policy for TheLuxVerse. Understand how we collect, use, and protect your information securely.');
  }, []);

  return (
    <div style={{ background: '#0F0F13', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', color: '#ffffff', fontFamily: 'Inter, sans-serif' }}>
      <Navbar />

      <main style={{ flex: 1, padding: '120px 20px 80px', maxWidth: '800px', margin: '0 auto', width: '100%' }}>
        <ScrollReveal>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span className="section-label" style={{ marginBottom: '12px', display: 'inline-block' }}>LEGAL POLICY</span>
            <h1 className="font-bebas gold-text" style={{ fontSize: 'clamp(36px, 6vw, 64px)', marginBottom: '16px' }}>
              PRIVACY POLICY
            </h1>
            <div style={{ height: '2px', width: '60px', background: '#D4AF37', margin: '0 auto 24px' }} />
            <p style={{ color: '#8E8E8E', fontSize: '14px' }}>Last updated: June 2026</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', lineHeight: 1.8, fontSize: '16px', color: '#E0E0E0' }}>
            <section style={{ background: '#111', border: '1px solid rgba(212, 175, 55, 0.15)', borderRadius: '12px', padding: '32px' }}>
              <h2 className="font-poppins" style={{ fontSize: '20px', fontWeight: 'bold', color: '#ffffff', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#D4AF37' }}>1.</span> Information We Collect
              </h2>
              <p style={{ marginBottom: '16px' }}>
                When you purchase our digital products or register on our website, we collect the following personal information:
              </p>
              <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
                <li><strong style={{ color: '#F9E498' }}>Name:</strong> Used to customize your order delivery and billing invoice.</li>
                <li><strong style={{ color: '#F9E498' }}>Email Address:</strong> Used to securely deliver digital product download links, purchase receipts, and support communication.</li>
                <li><strong style={{ color: '#F9E498' }}>Payment Information:</strong> All payments are processed securely by our trusted partner, <strong style={{ color: '#D4AF37' }}>Razorpay</strong>. We never store or capture your financial details (such as credit/debit card numbers or net banking details) directly on our systems.</li>
              </ul>
            </section>

            <section style={{ background: '#111', border: '1px solid rgba(212, 175, 55, 0.15)', borderRadius: '12px', padding: '32px' }}>
              <h2 className="font-poppins" style={{ fontSize: '20px', fontWeight: 'bold', color: '#ffffff', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#D4AF37' }}>2.</span> How We Use Your Information
              </h2>
              <p style={{ marginBottom: '16px' }}>
                Your information is collected solely to enhance your user experience and is used only for:
              </p>
              <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li>Secure order fulfillment, processing transactions, and delivering the digital items.</li>
                <li>Providing customer support, answering inquiries, and assisting with access issues.</li>
              </ul>
            </section>

            <section style={{ background: '#111', border: '1px solid rgba(212, 175, 55, 0.15)', borderRadius: '12px', padding: '32px' }}>
              <h2 className="font-poppins" style={{ fontSize: '20px', fontWeight: 'bold', color: '#ffffff', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#D4AF37' }}>3.</span> Secure Processing
              </h2>
              <p>
                All payment transactions are handled through standard secure payment gateways powered by <strong style={{ color: '#D4AF37' }}>Razorpay</strong>. Razorpay handles transaction security protocols so your financial information remains fully protected.
              </p>
            </section>

            <section style={{ background: '#111', border: '1px solid rgba(212, 175, 55, 0.15)', borderRadius: '12px', padding: '32px' }}>
              <h2 className="font-poppins" style={{ fontSize: '20px', fontWeight: 'bold', color: '#ffffff', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#D4AF37' }}>4.</span> Zero Data Sharing
              </h2>
              <p>
                We believe in total privacy. <strong style={{ color: '#F9E498' }}>Customer data is never sold</strong>, shared, rented, or distributed to any third-party marketing networks or external firms. Your data is kept secure and private within TheLuxVerse ecosystem.
              </p>
            </section>

            <section style={{ background: '#111', border: '1px solid rgba(212, 175, 55, 0.15)', borderRadius: '12px', padding: '32px' }}>
              <h2 className="font-poppins" style={{ fontSize: '20px', fontWeight: 'bold', color: '#ffffff', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#D4AF37' }}>5.</span> Privacy Support
              </h2>
              <p>
                If you have any questions about how we handle your personal data or if you wish to request deletion of your data, please feel free to reach out to our team at <a href="mailto:theluxverse2@gmail.com" style={{ color: '#D4AF37', textDecoration: 'underline' }}>theluxverse2@gmail.com</a>.
              </p>
            </section>
          </div>
        </ScrollReveal>
      </main>

      <Footer />
    </div>
  );
}
