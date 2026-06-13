// src/lib/firebase.js
import { PRODUCTS, GLOBAL_CONFIG } from '@/config/products';

// Read config from Vite env
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

import { initializeApp, getApps } from 'firebase/app';

const isFirebaseConfigured = !!(
  firebaseConfig.apiKey &&
  firebaseConfig.projectId
);

if (typeof window !== 'undefined') {
  if (isFirebaseConfigured) {
    console.log("🔥 [Firebase] Configuration detected! Connecting to live Firestore/Auth database.");
  } else {
    console.warn("⚠️ [Firebase] No credentials found. Running in local Mock Mode (LocalStorage).");
  }
}

// Initialize Firebase App
if (isFirebaseConfigured && getApps().length === 0) {
  initializeApp(firebaseConfig);
}

let realFirebase = null;

// Mock database default seed data
const DEFAULT_PRODUCTS = {
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
};

const DEFAULT_GLOBAL = {
  discord: GLOBAL_CONFIG.discord,
  supportEmail: GLOBAL_CONFIG.supportEmail,
  instagram: GLOBAL_CONFIG.instagram
};

const DEFAULT_ANALYTICS = {
  visitors: 1824,
  salesCount: 148,
  revenue: 144552,
  proofScreenshots: [
    { id: '1', src: 'https://d1yei2z3i6k35z.cloudfront.net/11609799/68f51a2a09b04_5-min.webp', alt: 'Instagram 3M Views Proof' },
    { id: '2', src: 'https://d1yei2z3i6k35z.cloudfront.net/11609799/68f51a2a09b04_5-min.webp', alt: 'Gumroad Earnings' }
  ]
};

// --- MOCK FIREBASE IMPLEMENTATION ---
class MockAuth {
  constructor() {
    this.listeners = [];
    this.currentUser = JSON.parse(localStorage.getItem('luxverse_logged_in_user') || 'null');
  }

  async signInWithEmailAndPassword(email, password) {
    if (!email || !password) {
      throw new Error('auth/invalid-email-or-password');
    }
    
    // Retrieve registered admin account, or register the first user who tries to log in
    let registeredAdmin = JSON.parse(localStorage.getItem('luxverse_admin_account') || 'null');
    
    if (!registeredAdmin) {
      // Register this user as the first admin account
      registeredAdmin = { email, password };
      localStorage.setItem('luxverse_admin_account', JSON.stringify(registeredAdmin));
      console.log(`[Mock Auth] Registered ${email} as the first admin account.`);
    }

    if (registeredAdmin.email === email && registeredAdmin.password === password) {
      const user = { email, uid: 'mock-admin-uid' };
      this.currentUser = user;
      localStorage.setItem('luxverse_logged_in_user', JSON.stringify(user));
      this._triggerListeners();
      return { user };
    } else {
      throw new Error('auth/wrong-password');
    }
  }

  async signOut() {
    this.currentUser = null;
    localStorage.removeItem('luxverse_logged_in_user');
    this._triggerListeners();
  }

  onAuthStateChanged(callback) {
    this.listeners.push(callback);
    // Initial call
    callback(this.currentUser);
    return () => {
      this.listeners = this.listeners.filter(l => l !== callback);
    };
  }

  _triggerListeners() {
    this.listeners.forEach(l => l(this.currentUser));
  }
}

class MockFirestore {
  constructor() {
    this.listeners = {};
    
    // Seed initial data if empty
    if (!localStorage.getItem('luxverse_db_products')) {
      localStorage.setItem('luxverse_db_products', JSON.stringify(DEFAULT_PRODUCTS));
    }
    if (!localStorage.getItem('luxverse_db_global')) {
      localStorage.setItem('luxverse_db_global', JSON.stringify(DEFAULT_GLOBAL));
    }
    if (!localStorage.getItem('luxverse_db_analytics')) {
      localStorage.setItem('luxverse_db_analytics', JSON.stringify(DEFAULT_ANALYTICS));
    }

    // Listen for storage events (enables instant cross-tab real-time updates in Mock Mode)
    if (typeof window !== 'undefined') {
      window.addEventListener('storage', (event) => {
        if (event.key && event.key.startsWith('luxverse_db_')) {
          const collectionName = event.key.replace('luxverse_db_', '');
          this._notify(collectionName);
        }
      });
    }
  }

  _getData(collectionName) {
    return JSON.parse(localStorage.getItem(`luxverse_db_${collectionName}`) || '{}');
  }

  _setData(collectionName, data) {
    localStorage.setItem(`luxverse_db_${collectionName}`, JSON.stringify(data));
    this._notify(collectionName);
  }

  _notify(collectionName) {
    const channel = collectionName;
    if (this.listeners[channel]) {
      this.listeners[channel].forEach(callback => {
        callback(this._getSnapshot(collectionName));
      });
    }
  }

  _getSnapshot(collectionName) {
    const data = this._getData(collectionName);
    return {
      exists: () => true,
      data: () => data,
      id: collectionName,
      // For collection queries
      docs: Object.keys(data).map(key => ({
        id: key,
        data: () => data[key],
        exists: () => true
      }))
    };
  }

  subscribe(collectionName, callback) {
    if (!this.listeners[collectionName]) {
      this.listeners[collectionName] = [];
    }
    this.listeners[collectionName].push(callback);
    // Trigger initially
    callback(this._getSnapshot(collectionName));
    
    return () => {
      this.listeners[collectionName] = this.listeners[collectionName].filter(l => l !== callback);
    };
  }

  updateDocument(collectionName, docId, updates) {
    const data = this._getData(collectionName);
    if (docId) {
      data[docId] = { ...data[docId], ...updates };
    } else {
      Object.assign(data, updates);
    }
    this._setData(collectionName, data);
  }
}

