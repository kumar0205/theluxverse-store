import React, { useState } from 'react';
import useFadeUp from '@/hooks/useFadeUp';

const VAULT_CATEGORIES = [
  {
    title: 'Handpicked Premium 1000+ Courses 🎓',
    subtitle: 'Carefully selected from top niches — ready to sell and high-converting',
    subcategories: [
      {
        name: '💼 Business & Entrepreneurship',
        items: ['Digital Product School', 'Wealth Growth Framework', 'Business Foundations Blueprint', 'Authority Blog Advantage', 'Business Growth Mastery', 'Online Business Foundations', 'Dropshipping Foundations', 'Amazon Affiliate Foundations', 'Affiliate Marketing Action Plan', 'Email List Building Guide', 'High-Value Sales Framework', 'How to Start a Freelance Business', 'Product Launch Framework', 'Sales Funnel Strategy', 'Scaling Your Business', 'Side Hustle Framework', 'Social Media Marketing Blueprint', 'Start an Online Coaching Business', '+ Many More...']
      },
      {
        name: '📈 Marketing & Sales',
        items: ['Facebook Ads Fundamentals', 'Instagram Ads Framework', 'LinkedIn Marketing Blueprint', 'Email Marketing Success', 'Niche Marketing Framework', 'List Building Strategy Kit', 'Modern Vlogging Guide', 'Modern Podcasting Blueprint', 'Affiliate Platform Marketing Guide', 'Facebook Retargeting Strategy', 'High-Converting Sales Funnels', 'Internet Marketing Essentials', 'YouTube Growth Blueprint', 'Fiverr Freelancing Guide', '+ Many More...']
      },
      {
        name: '🧠 Self-Development & Mindset',
        items: ['Resilient Mindset Training', 'Positive Thinking Framework', 'Mindfulness Mastery', 'Managing Stress Effectively', 'Optimistic Living Guide', 'Productivity for Procrastinators', 'The Growth Mindset', 'The Power of Focus', 'Planning for Success', 'Goal Setting Framework', 'Reducing Everyday Worry', 'Personal Growth Mastery', 'The Meaningful Life', 'Self-Discipline Framework', '+ Many More...']
      },
      {
        name: '🤖 Technology & AI',
        items: ['Artificial Intelligence in Digital Marketing', 'Blockchain Technology Explained', 'AI for Entrepreneurs', 'Lead Generation Systems', 'Internet Business Models', 'Ecommerce with WooCommerce', 'Website Speed Optimization', '+ Many More...']
      },
      {
        name: '🏋️ Fitness',
        items: ['Absolute Yoga', 'Keto Lifestyle Guide', 'Intermittent Fasting Basics', 'Clean Eating Framework', 'HIIT Training Guide', 'Home Workout Manual', 'Functional Strength Training', 'Juicing for Wellness', 'Muscle Building Fundamentals', 'Running Training Guide', 'Healthy Aging Habits', 'Sleep Improvement Strategies', 'Meditation for Busy People', 'Better Sleep Practices', '+ Many More...']
      },
      {
        name: '⏱️ Productivity & Time Management',
        items: ['Get More Done in Less Time', 'The Organized Mind', 'Productivity Systems', 'Reclaim Your Time', 'Time Management for Entrepreneurs', 'Getting Things Done', 'Motivation Framework', 'The Power of Execution', '+ Many More...']
      },
      {
        name: '❤️ Lifestyle',
        items: ['The Minimalist Lifestyle', 'Freedom in Forgiveness', 'The Art of Meditation', 'Happiness Starts with You', 'The Attitude of Gratitude', 'Freedom Creation Blueprint', 'Disconnect to Reconnect', 'The Power of Mindfulness', '+ Many More...']
      }
    ],
    footer: 'Most people buy courses. You can sell them, learn from them — or both ✅'
  },
  {
    title: '1M+ Digital Products Vault 💎',
    subtitle: 'High-demand assets — ready to sell.',
    subcategories: [
      {
        name: '💎 Core Digital Power Packs',
        items: ['Mega Editing & Graphics Pack', 'Website Themes', 'Landing Pages', 'Shopify Themes', 'ChatGPT Prompts Pack', 'YouTube Faceless Automation Blueprint']
      },
      {
        name: '📘 High-Demand Ebooks',
        items: ['How To Start An Online Coaching Business', 'Writing & Publishing Foundations', 'High-Value Client Sales Framework', 'Fiverr Freelancing Guide', 'Influencer Growth Guide', 'Build Your Unique Online Brand', 'Affiliate Marketing for Beginners', 'Dropshipping Foundations', 'Facebook Marketing Guide', 'Email Marketing Influence', 'Chatbot Marketing Framework', 'Copywriting Fundamentals', 'Content Strategy Hacks', 'Guide to Online Freelancing', 'Entrepreneurial Thinking Guide', 'Getting Started with Chatbots', 'Traffic Growth Strategies', 'Hashtag Traffic Guide', 'Google AdSense Basics Guide', 'Google Traffic Fundamentals', 'Viral Content Framework', 'Digital Business Foundations', 'Digital Product School', 'Evergreen Online Systems', '+ Many More...']
      },
      {
        name: '🎨 Canva Templates, Notion & Creator Assets',
        items: ['Notion Templates', 'Canva Design Crash Course', 'CapCut Editing Workflow Guide', 'Course Creator Collection', 'AI Ebooks Collection', 'Digital Planners & Journals', 'Viral Content Hooks', 'Social Media Master Planner', 'Instagram & Social Media Strategy Guide', 'Instagram Templates (Posts + Stories)', 'Faceless Reels Packs', 'Product Mockups for Etsy & Digital Stores', 'T-Shirt Design Pack', 'UGC Portfolio Kit', 'UGC Pitching Guide', '30-Day UGC Framework', 'Email Writing Framework', 'Coaching Worksheets', 'Welcome & Goodbye Books', 'Pricing Reference Sheets', 'Wellness Ebooks & Planners']
      }
    ],
    footer: 'Most people Buy Digital products. You can sell them, use them — or both ✅'
  },
  {
    title: '🎞️ Mega 15k+ Viral Reels Vault',
    subtitle: '',
    subcategories: [
      {
        name: 'Reels & Content',
        items: ['Luxury Reels', 'Faceless Content Packs', 'Reel Templates', 'Reels That Reach Blueprint']
      }
    ],
    footer: 'Most people watch reels. You can Post Them, Sell Them — or both ✅'
  },
  {
    title: '🚀 Ready-made Store Product Listings',
    subtitle: 'Everything organized and ready to be listed on your store.',
    subcategories: [
      {
        name: '🧠 Premium Courses',
        items: ['1000+ Comprehensive Courses Pack', 'Personal Branding Course', 'Business Growth Mastery', 'Wealth Foundations Blueprint', 'Digital Product Course', 'Dropshipping Foundations Course', 'YouTube Content Course', 'AI Foundations Course', 'Organic Traffic Strategies Course', 'Affiliate Marketing Course', 'Create Your Own Course', 'Blockchain & Crypto Fundamentals', 'Ads Strategy Mastery', 'Healthy Digital Habits Guide', 'Understanding the Subconscious Mind', 'Mindset & Visualization Principles']
      },
      {
        name: '💎 Core Digital Power Packs',
        items: ['1M+ Digital Products', 'Video Editing Pack', 'Website Themes', 'Shopify Themes', 'YouTube Automation Framework', 'ChatGPT Prompts Pack']
      },
      {
        name: '🚀 Digital Product Business Resources',
        items: ['Digital Product Mockups', '500+ Digital Product Ideas']
      },
      {
        name: '📘 Premium E-Books',
        items: ['Mega Ebooks Bundle', 'Online Coaching Guide', 'High-Value Client Sales Guide', 'Copywriting Fundamentals', 'Facebook Marketing Guide', 'Freelancing Foundations', 'Getting Started with Chatbots', 'Entrepreneurial Ideas', 'Content Strategy Hacks', 'Affiliate Marketing Guide', 'Writing & Publishing Guide', 'Influencer Growth Guide']
      },
      {
        name: '🎨 Canva Templates, Notion & Creator Assets',
        items: ['Canva Templates', 'Instagram Reels', 'Social Media Planner', 'Social Media Strategy Guide', '30-Day UGC Framework', 'Viral Social Media Hooks', 'T-Shirt Designs', 'UGC Guide', 'Notion Templates', 'Facebook Ads Framework', 'Course Creator Collection', 'Canva Design Crash Course', 'Planners & Journals', 'Understanding AI', 'Landing Page Templates', 'Luxury Reels Collection']
      }
    ],
    footer: ''
  }
];

