// src/data/launchpad.js
// All static content for LaunchpadPage — edit here, never in the JSX.

import quickTrainingImg from '@/assets/quick_training.webp';
import assets1mImg from '@/assets/assets_1m.webp';
import trendingProductsImg from '@/assets/trending_products.webp';
import aiCreationHubImg from '@/assets/ai_creation_hub.webp';
import sellingMethodsImg from '@/assets/selling_methods.webp';
import readyMadeStoreImg from '@/assets/ready_made_store.webp';
import privateCommunityImg from '@/assets/private_community.webp';

import reelsPackImg from '@/assets/reelspack.webp';
import ebooksImg from '@/assets/ebooks1.webp';
import coursesImg from '@/assets/1000+courses.webp';
import templatesImg from '@/assets/15k+aitemplates.webp';
import resellRightsImg from '@/assets/resellrights.webp';

import win1Img from '@/assets/win1.webp';
import win2Img from '@/assets/win2.webp';
import win3Img from '@/assets/win3.webp';
import win4Img from '@/assets/win4.webp';
import win5Img from '@/assets/win5.webp';
import win6Img from '@/assets/win6.webp';
import win7Img from '@/assets/win7.webp';
import win8Img from '@/assets/win8.webp';
import win9Vid from '@/assets/win9.mp4';

// ── Timeline tools (What's Inside section) ──
export const TOOLS_DATA = [
  {
    title: "Quick Start Roadmap",
    icon: 'https://d1yei2z3i6k35z.cloudfront.net/11609799/68f51a49c9c1d_8-min.webp',
    image: quickTrainingImg,
    isVideo: false,
    points: [
      "Go from <span class='text-[#D4AF37] font-semibold'>zero setup to live</span> in 14 days",
      "Learn key digital business skills <span class='text-white font-semibold'>step-by-step</span>",
      "Designed for complete beginners starting from <span class='text-white font-semibold'>absolute scratch</span>"
    ]
  },
  {
    title: "Infinite Content Engine",
    icon: 'https://d1yei2z3i6k35z.cloudfront.net/11609799/68f51a1b0d31d_3-min.webp',
    image: "https://d1yei2z3i6k35z.cloudfront.net/11609799/6974c7fe1811c_content.mp4",
    isVideo: true,
    points: [
      "<span class='text-[#D4AF37] font-semibold'>Never run out of content ideas again</span> with 15k+ ready-made reels",
      "Ready-made assets designed for <span class='text-white font-semibold'>fast viral reach</span>",
      "Build a massive faceless following <span class='text-white font-semibold'>without showing your face</span>"
    ]
  },
  {
    title: "Instant Digital Product Vault",
    icon: 'https://d1yei2z3i6k35z.cloudfront.net/11609799/68f51a21e215c_4-min.webp',
    image: assets1mImg,
    isVideo: false,
    points: [
      "Unlock over <span class='text-[#D4AF37] font-semibold'>1 Million+ Done-For-You digital products</span>",
      "Includes 1,000+ courses to <span class='text-white font-semibold'>launch professional designs in minutes</span>",
      "Full Resell Rights — sell them as your own and keep <span class='text-[#D4AF37] font-semibold'>100% of the revenue</span>"
    ]
  },
  {
    title: "Trending Product Alerts",
    icon: 'https://d1yei2z3i6k35z.cloudfront.net/11609799/68f51a0268c94_1-min.webp',
    image: trendingProductsImg,
    isVideo: false,
    points: [
      "Get access to <span class='text-[#D4AF37] font-semibold'>high-demand, pre-researched</span> products that sell",
      "Ready-to-use landing pages, scripts, and <span class='text-white font-semibold'>organic ad creatives</span>",
      "Step-by-step training to launch these products for <span class='text-white font-semibold'>free</span>"
    ]
  },
  {
    title: "AI Business Automation Hub",
    icon: 'https://d1yei2z3i6k35z.cloudfront.net/11609799/68f51a52c891e_9-min.webp',
    image: aiCreationHubImg,
    isVideo: false,
    points: [
      "Automate your busywork using battle-tested <span class='text-[#D4AF37] font-semibold'>AI tools</span>",
      "Generate custom digital products using AI in <span class='text-white font-semibold'>minutes</span>",
      "Save hours of labor and hit your market <span class='text-white font-semibold'>faster</span>"
    ]
  },
  {
    title: "Passive Traffic System",
    icon: 'https://d1yei2z3i6k35z.cloudfront.net/11609799/68f51a5cbde0f_10-min.webp',
    image: sellingMethodsImg,
    isVideo: false,
    points: [
      "Plug-and-play organic strategies requiring <span class='text-[#D4AF37] font-semibold'>zero ad spend</span>",
      "Drive free AI traffic and viral views <span class='text-white font-semibold'>consistently</span>",
      "Launch checklists that get you results <span class='text-white font-semibold'>rapidly</span>"
    ]
  },
  {
    title: "Free Digital Shop Setup",
    icon: 'https://d1yei2z3i6k35z.cloudfront.net/11609799/68f51a136839b_2-min.webp',
    image: readyMadeStoreImg,
    isVideo: false,
    points: [
      "Create your store with no coding, no paid hosting, and <span class='text-[#D4AF37] font-semibold'>no domains</span>",
      "Step-by-step setup guides to start selling <span class='text-white font-semibold'>immediately</span>",
      "Avoid spending thousands on expensive web developers"
    ]
  },
  {
    title: "Founders Circle Support",
    icon: 'https://d1yei2z3i6k35z.cloudfront.net/11609799/68f51a3b5f794_7-min.webp',
    image: privateCommunityImg,
    isVideo: false,
    points: [
      "Connect with <span class='text-[#D4AF37] font-semibold'>thousands of digital builders</span>",
      "Get unstuck instantly by asking questions <span class='text-white font-semibold'>directly to creators</span>",
      "Celebrate your daily wins and scale together"
    ]
  }
];

