import React, { useEffect } from 'react';
import Navbar from '@/components/lux/Navbar';
import Footer from '@/components/lux/Footer';
import ScrollReveal from '@/components/lux/ScrollReveal';
import { Mail, Clock, MessageSquare } from 'lucide-react';

export default function Contact() {
  // Set page meta description and title for SEO
  useEffect(() => {
    document.title = "Contact Support - TheLuxVerse";
    
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', 'Get in touch with TheLuxVerse support. We are happy to help with access issues, templates, and general inquiries.');
  }, []);

  return (
    <div style={{ background: '#0F0F13', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', color: '#ffffff', fontFamily: 'Inter, sans-serif' }}>
      <Navbar />

      <main style={{ flex: 1, padding: '120px 20px 80px', maxWidth: '900px', margin: '0 auto', width: '100%' }}>
        <ScrollReveal>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span className="section-label" style={{ marginBottom: '12px', display: 'inline-block' }}>GET IN TOUCH</span>
            <h1 className="font-bebas gold-text" style={{ fontSize: 'clamp(40px, 7vw, 72px)', marginBottom: '16px' }}>
              CONTACT SUPPORT
            </h1>
            <div style={{ height: '2px', width: '60px', background: '#D4AF37', margin: '0 auto 24px' }} />
            <p style={{ color: '#8E8E8E', fontSize: '16px', maxWidth: '500px', margin: '0 auto', lineHeight: 1.6 }}>
              Have questions about your order, files, templates, or the Creator Vault? We're here to assist.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '24px',
            marginBottom: '56px'
          }}>
            {/* Brand / Support Card */}
            <div style={{
              background: '#111',
              border: '1px solid rgba(212, 175, 55, 0.15)',
              borderRadius: '12px',
              padding: '32px 24px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '16px'
            }}>
              <div style={{ width: '48px', height: '48px', background: 'rgba(212,175,55,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MessageSquare size={24} style={{ color: '#D4AF37' }} />
              </div>
              <div>
                <h3 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '18px', fontWeight: 'bold', color: '#ffffff', marginBottom: '8px' }}>
                  Brand Support
                </h3>
                <p style={{ color: '#F9E498', fontSize: '15px', fontWeight: 600 }}>
                  TheLuxVerse
                </p>
              </div>
              <p style={{ color: '#8E8E8E', fontSize: '14px', lineHeight: 1.5 }}>
                "We are happy to help with access issues, support requests, and general inquiries."
              </p>
            </div>

            {/* Email Support Card */}
            <div style={{
              background: '#111',
              border: '1px solid rgba(212, 175, 55, 0.15)',
              borderRadius: '12px',
              padding: '32px 24px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '16px'
            }}>
              <div style={{ width: '48px', height: '48px', background: 'rgba(212,175,55,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Mail size={24} style={{ color: '#D4AF37' }} />
              </div>
              <div>
                <h3 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '18px', fontWeight: 'bold', color: '#ffffff', marginBottom: '8px' }}>
                  Email Address
                </h3>
                <p style={{ color: '#F9E498', fontSize: '15px', fontWeight: 600 }}>
                  theluxverse2@gmail.com
                </p>
              </div>
              <p style={{ color: '#8E8E8E', fontSize: '14px', lineHeight: 1.5 }}>
                Directly reach out to our dedicated support representatives.
              </p>
            </div>

            {/* Response Time Card */}
            <div style={{
              background: '#111',
              border: '1px solid rgba(212, 175, 55, 0.15)',
              borderRadius: '12px',
              padding: '32px 24px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '16px'
            }}>
              <div style={{ width: '48px', height: '48px', background: 'rgba(212,175,55,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Clock size={24} style={{ color: '#D4AF37' }} />
              </div>
              <div>
                <h3 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '18px', fontWeight: 'bold', color: '#ffffff', marginBottom: '8px' }}>
                  Response Time
                </h3>
                <p style={{ color: '#F9E498', fontSize: '15px', fontWeight: 600 }}>
                  24–48 hours
                </p>
              </div>
              <p style={{ color: '#8E8E8E', fontSize: '14px', lineHeight: 1.5 }}>
                Our typical turnaround time for ticket resolution and email replies.
              </p>
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <a href="mailto:theluxverse2@gmail.com" className="btn-gold pulse-glow" style={{ fontSize: '16px', textDecoration: 'none' }}>
              Send support email
            </a>
          </div>
        </ScrollReveal>
      </main>

      <Footer />
    </div>
  );
}
