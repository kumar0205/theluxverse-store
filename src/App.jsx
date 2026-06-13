import { lazy, Suspense } from 'react';
import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ScrollToTop from '@/components/ScrollToTop';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import TermsAndConditions from '@/pages/TermsAndConditions';
import RefundPolicy from '@/pages/RefundPolicy';
import Contact from '@/pages/Contact';
import { AuthProvider } from '@/lib/AuthContext';
import { DbProvider } from '@/config/DbContext';
import ProtectedRoute from '@/components/ProtectedRoute';

// Lazy load pages
const Home = lazy(() => import('@/pages/Home'));
const ThankYou = lazy(() => import('@/pages/ThankYou'));
const LaunchpadPage = lazy(() => import('@/pages/LaunchpadPage'));
const VaultPage = lazy(() => import('@/pages/VaultPage'));
const CreatorVault = lazy(() => import('@/pages/CreatorVault'));
const FullVault = lazy(() => import('@/pages/FullVault'));
const WhatIsDigitalProduct = lazy(() => import('@/pages/WhatIsDigitalProduct'));
const Login = lazy(() => import('@/pages/Login'));
const AdminDashboard = lazy(() => import('@/pages/AdminDashboard'));

function SkeletonLoader() {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: '#0F0F13',
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
      zIndex: 9999,
      overflow: 'hidden'
    }}>
      {/* Navbar skeleton */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '16px' }}>
        <div style={{ width: '120px', height: '24px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px' }} className="shimmer" />
        <div style={{ display: 'flex', gap: '16px' }}>
          <div style={{ width: '60px', height: '16px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px' }} className="shimmer" />
          <div style={{ width: '60px', height: '16px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px' }} className="shimmer" />
          <div style={{ width: '60px', height: '16px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px' }} className="shimmer" />
        </div>
      </div>

      {/* Hero Header Skeleton */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', marginTop: '64px' }}>
        <div style={{ width: '80%', maxWidth: '480px', height: '48px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }} className="shimmer" />
        <div style={{ width: '60%', maxWidth: '360px', height: '32px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }} className="shimmer" />
      </div>

      {/* Description lines */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', marginTop: '24px' }}>
        <div style={{ width: '90%', maxWidth: '600px', height: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '4px' }} className="shimmer" />
        <div style={{ width: '85%', maxWidth: '560px', height: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '4px' }} className="shimmer" />
        <div style={{ width: '50%', maxWidth: '320px', height: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '4px' }} className="shimmer" />
      </div>

      {/* Grid of cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '20px',
        marginTop: '64px',
        width: '100%',
        maxWidth: '1000px',
        marginLeft: 'auto',
        marginRight: 'auto'
      }}>
        <div style={{ height: '180px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ width: '40px', height: '40px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%' }} className="shimmer" />
          <div style={{ width: '120px', height: '20px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px' }} className="shimmer" />
          <div style={{ width: '100%', height: '14px', background: 'rgba(255,255,255,0.03)', borderRadius: '4px' }} className="shimmer" />
        </div>
        <div style={{ height: '180px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }} className="hidden sm:flex">
          <div style={{ width: '40px', height: '40px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%' }} className="shimmer" />
          <div style={{ width: '120px', height: '20px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px' }} className="shimmer" />
          <div style={{ width: '100%', height: '14px', background: 'rgba(255,255,255,0.03)', borderRadius: '4px' }} className="shimmer" />
        </div>
        <div style={{ height: '180px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }} className="hidden md:flex">
          <div style={{ width: '40px', height: '40px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%' }} className="shimmer" />
          <div style={{ width: '120px', height: '20px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px' }} className="shimmer" />
          <div style={{ width: '100%', height: '14px', background: 'rgba(255,255,255,0.03)', borderRadius: '4px' }} className="shimmer" />
        </div>
      </div>

      <style>{`
        .shimmer {
          position: relative;
          overflow: hidden;
        }
        .shimmer::after {
          position: absolute;
          inset: 0;
          transform: translateX(-100%);
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.04),
            transparent
          );
          animation: loading-shimmer 1.5s infinite;
          content: '';
        }
        @keyframes loading-shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClientInstance}>
      <AuthProvider>
        <DbProvider>
          <Router>
            <ScrollToTop />
            <Suspense fallback={<SkeletonLoader />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                
                {/* Protected Admin routes */}
                <Route element={<ProtectedRoute />}>
                  <Route path="/admin" element={<AdminDashboard />} />
                </Route>

                <Route path="/thankyou" element={<ThankYou />} />
                <Route path="/launchpad" element={<LaunchpadPage />} />
                <Route path="/vault" element={<VaultPage />} />
                <Route path="/creator-vault" element={<CreatorVault />} />
                <Route path="/full-vault" element={<FullVault />} />
                <Route path="/what-is-digital-product" element={<WhatIsDigitalProduct />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
                <Route path="/refund-policy" element={<RefundPolicy />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<Home />} />
              </Routes>
            </Suspense>
          </Router>
        </DbProvider>
      </AuthProvider>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;