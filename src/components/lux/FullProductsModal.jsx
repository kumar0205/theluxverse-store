import React, { useState, useEffect } from 'react';

const CATALOG_DATA = [
  {
    tab: '1000+ Courses',
    sections: [
      {
        title: '💼 Business & Entrepreneurship',
        items: [
          'Digital Product School', 'Wealth Growth Framework', 'Business Foundations Blueprint', 'Authority Blog Advantage',
          'Business Growth Mastery', 'Online Business Foundations', 'Dropshipping Foundations', 'Amazon Affiliate Foundations',
          'Affiliate Marketing Action Plan', 'Email List Building Guide', 'High-Value Sales Framework', 'How to Start a Freelance Business',
          'Product Launch Framework', 'Sales Funnel Strategy', 'Scaling Your Business', 'Side Hustle Framework',
          'Social Media Marketing Blueprint', 'Start an Online Coaching Business', '+ Many More...'
        ]
      },
      {
        title: '📈 Marketing & Sales',
        items: [
          'Facebook Ads Fundamentals', 'Instagram Ads Framework', 'LinkedIn Marketing Blueprint', 'Email Marketing Success',
          'Niche Marketing Framework', 'List Building Strategy Kit', 'Modern Vlogging Guide', 'Modern Podcasting Blueprint',
          'Affiliate Platform Marketing Guide', 'Facebook Retargeting Strategy', 'High-Converting Sales Funnels', 'Internet Marketing Essentials',
          'YouTube Growth Blueprint', 'Fiverr Freelancing Guide', '+ Many More...'
        ]
      },
      {
        title: '🧠 Self-Development & Mindset',
        items: [
          'Resilient Mindset Training', 'Positive Thinking Framework', 'Mindfulness Mastery', 'Managing Stress Effectively',
          'Optimistic Living Guide', 'Productivity for Procrastinators', 'The Growth Mindset', 'The Power of Focus',
          'Planning for Success', 'Goal Setting Framework', 'Reducing Everyday Worry', 'Personal Growth Mastery',
          'The Meaningful Life', 'Self-Discipline Framework', '+ Many More...'
        ]
      },
      {
        title: '🤖 Technology & AI',
        items: [
          'Artificial Intelligence in Digital Marketing', 'Blockchain Technology Explained', 'AI for Entrepreneurs', 'Lead Generation Systems',
          'Internet Business Models', 'Ecommerce with WooCommerce', 'Website Speed Optimization', '+ Many More...'
        ]
      },
      {
        title: '🏋️ Fitness',
        items: [
          'Absolute Yoga', 'Keto Lifestyle Guide', 'Intermittent Fasting Basics', 'Clean Eating Framework',
          'HIIT Training Guide', 'Home Workout Manual', 'Functional Strength Training', 'Juicing for Wellness',
          'Muscle Building Fundamentals', 'Running Training Guide', 'Healthy Aging Habits', 'Sleep Improvement Strategies',
          'Meditation for Busy People', 'Better Sleep Practices', '+ Many More...'
        ]
      },
      {
        title: '⏱️ Productivity & Time Management',
        items: [
          'Get More Done in Less Time', 'The Organized Mind', 'Productivity Systems', 'Reclaim Your Time',
          'Time Management for Entrepreneurs', 'Getting Things Done', 'Motivation Framework', 'The Power of Execution', '+ Many More...'
        ]
      },
      {
        title: '❤️ Lifestyle',
        items: [
          'The Minimalist Lifestyle', 'Freedom in Forgiveness', 'The Art of Meditation', 'Happiness Starts with You',
          'The Attitude of Gratitude', 'Freedom Creation Blueprint', 'Disconnect to Reconnect', 'The Power of Mindfulness', '+ Many More...'
        ]
      }
    ]
  },
  {
    tab: '1 Million+ Digital Products',
    sections: [
      {
        title: '💎 Core Digital Power Packs',
        items: [
          'Mega Editing & Graphics Pack', 'Website Themes', 'Landing Pages', 'Shopify Themes',
          'ChatGPT Prompts Pack', 'YouTube Faceless Automation Blueprint'
        ]
      },
      {
        title: '📘 High-Demand Ebooks',
        items: [
          'How To Start An Online Coaching Business', 'Writing & Publishing Foundations', 'High-Value Client Sales Framework', 'Fiverr Freelancing Guide',
          'Influencer Growth Guide', 'Build Your Unique Online Brand', 'Affiliate Marketing for Beginners', 'Dropshipping Foundations',
          'Facebook Marketing Guide', 'Email Marketing Influence', 'Chatbot Marketing Framework', 'Copywriting Fundamentals',
          'Content Strategy Hacks', 'Guide to Online Freelancing', 'Entrepreneurial Thinking Guide', 'Getting Started with Chatbots',
          'Traffic Growth Strategies', 'Hashtag Traffic Guide', 'Google AdSense Basics Guide', 'Google Traffic Fundamentals',
          'Viral Content Framework', 'Digital Business Foundations', 'Digital Product School', 'Evergreen Online Systems', '+ Many More...'
        ]
      },
      {
        title: '🎨 Canva Templates, Notion & Creator Assets',
        items: [
          'Notion Templates', 'Canva Design Crash Course', 'CapCut Editing Workflow Guide', 'Course Creator Collection',
          'AI Ebooks Collection', 'Digital Planners & Journals', 'Viral Content Hooks', 'Social Media Master Planner',
          'Instagram & Social Media Strategy Guide', 'Instagram Templates (Posts + Stories)', 'Faceless Reels Packs', 'Product Mockups for Etsy & Digital Stores',
          'T-Shirt Design Pack', 'UGC Portfolio Kit', 'UGC Pitching Guide', '30-Day UGC Framework',
          'Email Writing Framework', 'Coaching Worksheets', 'Welcome & Goodbye Books', 'Pricing Reference Sheets', 'Wellness Ebooks & Planners'
        ]
      }
    ]
  },
  {
    tab: '15k+ Reels',
    sections: [
      {
        title: '🎞️ Mega 15k+ Viral Reels Vault',
        items: [
          'Luxury Reels', 'Faceless Content Packs', 'Reel Templates', 'Reels That Reach Blueprint'
        ]
      }
    ]
  },
  {
    tab: 'Ready-made Website Products',
    sections: [
      {
        title: '🧠 Premium Courses',
        items: [
          '1000+ Comprehensive Courses Pack', 'Personal Branding Course', 'Business Growth Mastery', 'Wealth Foundations Blueprint',
          'Digital Product Course', 'Dropshipping Foundations Course', 'YouTube Content Course', 'AI Foundations Course',
          'Organic Traffic Strategies Course', 'Affiliate Marketing Course', 'Create Your Own Course', 'Blockchain & Crypto Fundamentals',
          'Ads Strategy Mastery', 'Healthy Digital Habits Guide', 'Understanding the Subconscious Mind', 'Mindset & Visualization Principles'
        ]
      },
      {
        title: '💎 Core Digital Power Packs',
        items: [
          '1M+ Digital Products', 'Video Editing Pack', 'Website Themes', 'Shopify Themes', 'YouTube Automation Framework', 'ChatGPT Prompts Pack'
        ]
      },
      {
        title: '🚀 Digital Product Business Resources',
        items: [
          'Digital Product Mockups', '500+ Digital Product Ideas'
        ]
      },
      {
        title: '📘 Premium E-Books',
        items: [
          'Mega Ebooks Bundle', 'Online Coaching Guide', 'High-Value Client Sales Guide', 'Copywriting Fundamentals',
          'Facebook Marketing Guide', 'Freelancing Foundations', 'Getting Started with Chatbots', 'Entrepreneurial Ideas',
          'Content Strategy Hacks', 'Affiliate Marketing Guide', 'Writing & Publishing Guide', 'Influencer Growth Guide'
        ]
      },
      {
        title: '🎨 Canva Templates, Notion & Creator Assets',
        items: [
          'Canva Templates', 'Instagram Reels', 'Social Media Planner', 'Social Media Strategy Guide', '30-Day UGC Framework',
          'Viral Social Media Hooks', 'T-Shirt Designs', 'UGC Guide', 'Notion Templates', 'Facebook Ads Framework',
          'Course Creator Collection', 'Canva Design Crash Course', 'Planners & Journals', 'Understanding AI', 'Landing Page Templates', 'Luxury Reels Collection'
        ]
      }
    ]
  }
];