export default function VaultCollection() {
  const { ref, visible } = useFadeUp();
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section ref={ref} style={{ padding: 'clamp(60px, 8vw, 100px) 20px', background: '#050505' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <span className="section-label" style={{ marginBottom: 16, display: 'block' }}>EXPLORE THE COLLECTION</span>
          <h2 className="font-bebas" style={{ fontSize: 'clamp(32px, 5vw, 56px)', color: '#ffffff', marginBottom: 12 }}>
            See Exactly <span className="gold-text">What's Inside</span>
          </h2>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.95rem', color: '#8E8E8E', maxWidth: 600, margin: '0 auto' }}>
            Browse through our massive collection of digital assets. Everything below is included in the Full Vault.
          </p>
        </div>

        {/* Custom Tabs */}
        <div className={`fade-up ${visible ? 'visible' : ''}`} style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: 10, 
          justifyContent: 'center', 
          marginBottom: 40 
        }}>
          {VAULT_CATEGORIES.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              style={{
                background: activeTab === idx ? 'rgba(212,175,55,0.1)' : '#111111',
                border: `1px solid ${activeTab === idx ? '#D4AF37' : 'rgba(212,175,55,0.2)'}`,
                color: activeTab === idx ? '#F9E498' : '#ffffff',
                padding: '12px 20px',
                borderRadius: 8,
                fontFamily: 'Poppins, sans-serif',
                fontSize: '0.9rem',
                fontWeight: activeTab === idx ? 600 : 400,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            >
              {cat.title.split(' ')[0]} {cat.title.split(' ').slice(1, -1).join(' ')}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className={`fade-up ${visible ? 'visible' : ''}`} style={{
          background: '#0D0D0D',
          border: '1px solid rgba(212,175,55,0.15)',
          borderRadius: 12,
          padding: 'clamp(20px, 4vw, 40px)',
        }}>
          <h3 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '1.4rem', color: '#F9E498', marginBottom: 8 }}>
            {VAULT_CATEGORIES[activeTab].title}
          </h3>
          {VAULT_CATEGORIES[activeTab].subtitle && (
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.95rem', color: '#8E8E8E', marginBottom: 30 }}>
              {VAULT_CATEGORIES[activeTab].subtitle}
            </p>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 30 }}>
            {VAULT_CATEGORIES[activeTab].subcategories.map((subcat, idx) => (
              <div key={idx}>
                <h4 style={{ 
                  fontFamily: 'Poppins, sans-serif', 
                  fontSize: '1rem', 
                  color: '#ffffff', 
                  marginBottom: 16,
                  paddingBottom: 8,
                  borderBottom: '1px solid rgba(212,175,55,0.1)'
                }}>
                  {subcat.name}
                </h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {subcat.items.map((item, itemIdx) => (
                    <li key={itemIdx} style={{ 
                      fontFamily: 'Inter, sans-serif', 
                      fontSize: '0.85rem', 
                      color: item.includes('Many More') ? '#D4AF37' : '#ffffff',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 8,
                      fontWeight: item.includes('Many More') ? 600 : 400
                    }}>
                      <span style={{ color: '#D4AF37', marginTop: 2 }}>✦</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {VAULT_CATEGORIES[activeTab].footer && (
            <div style={{
              marginTop: 40,
              padding: '16px 20px',
              background: 'rgba(212,175,55,0.05)',
              borderRadius: 8,
              border: '1px dashed rgba(212,175,55,0.3)',
              textAlign: 'center'
            }}>
              <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.95rem', color: '#D4AF37', margin: 0, fontWeight: 500 }}>
                {VAULT_CATEGORIES[activeTab].footer}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
