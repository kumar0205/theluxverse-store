import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth } from '@/lib/firebase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [authError, setAuthError] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((usr) => {
      setUser(usr);
      setIsAuthenticated(!!usr);
      setAuthChecked(true);
      setIsLoadingAuth(false);
    });
    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    setIsLoadingAuth(true);
    setAuthError(null);
    try {
      const res = await auth.signInWithEmailAndPassword(email, password);
      setUser(res.user);
      setIsAuthenticated(true);
      return res.user;
    } catch (err) {
      setAuthError(err);
      throw err;
    } finally {
      setIsLoadingAuth(false);
    }
  };

  const logout = async () => {
    setIsLoadingAuth(true);
    try {
      await auth.signOut();
      setUser(null);
      setIsAuthenticated(false);
    } catch (err) {
      console.error('Logout error', err);
    } finally {
      setIsLoadingAuth(false);
    }
  };

  const checkUserAuth = async () => {
    // Already tracked in useEffect, no-op or re-evaluate
  };

  const navigateToLogin = () => {
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      isLoadingAuth,
      authError,
      authChecked,
      logout,
      login,
      navigateToLogin,
      checkUserAuth,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

