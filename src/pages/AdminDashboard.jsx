// src/pages/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/AuthContext';
import { useDb } from '@/config/DbContext';
import Navbar from '@/components/lux/Navbar';
import Footer from '@/components/lux/Footer';
import ArrowIcon from '@/components/lux/ArrowIcon';

export default function AdminDashboard() {
  const { logout, user } = useAuth();
  const {
    products,
    globalSettings,
    analytics,
    loading,
    updateProduct,
    updateGlobalSettings,
    updateAnalytics,
    uploadFile
  } = useDb();
  
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('products');
  const [notification, setNotification] = useState({ message: '', type: '' });

  // Form states
  const [launchpadForm, setLaunchpadForm] = useState({ price: 0, originalPrice: 0, globalPrice: 0, url: '', globalUrl: '', enabled: true });
  const [creatorForm, setCreatorForm] = useState({ price: 0, originalPrice: 0, url: '', driveUrl: '', enabled: true });
  const [fullForm, setFullForm] = useState({ price: 0, originalPrice: 0, url: '', driveUrl: '', enabled: true });
  const [globalForm, setGlobalForm] = useState({ discord: '', supportEmail: '', instagram: '' });
  const [newProof, setNewProof] = useState({ src: '', alt: '' });
  const [uploadMethod, setUploadMethod] = useState('file'); // 'file' or 'url'
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  // Sync forms with database values once loaded
  useEffect(() => {
    if (products.launchpad) {
      setLaunchpadForm({
        price: products.launchpad.price || 0,
        originalPrice: products.launchpad.originalPrice || 0,
        globalPrice: products.launchpad.globalPrice || 0,
        url: products.launchpad.url || '',
        globalUrl: products.launchpad.globalUrl || '',
        enabled: products.launchpad.enabled !== false
      });
    }
    if (products.creatorVault) {
      setCreatorForm({
        price: products.creatorVault.price || 0,
        originalPrice: products.creatorVault.originalPrice || 0,
        url: products.creatorVault.url || '',
        driveUrl: products.creatorVault.driveUrl || '',
        enabled: products.creatorVault.enabled !== false
      });
    }
    if (products.fullVault) {
      setFullForm({
        price: products.fullVault.price || 0,
        originalPrice: products.fullVault.originalPrice || 0,
        url: products.fullVault.url || '',
        driveUrl: products.fullVault.driveUrl || '',
        enabled: products.fullVault.enabled !== false
      });
    }
  }, [products]);

  useEffect(() => {
    if (globalSettings) {
      setGlobalForm({
        discord: globalSettings.discord || '',
        supportEmail: globalSettings.supportEmail || '',
        instagram: globalSettings.instagram || ''
      });
    }
  }, [globalSettings]);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification({ message: '', type: '' });
    }, 4000);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const handleSaveError = (err, fallbackMessage) => {
    console.error(err);
    const code = err?.code || '';
    const message = err?.message || '';
    if (code === 'permission-denied' || message.includes('permission-denied') || message.includes('Missing or insufficient permissions')) {
      showNotification('Permission Denied! Check your Firestore Security Rules in Firebase Console.', 'error');
    } else {
      showNotification(fallbackMessage, 'error');
    }
  };

  const saveProduct = async (id, formData) => {
    try {
      // Convert numbers
      const parsedData = {
        ...formData,
        price: Number(formData.price),
        originalPrice: Number(formData.originalPrice),
        ...(formData.globalPrice !== undefined ? { globalPrice: Number(formData.globalPrice) } : {})
      };
      await updateProduct(id, parsedData);
      showNotification(`Successfully updated ${id} pricing!`);
    } catch (err) {
      handleSaveError(err, 'Failed to update product settings.');
    }
  };

  const saveSettings = async (e) => {
    e.preventDefault();
    try {
      await updateGlobalSettings(globalForm);
      showNotification('Successfully updated global configurations!');
    } catch (err) {
      handleSaveError(err, 'Failed to update global settings.');
    }
  };

  const handleAddProof = async (e) => {
    e.preventDefault();
    
    let imageUrl = newProof.src;
    
    if (uploadMethod === 'file') {
      if (!selectedFile) {
        showNotification('Please select an image file to upload.', 'error');
        return;
      }
      setIsUploading(true);
      try {
        const path = `proofs/${Date.now()}_${selectedFile.name}`;
        imageUrl = await uploadFile(path, selectedFile);
      } catch (err) {
        console.error("Upload error", err);
        setIsUploading(false);
        handleSaveError(err, 'Failed to upload image. Check Storage rules.');
        return;
      }
    } else {
      if (!imageUrl) {
        showNotification('Image link cannot be empty.', 'error');
        return;
      }
    }

    try {
      const currentList = analytics.proofScreenshots || [];
      const updatedList = [
        ...currentList,
        { id: Date.now().toString(), src: imageUrl, alt: newProof.alt || 'Proof Screenshot' }
      ];
      await updateAnalytics({ proofScreenshots: updatedList });
      setNewProof({ src: '', alt: '' });
      setSelectedFile(null);
      
      const fileInput = document.getElementById('proof-file-input');
      if (fileInput) fileInput.value = '';
      
      showNotification('Proof screenshot added successfully!');
    } catch (err) {
      handleSaveError(err, 'Failed to add proof screenshot.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteProof = async (id) => {
    try {
      const currentList = analytics.proofScreenshots || [];
      const updatedList = currentList.filter(item => item.id !== id);
      await updateAnalytics({ proofScreenshots: updatedList });
      showNotification('Proof screenshot deleted.');
    } catch (err) {
      handleSaveError(err, 'Failed to delete proof screenshot.');
    }
  };

  const handleSimulateSale = async (amount) => {
    try {
      const currentRevenue = analytics.revenue || 0;
      const currentSales = analytics.salesCount || 0;
      await updateAnalytics({
        revenue: currentRevenue + Number(amount),
        salesCount: currentSales + 1
      });
      showNotification(`Simulated sale of ₹${amount} logged successfully!`);
    } catch (err) {
      handleSaveError(err, 'Failed to simulate sale.');
    }
  };

  if (loading) {
    return (
      <div style={{ background: '#0F0F13', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '40px', height: '40px', border: '4px solid rgba(255,255,255,0.05)', borderTopColor: '#D4AF37', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div style={{ background: '#050505', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', color: '#ffffff', fontFamily: 'Inter, sans-serif' }}>
      <Navbar />

      <main style={{ flex: 1, width: '100%', maxWidth: '1100px', margin: '0 auto', padding: '140px 20px 80px', position: 'relative', zIndex: 10 }}>
        
        {/* Header Block */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(212,175,55,0.15)', paddingBottom: '24px', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 className="font-bebas" style={{ fontSize: '42px', color: '#ffffff', letterSpacing: '0.05em', margin: 0 }}>
              ADMIN CONTROL ROOM
            </h1>
            <p style={{ color: '#8E8E8E', fontSize: '14px', margin: '4px 0 0' }}>
              Welcome back, <span style={{ color: '#D4AF37', fontWeight: 600 }}>{user?.email}</span>
            </p>
          </div>
          <button
            onClick={handleLogout}
            style={{
              background: 'rgba(239,68,68,0.1)',
              border: '1px solid rgba(239,68,68,0.3)',
              color: '#ff6b6b',
              padding: '10px 20px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '13.5px',
              fontWeight: 600,
              fontFamily: 'Poppins, sans-serif',
              transition: 'background 0.25s'
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.2)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(239,68,68,0.1)'}
          >
            Sign Out
          </button>
        </div>

        {/* Global Toast Notification */}
        {notification.message && (
          <div style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            background: notification.type === 'error' ? 'rgba(239, 68, 68, 0.95)' : 'rgba(212, 175, 55, 0.95)',
            color: notification.type === 'error' ? '#ffffff' : '#050505',
            padding: '16px 24px',
            borderRadius: '10px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '14.5px',
            fontWeight: 700,
            animation: 'fadeInUp 0.3s ease'
          }}>
            <span>{notification.type === 'error' ? '⚠' : '✦'}</span>
            <span>{notification.message}</span>
          </div>
        )}

        {/* Tabs Bar */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '32px', overflowX: 'auto', paddingBottom: '8px' }} className="scrollbar-hidden">
          {[
            { id: 'products', label: 'Products Management' },
            { id: 'settings', label: 'Global Configurations' },
            { id: 'analytics', label: 'Analytics Insights' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: activeTab === tab.id ? 'linear-gradient(135deg, rgba(212,175,55,0.15), rgba(212,175,55,0.05))' : 'transparent',
                border: activeTab === tab.id ? '1px solid #D4AF37' : '1px solid rgba(255,255,255,0.08)',
                color: activeTab === tab.id ? '#D4AF37' : '#8E8E8E',
                padding: '12px 22px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '13.5px',
                fontWeight: 600,
                whiteSpace: 'nowrap',
                transition: 'all 0.25s'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Contents */}
        <div style={{ minHeight: '400px' }}>
          
          {/* TAB 1: PRODUCTS */}
          {activeTab === 'products' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
              
              {/* Product 1: Launchpad */}
              <div style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(212,175,55,0.12)', borderRadius: '16px', padding: '28px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
                  <h3 className="font-bebas" style={{ fontSize: '28px', color: '#D4AF37', margin: 0 }}>
                    🚀 LAUNCHPAD SYSTEM
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '13px', color: '#8E8E8E' }}>Product Status:</span>
                    <button
                      onClick={() => setLaunchpadForm(prev => ({ ...prev, enabled: !prev.enabled }))}
                      style={{
                        background: launchpadForm.enabled ? '#22c55e' : 'rgba(255,255,255,0.1)',
                        color: launchpadForm.enabled ? '#050505' : '#8E8E8E',
                        border: 'none',
                        padding: '6px 14px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '12.5px',
                        fontWeight: 700
                      }}
                    >
                      {launchpadForm.enabled ? 'ACTIVE / SHOW' : 'HIDDEN / OFF'}
                    </button>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '20px' }}>
                  <div>
                    <label style={{ fontSize: '12.5px', color: '#8e8e8e', display: 'block', marginBottom: '6px' }}>Local Price (INR)</label>
                    <input
                      type="number"
                      value={launchpadForm.price}
                      onChange={e => setLaunchpadForm(prev => ({ ...prev, price: e.target.value }))}
                      style={{ width: '100%', background: '#0D0D0D', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '12px', color: '#fff' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '12.5px', color: '#8e8e8e', display: 'block', marginBottom: '6px' }}>Original Price (INR)</label>
                    <input
                      type="number"
                      value={launchpadForm.originalPrice}
                      onChange={e => setLaunchpadForm(prev => ({ ...prev, originalPrice: e.target.value }))}
                      style={{ width: '100%', background: '#0D0D0D', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '12px', color: '#fff' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '12.5px', color: '#8e8e8e', display: 'block', marginBottom: '6px' }}>Global Price (USD)</label>
                    <input
                      type="number"
                      value={launchpadForm.globalPrice}
                      onChange={e => setLaunchpadForm(prev => ({ ...prev, globalPrice: e.target.value }))}
                      style={{ width: '100%', background: '#0D0D0D', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '12px', color: '#fff' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
                  <div>
                    <label style={{ fontSize: '12.5px', color: '#8e8e8e', display: 'block', marginBottom: '6px' }}>Razorpay Payment Link (India)</label>
                    <input
                      type="text"
                      value={launchpadForm.url}
                      onChange={e => setLaunchpadForm(prev => ({ ...prev, url: e.target.value }))}
                      style={{ width: '100%', background: '#0D0D0D', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '12px', color: '#fff' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '12.5px', color: '#8e8e8e', display: 'block', marginBottom: '6px' }}>Global Payment Link (USD Checkout)</label>
                    <input
                      type="text"
                      value={launchpadForm.globalUrl}
                      onChange={e => setLaunchpadForm(prev => ({ ...prev, globalUrl: e.target.value }))}
                      style={{ width: '100%', background: '#0D0D0D', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '12px', color: '#fff' }}
                    />
                  </div>
                </div>

                <button
                  onClick={() => saveProduct('launchpad', launchpadForm)}
                  className="btn-gold"
                  style={{ fontSize: '13.5px', padding: '12px 24px', borderRadius: '8px' }}
                >
                  Save Changes
                </button>
              </div>

              {/* Product 2: Creator Vault */}
              <div style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '28px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
                  <h3 className="font-bebas" style={{ fontSize: '28px', color: '#ffffff', margin: 0 }}>
                    💎 CREATOR VAULT
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '13px', color: '#8E8E8E' }}>Product Status:</span>
                    <button
                      onClick={() => setCreatorForm(prev => ({ ...prev, enabled: !prev.enabled }))}
                      style={{
                        background: creatorForm.enabled ? '#22c55e' : 'rgba(255,255,255,0.1)',
                        color: creatorForm.enabled ? '#050505' : '#8E8E8E',
                        border: 'none',
                        padding: '6px 14px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '12.5px',
                        fontWeight: 700
                      }}
                    >
                      {creatorForm.enabled ? 'ACTIVE / SHOW' : 'HIDDEN / OFF'}
                    </button>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '20px' }}>
                  <div>
                    <label style={{ fontSize: '12.5px', color: '#8e8e8e', display: 'block', marginBottom: '6px' }}>Price (INR)</label>
                    <input
                      type="number"
                      value={creatorForm.price}
                      onChange={e => setCreatorForm(prev => ({ ...prev, price: e.target.value }))}
                      style={{ width: '100%', background: '#0D0D0D', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '12px', color: '#fff' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '12.5px', color: '#8e8e8e', display: 'block', marginBottom: '6px' }}>Original Price (INR)</label>
                    <input
                      type="number"
                      value={creatorForm.originalPrice}
                      onChange={e => setCreatorForm(prev => ({ ...prev, originalPrice: e.target.value }))}
                      style={{ width: '100%', background: '#0D0D0D', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '12px', color: '#fff' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
                  <div>
                    <label style={{ fontSize: '12.5px', color: '#8e8e8e', display: 'block', marginBottom: '6px' }}>Razorpay Payment Link</label>
                    <input
                      type="text"
                      value={creatorForm.url}
                      onChange={e => setCreatorForm(prev => ({ ...prev, url: e.target.value }))}
                      style={{ width: '100%', background: '#0D0D0D', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '12px', color: '#fff' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '12.5px', color: '#8e8e8e', display: 'block', marginBottom: '6px' }}>Google Drive Asset Folder Link</label>
                    <input
                      type="text"
                      value={creatorForm.driveUrl}
                      onChange={e => setCreatorForm(prev => ({ ...prev, driveUrl: e.target.value }))}
                      style={{ width: '100%', background: '#0D0D0D', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '12px', color: '#fff' }}
                    />
                  </div>
                </div>

                <button
                  onClick={() => saveProduct('creatorVault', creatorForm)}
                  className="btn-gold"
                  style={{ fontSize: '13.5px', padding: '12px 24px', borderRadius: '8px' }}
                >
                  Save Changes
                </button>
              </div>

              {/* Product 3: Full Vault */}
              <div style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '28px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
                  <h3 className="font-bebas" style={{ fontSize: '28px', color: '#ffffff', margin: 0 }}>
                    👑 FULL VAULT
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '13px', color: '#8E8E8E' }}>Product Status:</span>
                    <button
                      onClick={() => setFullForm(prev => ({ ...prev, enabled: !prev.enabled }))}
                      style={{
                        background: fullForm.enabled ? '#22c55e' : 'rgba(255,255,255,0.1)',
                        color: fullForm.enabled ? '#050505' : '#8E8E8E',
                        border: 'none',
                        padding: '6px 14px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '12.5px',
                        fontWeight: 700
                      }}
                    >
                      {fullForm.enabled ? 'ACTIVE / SHOW' : 'HIDDEN / OFF'}
                    </button>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '20px' }}>
                  <div>
                    <label style={{ fontSize: '12.5px', color: '#8e8e8e', display: 'block', marginBottom: '6px' }}>Price (INR)</label>
                    <input
                      type="number"
                      value={fullForm.price}
                      onChange={e => setFullForm(prev => ({ ...prev, price: e.target.value }))}
                      style={{ width: '100%', background: '#0D0D0D', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '12px', color: '#fff' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '12.5px', color: '#8e8e8e', display: 'block', marginBottom: '6px' }}>Original Price (INR)</label>
                    <input
                      type="number"
                      value={fullForm.originalPrice}
                      onChange={e => setFullForm(prev => ({ ...prev, originalPrice: e.target.value }))}
                      style={{ width: '100%', background: '#0D0D0D', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '12px', color: '#fff' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
                  <div>
                    <label style={{ fontSize: '12.5px', color: '#8e8e8e', display: 'block', marginBottom: '6px' }}>Razorpay Payment Link</label>
                    <input
                      type="text"
                      value={fullForm.url}
                      onChange={e => setFullForm(prev => ({ ...prev, url: e.target.value }))}
                      style={{ width: '100%', background: '#0D0D0D', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '12px', color: '#fff' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '12.5px', color: '#8e8e8e', display: 'block', marginBottom: '6px' }}>Google Drive Asset Folder Link</label>
                    <input
                      type="text"
                      value={fullForm.driveUrl}
                      onChange={e => setFullForm(prev => ({ ...prev, driveUrl: e.target.value }))}
                      style={{ width: '100%', background: '#0D0D0D', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '12px', color: '#fff' }}
                    />
                  </div>
                </div>

                <button
                  onClick={() => saveProduct('fullVault', fullForm)}
                  className="btn-gold"
                  style={{ fontSize: '13.5px', padding: '12px 24px', borderRadius: '8px' }}
                >
                  Save Changes
                </button>
              </div>

            </div>
          )}

          {/* TAB 2: GLOBAL SETTINGS */}
          {activeTab === 'settings' && (
            <div style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '32px' }}>
              <h3 className="font-bebas" style={{ fontSize: '28px', color: '#D4AF37', marginBottom: '24px' }}>
                ⚙ GLOBAL WEBSITE CONFIGURATIONS
              </h3>

              <form onSubmit={saveSettings} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <label style={{ fontSize: '13px', color: '#8E8E8E', display: 'block', marginBottom: '8px' }}>Discord Server Invite URL</label>
                  <input
                    type="text"
                    value={globalForm.discord}
                    onChange={e => setGlobalForm(prev => ({ ...prev, discord: e.target.value }))}
                    style={{ width: '100%', background: '#0D0D0D', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '14px', color: '#fff' }}
                  />
                </div>
                
                <div>
                  <label style={{ fontSize: '13px', color: '#8E8E8E', display: 'block', marginBottom: '8px' }}>Support Email Address</label>
                  <input
                    type="email"
                    value={globalForm.supportEmail}
                    onChange={e => setGlobalForm(prev => ({ ...prev, supportEmail: e.target.value }))}
                    style={{ width: '100%', background: '#0D0D0D', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '14px', color: '#fff' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '13px', color: '#8E8E8E', display: 'block', marginBottom: '8px' }}>Instagram Link</label>
                  <input
                    type="text"
                    value={globalForm.instagram}
                    onChange={e => setGlobalForm(prev => ({ ...prev, instagram: e.target.value }))}
                    style={{ width: '100%', background: '#0D0D0D', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '14px', color: '#fff' }}
                  />
                </div>

                <button
                  type="submit"
                  className="btn-gold"
                  style={{ width: 'fit-content', fontSize: '13.5px', padding: '12px 32px', borderRadius: '8px', marginTop: '12px' }}
                >
                  Save Global Config
                </button>
              </form>
            </div>
          )}

          {/* TAB 3: ANALYTICS */}
          {activeTab === 'analytics' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              
              {/* Stat Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
                <div style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '24px', textAlign: 'center' }}>
                  <div style={{ fontSize: '13px', color: '#8e8e8e', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Total Visitors</div>
                  <div className="font-bebas" style={{ fontSize: '48px', color: '#fff' }}>{analytics.visitors || 0}</div>
                </div>
                <div style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '24px', textAlign: 'center' }}>
                  <div style={{ fontSize: '13px', color: '#8e8e8e', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Sales Count</div>
                  <div className="font-bebas" style={{ fontSize: '48px', color: '#D4AF37' }}>{analytics.salesCount || 0}</div>
                </div>
                <div style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '24px', textAlign: 'center' }}>
                  <div style={{ fontSize: '13px', color: '#8e8e8e', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Total Revenue</div>
                  <div className="font-bebas" style={{ fontSize: '48px', color: '#22c55e' }}>₹{(analytics.revenue || 0).toLocaleString('en-IN')}</div>
                </div>
              </div>

              {/* Recharts / Glassmorphic Custom Visual Chart */}
              <div style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '32px' }}>
                <h4 style={{ margin: '0 0 20px', fontFamily: 'Poppins, sans-serif', fontSize: '16px', fontWeight: 600, color: '#D4AF37' }}>
                  Sales Performance Trend (Simulation)
                </h4>
                
                {/* Visual Chart Bars using simple CSS grid */}
                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '200px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '12px', gap: '8px' }}>
                  {[
                    { label: 'Week 1', sales: 12 },
                    { label: 'Week 2', sales: 25 },
                    { label: 'Week 3', sales: 18 },
                    { label: 'Week 4', sales: 40 },
                    { label: 'Week 5', sales: 30 },
                    { label: 'Week 6', sales: 55 },
                    { label: 'Current', sales: (analytics.salesCount % 60) || 45 }
                  ].map((d, i) => (
                    <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                      <span style={{ fontSize: '11px', color: '#22c55e', marginBottom: '4px' }}>{d.sales}</span>
                      <div style={{
                        width: '100%',
                        maxWidth: '32px',
                        height: `${d.sales * 3}px`,
                        background: i === 6 ? 'linear-gradient(180deg, #D4AF37, rgba(212,175,55,0.1))' : 'linear-gradient(180deg, #22c55e, rgba(34,197,94,0.1))',
                        borderRadius: '4px 4px 0 0',
                        boxShadow: '0 0 10px rgba(212,175,55,0.1)'
                      }} />
                      <span style={{ fontSize: '10px', color: '#8e8e8e', marginTop: '8px' }}>{d.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Developer Simulations Helpers */}
              <div style={{ background: 'rgba(255, 255, 255, 0.01)', border: '1px dashed rgba(212,175,55,0.3)', borderRadius: '16px', padding: '28px' }}>
                <h4 style={{ margin: '0 0 12px', fontSize: '15px', color: '#D4AF37' }}>⚙ Developer Dashboard Testing Simulator</h4>
                <p style={{ color: '#8E8E8E', fontSize: '13.5px', margin: '0 0 20px', lineHeight: 1.5 }}>
                  Click these buttons to test the real-time websocket database updates. The public pages will update immediately in the background without needing a refresh.
                </p>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <button onClick={() => handleSimulateSale(699)} className="btn-outline" style={{ fontSize: '12.5px', padding: '10px 16px', borderColor: 'rgba(212,175,55,0.3)' }}>
                    Simulate Creator Vault Sale (+₹699)
                  </button>
                  <button onClick={() => handleSimulateSale(999)} className="btn-outline" style={{ fontSize: '12.5px', padding: '10px 16px', borderColor: 'rgba(212,175,55,0.3)' }}>
                    Simulate Full Vault Sale (+₹999)
                  </button>
                  <button onClick={() => handleSimulateSale(1299)} className="btn-outline" style={{ fontSize: '12.5px', padding: '10px 16px', borderColor: 'rgba(212,175,55,0.3)' }}>
                    Simulate Launchpad Sale (+₹1,299)
                  </button>
                  <button
                    onClick={() => updateAnalytics({ visitors: (analytics.visitors || 0) + 100 })}
                    className="btn-outline"
                    style={{ fontSize: '12.5px', padding: '10px 16px', borderColor: 'rgba(212,175,55,0.3)' }}
                  >
                    Simulate +100 Visitors
                  </button>
                </div>
              </div>

            </div>
          )}



        </div>

      </main>

      <Footer />
    </div>
  );
}
