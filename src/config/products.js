// src/config/products.js
// Sensitive values are read from environment variables (VITE_ prefix).
// Set them in .env locally and in your Vercel dashboard for production.

export const GLOBAL_CONFIG = {
  instagram: 'https://instagram.com/theluxverse',
  supportEmail: import.meta.env.VITE_SUPPORT_EMAIL || 'theluxverse2@gmail.com',
  addon: 'https://pages.razorpay.com/pl_F1rstSal3Addon/view',
  discord: import.meta.env.VITE_DISCORD_LINK || 'https://discord.com/invite/c7VWchQF7R?2026'
};

export const PRODUCTS = {
  creatorVault: {
    id: 'creator',
    name: 'CREATOR VAULT',
    price: '₹699',
    originalPrice: '₹999',
    url: 'https://pages.razorpay.com/pl_Sza2nPP0wJZMRv/view',
    driveUrl: 'https://drive.google.com/drive/folders/1qn-9_fDNSMkQZyf_DUDrfVemBusfybzA?usp=drive_link',
    tagline: 'Get started with the essential courses & AI templates.',
    badge: 'BASIC',
    features: ['Ebooks Pack', 'Digital Products Bundle', '1000+ Courses', '15K+ AI Agent Templates', 'Resell rights'],
    missNote: 'No 15,000+ Reels',
    highlighted: false
  },

  fullVault: {
    id: 'full',
    name: 'FULL VAULT',
    price: '₹999',
    originalPrice: '₹1499',
    url: 'https://pages.razorpay.com/pl_Szldx0jjvWHHPJ/view',
    driveUrl: 'https://drive.google.com/drive/folders/1f14R0NjJLBc263fWQD0nE0A-Yn287x7u?usp=drive_link',
    tagline: 'Unlock the ultimate goldmine with all content, courses & templates.',
    badge: 'RECOMMENDED',
    features: ['Ebooks Pack', 'Digital Products Bundle', '15,000+ Reels Pack', '1000+ Courses', '15K+ AI Agent Templates', 'Resell rights'],
    missNote: null,
    highlighted: true
  },

  launchpad: {
    id: 'launchpad',
    name: 'LAUNCHPAD',
    price: '₹1,299',
    originalPrice: '₹21,493',
    globalPrice: '$25',
    url: 'https://pages.razorpay.com/pl_SzllHrSVxlCug8/view',
  }
};

export const DELIVERY_STEPS = [
  { icon: '💳', step: '01', title: 'Click Buy', desc: "Hit the button below — you'll land on the secure Razorpay payment page." },
  { icon: '⚡', step: '02', title: 'Complete Payment', desc: 'Pay via UPI, card, or net banking. Takes under 60 seconds.' },
  { icon: '📁', step: '03', title: 'Access Your Vault', desc: 'Instant redirect to your Google Drive link. Download everything immediately.' },
];