// Global mock instances
const mockAuthInstance = new MockAuth();
const mockDbInstance = new MockFirestore();

// --- EXPORTED ADAPTER FUNCTIONS ---
export const auth = {
  signInWithEmailAndPassword: async (email, password) => {
    if (isFirebaseConfigured) {
      const { signInWithEmailAndPassword: realSignIn, createUserWithEmailAndPassword } = await import('firebase/auth');
      const { getAuth } = await import('firebase/auth');
      const authInstance = getAuth();
      try {
        return await realSignIn(authInstance, email, password);
      } catch (err) {
        // If the user does not exist, attempt to create them (acts as auto-onboarding/auto-registration)
        if (err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') {
          try {
            return await createUserWithEmailAndPassword(authInstance, email, password);
          } catch (createErr) {
            if (createErr.code === 'auth/email-already-in-use') {
              // The email is already registered, meaning the sign-in failed due to an incorrect password
              throw err;
            }
            // For other errors (like weak password, invalid email, etc.), throw the creation error
            throw createErr;
          }
        }
        throw err;
      }
    } else {
      return mockAuthInstance.signInWithEmailAndPassword(email, password);
    }
  },
  signOut: async () => {
    if (isFirebaseConfigured) {
      const { signOut: realSignOut } = await import('firebase/auth');
      const { getAuth } = await import('firebase/auth');
      return realSignOut(getAuth());
    } else {
      return mockAuthInstance.signOut();
    }
  },
  onAuthStateChanged: (callback) => {
    if (isFirebaseConfigured) {
      let unsubscribed = false;
      let realUnsubscribe = null;
      import('firebase/auth').then(({ getAuth, onAuthStateChanged: realOnAuthChange }) => {
        if (unsubscribed) return;
        realUnsubscribe = realOnAuthChange(getAuth(), callback);
      }).catch(err => console.error("Error setting up auth state listener", err));
      return () => {
        unsubscribed = true;
        if (realUnsubscribe) realUnsubscribe();
      };
    } else {
      return mockAuthInstance.onAuthStateChanged(callback);
    }
  }
};

export const db = {
  subscribeToDoc: (collectionName, docId, callback) => {
    if (isFirebaseConfigured) {
      let unsubscribed = false;
      let realUnsubscribe = null;
      Promise.all([
        import('firebase/firestore'),
        import('firebase/app')
      ]).then(([{ getFirestore, doc, onSnapshot, setDoc }]) => {
        if (unsubscribed) return;
        const firestore = getFirestore();
        const docRef = doc(firestore, collectionName, docId);
        realUnsubscribe = onSnapshot(docRef, (docSnap) => {
          if (docSnap.exists()) {
            callback(docSnap.data());
          } else {
            // Document doesn't exist, seed it with defaults
            let seedVal = null;
            if (collectionName === 'products') seedVal = DEFAULT_PRODUCTS[docId];
            if (collectionName === 'settings' && docId === 'global') seedVal = DEFAULT_GLOBAL;
            if (collectionName === 'analytics' && docId === 'stats') seedVal = DEFAULT_ANALYTICS;
            
            if (seedVal) {
              setDoc(docRef, seedVal).then(() => callback(seedVal));
            }
          }
        }, (error) => {
          console.error(`Firestore subscribeToDoc error for ${collectionName}/${docId}:`, error);
        });
      });
      return () => {
        unsubscribed = true;
        if (realUnsubscribe) realUnsubscribe();
      };
    } else {
      return mockDbInstance.subscribe(collectionName, (snap) => {
        const fullData = snap.data();
        callback(docId ? fullData[docId] : fullData);
      });
    }
  },

  subscribeToCollection: (collectionName, callback) => {
    if (isFirebaseConfigured) {
      let unsubscribed = false;
      let realUnsubscribe = null;
      Promise.all([
        import('firebase/firestore'),
        import('firebase/app')
      ]).then(([{ getFirestore, collection, onSnapshot }]) => {
        if (unsubscribed) return;
        const firestore = getFirestore();
        const colRef = collection(firestore, collectionName);
        realUnsubscribe = onSnapshot(colRef, (colSnap) => {
          const list = colSnap.docs.map(d => ({ id: d.id, ...d.data() }));
          callback(list);
        }, (error) => {
          console.error(`Firestore subscribeToCollection error for ${collectionName}:`, error);
        });
      });
      return () => {
        unsubscribed = true;
        if (realUnsubscribe) realUnsubscribe();
      };
    } else {
      return mockDbInstance.subscribe(collectionName, (snap) => {
        const fullData = snap.data();
        const list = Object.keys(fullData).map(key => ({ id: key, ...fullData[key] }));
        callback(list);
      });
    }
  },

  updateDoc: async (collectionName, docId, updates) => {
    if (isFirebaseConfigured) {
      const { getFirestore, doc, setDoc } = await import('firebase/firestore');
      const firestore = getFirestore();
      const docRef = doc(firestore, collectionName, docId);
      await setDoc(docRef, updates, { merge: true });
    } else {
      mockDbInstance.updateDocument(collectionName, docId, updates);
    }
  },

  uploadFile: async (path, file) => {
    if (isFirebaseConfigured) {
      const { getStorage, ref, uploadBytes, getDownloadURL } = await import('firebase/storage');
      const storage = getStorage();
      const storageRef = ref(storage, path);
      await uploadBytes(storageRef, file);
      return await getDownloadURL(storageRef);
    } else {
      // Mock mode: read file as Base64 data URL
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = (err) => reject(err);
        reader.readAsDataURL(file);
      });
    }
  }
};

export { isFirebaseConfigured };