export default function FullProductsModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState(0);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Blurred Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div 
        className="relative w-full max-w-5xl max-h-[90vh] bg-[#0A0A0A] border border-[rgba(212,175,55,0.3)] rounded-[24px] shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col transform transition-all duration-300 scale-100"
        style={{ animation: 'modalFadeIn 0.3s ease-out' }}
      >
        <style>{`
          @keyframes modalFadeIn {
            from { opacity: 0; transform: scale(0.95) translateY(20px); }
            to { opacity: 1; transform: scale(1) translateY(0); }
          }
          .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: rgba(0,0,0,0.3);
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(212,175,55,0.3);
            border-radius: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: rgba(212,175,55,0.5);
          }
        `}</style>

        {/* Header */}
        <div className="relative flex flex-col items-center pt-8 pb-4 px-6 border-b border-white/5">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L13 13M1 13L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
          
          <h2 className="text-[28px] md:text-[36px] font-bebas text-[#D4AF37] tracking-wider mb-2">
            Full Products Catalog
          </h2>
          <p className="text-[rgba(255,255,255,0.8)] font-inter text-[13px] md:text-[15px] mb-6">
            Browse categories, tap to jump, and scroll through everything.
          </p>

          {/* Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 w-full">
            {CATALOG_DATA.map((data, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`flex-1 min-w-[140px] px-4 py-3 rounded-xl border transition-all duration-200 flex flex-col items-center justify-center gap-1 ${
                  activeTab === idx 
                    ? 'bg-[rgba(212,175,55,0.1)] border-[rgba(212,175,55,0.5)] text-[#D4AF37]' 
                    : 'bg-black/50 border-white/5 text-[rgba(255,255,255,0.8)] hover:border-white/20 hover:text-white'
                }`}
              >
                <span className="font-poppins font-semibold text-[13px] md:text-[14px] leading-tight text-center">
                  {data.tab}
                </span>
                <span className="font-inter text-[10px] md:text-[11px] opacity-70">
                  tap to view
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-8">
          <div className="columns-1 md:columns-2 gap-8 space-y-8">
            {CATALOG_DATA[activeTab].sections.map((section, sIdx) => (
              <div key={sIdx} className="break-inside-avoid">
                <h3 className="text-white font-poppins font-bold text-[18px] md:text-[20px] mb-4 bg-[#111111] py-2 px-4 rounded-lg inline-block border border-white/5">
                  {section.title}
                </h3>
                <ul className="space-y-3 pl-2">
                  {section.items.map((item, iIdx) => (
                    <li key={iIdx} className="flex items-start text-[14px] md:text-[15px] font-inter text-[#B0B0B0] group">
                      <span className="mr-3 text-[#D4AF37] opacity-60 mt-[6px]">•</span>
                      <span className="group-hover:text-white transition-colors">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        
        {/* Footer Fade */}
        <div className="h-12 bg-gradient-to-t from-[#0A0A0A] to-transparent absolute bottom-0 left-0 right-0 pointer-events-none" />
      </div>
    </div>
  );
}
