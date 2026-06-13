// src/config/DbContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { PRODUCTS, GLOBAL_CONFIG } from '@/config/products';

const DbContext = createContext();

export const DbProvider = ({ children }) => {
  const [products, setProducts] = useState({
    launchpad: {
      id: 'launchpad',
      name: PRODUCTS.launchpad.name,
      price: 1299,
      originalPrice: 21493,
      globalPrice: 25,
      url: PRODUCTS.launchpad.url,
      globalUrl: PRODUCTS.launchpad.url,
      enabled: true
    },
    creatorVault: {
      id: 'creatorVault',
      name: PRODUCTS.creatorVault.name,
      price: 699,
      originalPrice: 999,
      url: PRODUCTS.creatorVault.url,
      driveUrl: PRODUCTS.creatorVault.driveUrl,
      enabled: true
    },
    fullVault: {
      id: 'fullVault',
      name: PRODUCTS.fullVault.name,
      price: 999,
      originalPrice: 1499,
      url: PRODUCTS.fullVault.url,
      driveUrl: PRODUCTS.fullVault.driveUrl,
      enabled: true
    }
  });

  const [globalSettings, setGlobalSettings] = useState({
    discord: GLOBAL_CONFIG.discord,
    supportEmail: GLOBAL_CONFIG.supportEmail,
    instagram: GLOBAL_CONFIG.instagram
  });

  const [analytics, setAnalytics] = useState({
    visitors: 1824,
    salesCount: 148,
    revenue: 144552,
    proofScreenshots: []
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Subscribe to products collection
    const unsubProducts = db.subscribeToCollection('products', (list) => {
      if (list && list.length > 0) {
        const prodMap = {};
        list.forEach(p => {
          // support document names launchpad, creatorVault, fullVault
          const key = p.id;
          prodMap[key] = p;
        });
        setProducts(prev => ({ ...prev, ...prodMap }));
      }
    });

    // 2. Subscribe to global settings doc
    const unsubGlobal = db.subscribeToDoc('settings', 'global', (data) => {
      if (data) {
        setGlobalSettings(data);
      }
    });

    // 3. Subscribe to analytics stats doc
    const unsubAnalytics = db.subscribeToDoc('analytics', 'stats', (data) => {
      if (data) {
        setAnalytics(data);
      }
      setLoading(false);
    });

    return () => {
      unsubProducts();
      unsubGlobal();
      unsubAnalytics();
    };
  }, []);

  const updateProduct = async (productId, data) => {
    await db.updateDoc('products', productId, data);
  };

  const updateGlobalSettings = async (data) => {
    await db.updateDoc('settings', 'global', data);
  };

  const updateAnalytics = async (data) => {
    await db.updateDoc('analytics', 'stats', data);
  };

  const trackVisitorLocal = () => {
    // Increment visitors local analytics tracking
    const key = 'luxverse_visited_session';
    if (!sessionStorage.getItem(key)) {
      sessionStorage.setItem(key, 'true');
      const newVisitors = (analytics.visitors || 0) + 1;
      updateAnalytics({ visitors: newVisitors });
    }
  };

  const trackSaleLocal = (price) => {
    // Simulated track sale
    const newSales = (analytics.salesCount || 0) + 1;
    const newRevenue = (analytics.revenue || 0) + Number(price);
    updateAnalytics({ salesCount: newSales, revenue: newRevenue });
  };

  const uploadFile = async (path, file) => {
    return await db.uploadFile(path, file);
  };

  return (
    <DbContext.Provider
      value={{
        products,
        globalSettings,
        analytics,
        loading,
        updateProduct,
        updateGlobalSettings,
        updateAnalytics,
        uploadFile,
        trackVisitorLocal,
        trackSaleLocal
      }}
    >
      {children}
    </DbContext.Provider>
  );
};

export const useDb = () => {
  const context = useContext(DbContext);
  if (!context) {
    throw new Error('useDb must be used within a DbProvider');
  }
  return context;
};