// ── Value stack (Total value breakdown) ──
export const VALUE_ITEMS = [
  { name: '14 Day Challenge Roadmap', val: 1499 },
  { name: 'Quick Launch Training', val: 2999 },
  { name: 'Digital Product Formula', val: 2499 },
  { name: 'AI Product Creation Hub', val: 1999 },
  { name: 'Selling Methods Hub', val: 1499 },
  { name: '1M+ Premium Products', val: 4999 },
  { name: 'Ready-made Store', val: 1999 },
  { name: 'Content Library (15K reels)', val: 3999 },
  { name: 'List of 500 Profitable Non-Expert Digital Products', val: 'Priceless', isPriceless: true },
  { name: 'Trending Products Community', val: 'Priceless', isPriceless: true },
  { name: 'Advanced Sales Training', val: 'Priceless', isPriceless: true },
  { name: 'Free Promotional Giveaways', val: 'Priceless', isPriceless: true }
];

// ── Pricing card feature breakdown (Final CTA section) ──
export const PRICING_FEATURES = [
  { name: '14 Day Challenge Roadmap', price: 1499 },
  { name: 'Quick Launch Training', price: 2999 },
  { name: 'Digital Product Formula', price: 2499 },
  { name: 'AI Product Creation Hub', price: 1999 },
  { name: 'Selling Methods Hub', price: 1499 },
  { name: '1M+ Premium Products Vault', price: 4999 },
  { name: 'Ready-made Store Setup', price: 1999 },
  { name: 'Content Library (15K Reels)', price: 3999 },
  { name: 'Private Founders Community', price: null },
];

// ── FAQ section ──
export const FAQ_ITEMS = [
  {
    q: "Can I start for $0?",
    a: "<strong>Yes.</strong> Once you have the system, you don't need to spend another rupee. No paid software, no hosting fees, and no ad budget. Everything can be set up using free tools."
  },
  {
    q: "How fast can I see results?",
    a: "Some see results in <strong>week 1</strong>. Some take 30 days. Some quit on day 3. <strong>The system works.</strong> Which one you'll be is up to you."
  },
  {
    q: "Do I need to show my face?",
    a: "<strong>Never.</strong><br />Everything inside is built for 100% faceless."
  },
  {
    q: "I'm a complete beginner — can I still do this?",
    a: "<strong>Yes.</strong><br />Most people started with zero experience. The step-by-step training takes you from zero to advanced level. If you can scroll reels, you can do this."
  },
  {
    q: "I don't have much time — does this still work?",
    a: "Set everything up in minutes. Post the content. Watch the sales roll in. No team. No inventory. No filming. Just <strong>30-60 minutes a day</strong> on your phone — fits around your job, classes, or whatever else you've got going on."
  },
  {
    q: "If this system really works, why doesn't everybody do it?",
    a: "The gym works too. But look around."
  }
];

// ── Pain points (checkbox section) ──
export const PAIN_POINTS = [
  "I scroll Instagram daily watching others earn — while I'm stuck doing nothing",
  "I've thought about selling online but have no idea where to start",
  "I don't want to show my face or film any videos",
  "I have no product to sell and no time to create one",
  "I want to earn extra income but don't know how to start"
];

// ── Product preview cards (Visual Preview section) ──
export const PRODUCT_PREVIEWS = [
  { title: '15k+ Ready-Made Reels', desc: 'Saves hundreds of hours searching for clips and shooting videos. Just download, post daily, and grow your audience.', img: reelsPackImg },
  { title: '1,000+ Premium Courses', desc: 'Skip years of trial and error. Learn high-income skills directly or resell them to build your brand instantly.', img: coursesImg },
  { title: '15k+ Ai Agent Templates', desc: 'Eliminates the need for expensive developers. Get plug-and-play templates to build and deploy systems in minutes.', img: templatesImg },
  { title: 'Done-For-You Ebooks Library', desc: 'Zero writing or formatting required. Premium ebooks ready to customize and sell as lead magnets or paid products.', img: ebooksImg },
  { title: '1M+ Products With Resell Rights', desc: 'Saves months of product development. Instantly launch high-demand products, keep 100% of profits, and resell forever.', img: resellRightsImg }
];

// ── Member Wins carousel slides ──
export const WIN_SLIDES = [
  { type: 'image', src: win1Img },
  { type: 'image', src: win2Img },
  { type: 'image', src: win3Img },
  { type: 'image', src: win4Img },
  { type: 'image', src: win5Img },
  { type: 'image', src: win6Img },
  { type: 'image', src: win7Img },
  { type: 'image', src: win8Img },
  { type: 'video', src: win9Vid }
];
