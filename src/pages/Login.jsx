// src/pages/Login.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/AuthContext';
import Navbar from '@/components/lux/Navbar';
import Footer from '@/components/lux/Footer';
import ArrowIcon from '@/components/lux/ArrowIcon';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');
    setIsSubmitting(true);
    try {
      await login(email, password);
      navigate('/admin');
    } catch (err) {
      console.error(err);
      const errMsg = err.message || '';
      const errCode = err.code || '';
      
      if (
        errMsg.includes('wrong-password') || 
        errMsg.includes('user-not-found') || 
        errMsg.includes('invalid-credential') ||
        errCode.includes('invalid-credential') ||
        errCode.includes('wrong-password') ||
        errCode.includes('user-not-found')
      ) {
        setError('Invalid email or password.');
      } else if (errMsg.includes('invalid-email') || errCode.includes('invalid-email')) {
        setError('Please enter a valid email address.');
      } else if (errMsg.includes('weak-password') || errCode.includes('weak-password')) {
        setError('Password should be at least 6 characters.');
      } else {
        setError('Login failed. Please check your credentials.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{
      background: '#0F0F13',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Radial Glow */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 1
      }} />

      <Navbar />

      <main style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '140px 20px 80px',
        position: 'relative',
        zIndex: 10,
        width: '100%'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '420px',
          background: 'rgba(255, 255, 255, 0.02)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(212,175,55,0.15)',
          borderRadius: '16px',
          padding: '40px 32px',
          boxShadow: '0 20px 50px rgba(0,0,0,0.5), 0 0 30px rgba(212,175,55,0.05)',
          textAlign: 'center'
        }}>
          <span style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: '11px',
            fontWeight: 800,
            color: '#D4AF37',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: '12px'
          }}>
            Secure Control Panel
          </span>

          <h2 className="font-bebas" style={{
            fontSize: '36px',
            color: '#ffffff',
            letterSpacing: '0.05em',
            marginBottom: '8px'
          }}>
            ADMIN LOGIN
          </h2>
          
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '13.5px',
            color: '#8E8E8E',
            lineHeight: 1.5,
            marginBottom: '32px'
          }}>
            Authorized personnel only. Enter credentials to manage store assets.
          </p>

          <form onSubmit={handleSubmit} style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {error && (
              <div style={{
                background: 'rgba(239,68,68,0.1)',
                border: '1px solid rgba(239,68,68,0.3)',
                color: '#ef4444',
                padding: '12px 16px',
                borderRadius: '8px',
                fontSize: '13.5px',
                fontFamily: 'Inter, sans-serif',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <span>⚠</span>
                <span>{error}</span>
              </div>
            )}

            <div>
              <label htmlFor="email" style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '12px',
                fontWeight: 600,
                color: '#c9a84c',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '8px'
              }}>
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="admin@theluxverse.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  width: '100%',
                  background: '#0D0D0D',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  padding: '14px 16px',
                  color: '#ffffff',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'border-color 0.25s'
                }}
                onFocus={(e) => e.target.style.borderColor = '#D4AF37'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
              />
            </div>

            <div>
              <label htmlFor="password" style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '12px',
                fontWeight: 600,
                color: '#c9a84c',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '8px'
              }}>
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: '100%',
                  background: '#0D0D0D',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  padding: '14px 16px',
                  color: '#ffffff',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'border-color 0.25s'
                }}
                onFocus={(e) => e.target.style.borderColor = '#D4AF37'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-gold"
              style={{
                width: '100%',
                justifyContent: 'center',
                fontSize: '15px',
                fontWeight: '700',
                padding: '15px',
                marginTop: '12px',
                opacity: isSubmitting ? 0.7 : 1,
                cursor: isSubmitting ? 'not-allowed' : 'pointer'
              }}
            >
              {isSubmitting ? 'Authenticating...' : 'Sign In'} <ArrowIcon />
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
