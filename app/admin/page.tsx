'use client'
import { useState, useEffect } from 'react'

interface Article {
  title: string
  slug: string
  university: string
  country: string
  field: string
  level: string
  funding: string
  deadline: string
  metaDescription: string
  wordCount: number
}

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([])

  useEffect(() => {
    fetch('/api/generate-content')
      .then(res => res.json())
      .then(data => setArticles(data.articles?.slice(0, 3) || []))
      .catch(() => {})
  }, [])

  return (
    <main style={{ fontFamily: 'sans-serif', margin: 0, padding: 0 }}>

      {/* NAVBAR */}
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 32px', height: '64px', background: '#fff', borderBottom: '1px solid #e0ece4', position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 2px 12px rgba(26,107,60,0.07)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg, #1a6b3c, #2d9e5f)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>🎓</div>
          <span style={{ fontFamily: 'Georgia, serif', fontSize: '17px', fontWeight: 700, color: '#1a6b3c' }}>World<span style={{ color: '#c9a84c' }}>Scholarships</span>Africa</span>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          {[['Scholarships', '/scholarships'], ['Forum', '/forum'], ['Blog', '/blog'], ['Login', '/login']].map(([item, href]) => (
            <a key={item} href={href} style={{ padding: '7px 13px', borderRadius: '8px', textDecoration: 'none', color: '#6b8a72', fontSize: '13px', fontWeight: 500 }}>{item}</a>
          ))}
        </div>
        <a href="/login" style={{ padding: '8px 16px', borderRadius: '8px', background: '#1a6b3c', color: '#fff', textDecoration: 'none', fontSize: '13px', fontWeight: 600 }}>Sign in with Google</a>
      </nav>

      {/* HERO */}
      <section style={{ background: 'linear-gradient(135deg, #0d1f14 0%, #0f3320 50%, #1a5c35 100%)', padding: '80px 40px', display: 'flex', justifyContent: 'center' }}>
        <div style={{ maxWidth: '700px', textAlign: 'center' }}>
          <div style={{ display: 'inline-block', padding: '6px 16px', background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.4)', borderRadius: '100px', color: '#f0d080', fontSize: '12px', fontWeight: 600, marginBottom: '20px', textTransform: 'uppercase' as const, letterSpacing: '0.5px' }}>Africa&apos;s #1 Scholarship Platform</div>
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '48px', fontWeight: 900, color: '#fff', lineHeight: 1.1, marginBottom: '20px' }}>Find Your <em style={{ color: '#f0d080' }}>Dream</em> Scholarship Worldwide</h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '16px', lineHeight: 1.7, marginBottom: '32px' }}>Discover thousands of fully funded scholarships for African students from top universities across the USA, UK, China, Germany and beyond.</p>
          <div style={{ display: 'flex', background: '#fff', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 8px 40px rgba(0,0,0,0.3)' }}>
            <select style={{ padding: '14px 16px', border: 'none', outline: 'none', fontSize: '13px', color: '#6b8a72', background: '#f8faf9', borderRight: '1px solid #e0ece4', minWidth: '130px' }}>
              <option>All Fields</option>
              <option>Medicine</option>
              <option>Engineering</option>
              <option>Business</option>
            </select>
            <input type="text" placeholder="Search scholarships, universities..." style={{ flex: 1, padding: '14px 16px', border: 'none', outline: 'none', fontSize: '14px' }} />
            <button style={{ padding: '14px 24px', background: '#1a6b3c', border: 'none', color: '#fff', fontWeight: 600, fontSize: '14px', cursor: 'pointer' }}>Search</button>
          </div>
          <div style={{ display: 'flex', gap: '32px', marginTop: '28px', justifyContent: 'center' }}>
            {[['1,200+', 'Active Scholarships'], ['85+', 'Countries'], ['50K+', 'Students Helped']].map(([num, label]) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'Georgia, serif', fontSize: '28px', fontWeight: 700, color: '#f0d080' }}>{num}</div>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginTop: '2px' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section style={{ padding: '60px 40px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '32px', fontWeight: 700, marginBottom: '8px', color: '#1a2e1f' }}>Browse by <span style={{ color: '#1a6b3c' }}>Field of Study</span></h2>
        <p style={{ color: '#6b8a72', marginBottom: '28px', fontSize: '14px' }}>Find scholarships tailored to your academic interest</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '16px' }}>
          {[['🏥', 'Medicine', '245'], ['⚙️', 'Engineering', '312'], ['💼', 'Business', '198'], ['💻', 'Technology', '267'], ['🎨', 'Arts', '143'], ['⚖️', 'Law', '89']].map(([icon, name, count]) => (
            <a href="/scholarships" key={name} style={{ background: '#f4f7f5', borderRadius: '14px', padding: '20px 14px', textAlign: 'center', cursor: 'pointer', border: '2px solid transparent', textDecoration: 'none', display: 'block' }}>
              <div style={{ fontSize: '28px', marginBottom: '10px' }}>{icon}</div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#1a2e1f', marginBottom: '4px' }}>{name}</div>
              <div style={{ fontSize: '11px', color: '#6b8a72' }}>{count} scholarships</div>
            </a>
          ))}
        </div>
      </section>

      {/* LATEST SCHOLARSHIPS */}
      <section style={{ background: '#f4f7f5', padding: '60px 40px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '28px' }}>
            <div>
              <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '32px', fontWeight: 700, color: '#1a2e1f' }}>Latest <span style={{ color: '#1a6b3c' }}>Scholarships</span></h2>
              <p style={{ color: '#6b8a72', fontSize: '14px', marginTop: '4px' }}>Updated daily — auto-fetched from top universities worldwide</p>
            </div>
            <a href="/scholarships" style={{ color: '#1a6b3c', fontSize: '13px', fontWeight: 600, textDecoration: 'none' }}>View All →</a>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {[
              { logo: '🏛️', uni: 'Harvard University', country: '🇺🇸 USA', title: 'Harvard Africa Leaders Fellowship 2025', tags: ['Masters', 'Leadership', 'All Africa'], deadline: 'Dec 30, 2025', bg: '#e8f0fb' },
              { logo: '🎓', uni: 'University of Oxford', country: '🇬🇧 UK', title: 'Chevening Scholarship for African Students', tags: ['Masters', 'Any Field', 'East Africa'], deadline: 'Jan 15, 2026', bg: '#f0e8fb' },
              { logo: '🌏', uni: 'Chinese Govt (CSC)', country: '🇨🇳 China', title: 'CSC Scholarship for African Students 2025', tags: ['All Levels', 'Engineering', 'All Africa'], deadline: 'Feb 28, 2026', bg: '#fbe8e8' },
            ].map((s) => (
              <div key={s.title} style={{ background: '#fff', borderRadius: '16px', overflow: 'hidden', border: '1px solid #e8f0eb' }}>
                <div style={{ padding: '20px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }}>{s.logo}</div>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: '#1a2e1f' }}>{s.uni}</div>
                      <div style={{ fontSize: '11px', color: '#6b8a72', marginTop: '2px' }}>{s.country}</div>
                    </div>
                  </div>
                  <span style={{ padding: '4px 10px', borderRadius: '100px', fontSize: '10px', fontWeight: 700, background: '#e8f5ee', color: '#1a6b3c' }}>Fully Funded</span>
                </div>
                <div style={{ height: '1px', background: '#f0f4f1', margin: '0 20px' }}></div>
                <div style={{ padding: '16px 20px' }}>
                  <div style={{ fontSize: '15px', fontWeight: 600, color: '#1a2e1f', lineHeight: 1.4, marginBottom: '10px' }}>{s.title}</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '6px' }}>
                    {s.tags.map(tag => (<span key={tag} style={{ padding: '3px 10px', background: '#f4f7f5', borderRadius: '100px', fontSize: '11px', color: '#6b8a72' }}>{tag}</span>))}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px', borderTop: '1px solid #f0f4f1' }}>
                  <div style={{ fontSize: '12px', color: '#6b8a72' }}>Deadline: <strong style={{ color: '#e05c2a' }}>{s.deadline}</strong></div>
                  <a href="/scholarships" style={{ padding: '8px 18px', background: '#1a6b3c', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', textDecoration: 'none' }}>Apply Now</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LATEST BLOG POSTS */}
      <section style={{ padding: '60px 40px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '28px' }}>
          <div>
            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '32px', fontWeight: 700, color: '#1a2e1f' }}>Latest <span style={{ color: '#1a6b3c' }}>Blog Posts</span></h2>
            <p style={{ color: '#6b8a72', fontSize: '14px', marginTop: '4px' }}>Complete guides and tips — auto-generated daily</p>
          </div>
          <a href="/blog" style={{ color: '#1a6b3c', fontSize: '13px', fontWeight: 600, textDecoration: 'none' }}>View All Posts →</a>
        </div>

        {articles.length === 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '24px' }}>
            {[1,2,3].map(i => (
              <div key={i} style={{ background: '#f4f7f5', borderRadius: '16px', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: '#6b8a72', fontSize: '13px' }}>Loading posts...</span>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '24px' }}>
            {articles.map(article => (
              <a key={article.slug} href="/blog" style={{ textDecoration: 'none', display: 'block' }}>
                <div style={{ background: '#fff', borderRadius: '16px', overflow: 'hidden', border: '1px solid #e0ece4', cursor: 'pointer', height: '100%' }}>
                  <div style={{ background: 'linear-gradient(135deg,#0d1f14,#1a5c35)', padding: '20px' }}>
                    <div style={{ display: 'flex', gap: '6px', marginBottom: '10px' }}>
                      <span style={{ padding: '3px 10px', borderRadius: '100px', fontSize: '10px', fontWeight: 700, background: '#e8f5ee', color: '#1a6b3c' }}>{article.funding}</span>
                      <span style={{ padding: '3px 10px', borderRadius: '100px', fontSize: '10px', fontWeight: 700, background: 'rgba(255,255,255,0.15)', color: '#fff' }}>{article.country}</span>
                    </div>
                    <h3 style={{ fontFamily: 'Georgia,serif', fontSize: '15px', fontWeight: 700, color: '#fff', lineHeight: 1.4 }}>{article.title.split('—')[0]}</h3>
                  </div>
                  <div style={{ padding: '16px 20px' }}>
                    <p style={{ fontSize: '13px', color: '#6b8a72', lineHeight: 1.6, marginBottom: '14px' }}>{article.metaDescription.substring(0, 100)}...</p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '11px', color: '#6b8a72' }}>📖 {article.wordCount} words</span>
                      <span style={{ fontSize: '12px', color: '#1a6b3c', fontWeight: 600 }}>Read More →</span>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </section>

      {/* STATS */}
      <section style={{ background: 'linear-gradient(135deg, #1a6b3c, #0f4a28)', padding: '50px 40px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '20px', textAlign: 'center' }}>
          {[['1,200+', 'Active Scholarships'], ['85+', 'Partner Universities'], ['54', 'African Countries'], ['50K+', 'Students Helped']].map(([num, label]) => (
            <div key={label}>
              <div style={{ fontFamily: 'Georgia, serif', fontSize: '42px', fontWeight: 900, color: '#f0d080' }}>{num}</div>
              <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', marginTop: '4px' }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: '#0d1f14', color: 'rgba(255,255,255,0.6)', padding: '40px', textAlign: 'center' }}>
        <div style={{ fontFamily: 'Georgia, serif', fontSize: '18px', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>🎓 World<span style={{ color: '#c9a84c' }}>Scholarships</span>Africa</div>
        <p style={{ fontSize: '13px', marginBottom: '16px' }}>Africa&apos;s most comprehensive scholarship platform</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginBottom: '16px' }}>
          {[['Scholarships', '/scholarships'], ['Blog', '/blog'], ['Forum', '/forum'], ['Login', '/login'], ['Admin', '/admin']].map(([label, href]) => (
            <a key={label} href={href} style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', textDecoration: 'none' }}>{label}</a>
          ))}
        </div>
        <p style={{ fontSize: '12px' }}>© 2026 WorldScholarshipsAfrica.com — All rights reserved</p>
      </footer>

    </main>
  )
}
