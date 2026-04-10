'use client'
import { useState, useEffect } from 'react'

interface Article {
  title: string
  slug: string
  content: string
  university: string
  country: string
  field: string
  level: string
  funding: string
  deadline: string
  link: string
  wordCount: number
  generatedAt: string
  metaTitle: string
  metaDescription: string
}

const EXTRA_SCHOLARSHIPS = [
  { title: 'Australia Awards Scholarships for Africa 2026', slug: 'australia-awards-africa', university: 'Australian Government', country: 'Australia', field: 'Any Field', level: 'Masters', funding: 'Fully Funded', deadline: 'May 1, 2026', wordCount: 950, metaDescription: 'Complete guide to Australia Awards Scholarships for African students. Learn eligibility, documents and application tips for this fully funded scholarship.', generatedAt: new Date().toISOString() },
  { title: 'Erasmus+ Programme for African Students 2026', slug: 'erasmus-africa', university: 'European Union', country: 'Europe', field: 'Any Field', level: 'Masters', funding: 'Fully Funded', deadline: 'Feb 1, 2026', wordCount: 980, metaDescription: 'Complete guide to Erasmus+ scholarships for African students to study in Europe. Full funding including tuition, living costs and travel.', generatedAt: new Date().toISOString() },
  { title: 'Korean Government Scholarship Program 2026', slug: 'korean-government-scholarship', university: 'Korean Government', country: 'South Korea', field: 'Any Field', level: 'Masters/PhD', funding: 'Fully Funded', deadline: 'Mar 15, 2026', wordCount: 920, metaDescription: 'Complete guide to Korean Government Scholarship for African students. Covers full tuition, living allowance and Korean language training.', generatedAt: new Date().toISOString() },
  { title: 'Japanese MEXT Scholarship for Africans 2026', slug: 'mext-japan-africa', university: 'Japanese Government', country: 'Japan', field: 'Any Field', level: 'Masters/PhD', funding: 'Fully Funded', deadline: 'Apr 20, 2026', wordCount: 940, metaDescription: 'Complete guide to Japanese MEXT Government Scholarship for African students. Full funding plus Japanese language training included.', generatedAt: new Date().toISOString() },
  { title: 'Swiss Government Excellence Scholarships 2026', slug: 'swiss-excellence-africa', university: 'Swiss Government', country: 'Switzerland', field: 'Research', level: 'PhD/Postdoc', funding: 'Fully Funded', deadline: 'Nov 15, 2025', wordCount: 960, metaDescription: 'Complete guide to Swiss Government Excellence Scholarships for African researchers and PhD students. Full funding at Swiss universities.', generatedAt: new Date().toISOString() },
  { title: 'Commonwealth Scholarship for African Students 2026', slug: 'commonwealth-africa', university: 'Commonwealth Secretariat', country: 'UK', field: 'Any Field', level: 'Masters/PhD', funding: 'Fully Funded', deadline: 'Dec 15, 2025', wordCount: 970, metaDescription: 'Complete guide to Commonwealth Scholarships for African students to study in the UK. Covers tuition, living costs and airfare.', generatedAt: new Date().toISOString() },
]

export default function BlogPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<Article | null>(null)
  const [activeCategory, setActiveCategory] = useState('All')
  const [visibleCount, setVisibleCount] = useState(6)
  const [loadingMore, setLoadingMore] = useState(false)

  const categories = ['All', 'USA', 'UK', 'Germany', 'China', 'Europe', 'Australia', 'Japan', 'South Korea', 'Switzerland']

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

  useEffect(() => {
    fetch('/api/generate-content')
      .then(res => res.json())
      .then(data => {
        const allArticles = [...(data.articles || []), ...EXTRA_SCHOLARSHIPS]
        setArticles(allArticles)
        setLoading(false)
      })
      .catch(() => {
        setArticles(EXTRA_SCHOLARSHIPS)
        setLoading(false)
      })
  }, [])

  const filtered = activeCategory === 'All'
    ? articles
    : articles.filter(a => a.country === activeCategory)

  const visible = filtered.slice(0, visibleCount)

  const loadMore = () => {
    setLoadingMore(true)
    setTimeout(() => {
      setVisibleCount(prev => prev + 3)
      setLoadingMore(false)
    }, 800)
  }

  if (selected) {
    return (
      <main style={{ fontFamily: 'sans-serif', background: '#f4f7f5', minHeight: '100vh' }}>
        <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 32px', height: '64px', background: '#fff', borderBottom: '1px solid #e0ece4', position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 2px 12px rgba(26,107,60,0.07)' }}>
          <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg,#1a6b3c,#2d9e5f)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>🎓</div>
            <span style={{ fontFamily: 'Georgia,serif', fontSize: '17px', fontWeight: 700, color: '#1a6b3c' }}>World<span style={{ color: '#c9a84c' }}>Scholarships</span>Africa</span>
          </a>
          <button onClick={() => setSelected(null)} style={{ padding: '8px 18px', background: '#1a6b3c', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>← Back to Blog</button>
        </nav>

        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 24px', display: 'grid', gridTemplateColumns: '1fr 280px', gap: '32px' }}>
          <div>
            <div style={{ background: 'linear-gradient(135deg,#0d1f14,#1a5c35)', borderRadius: '16px', padding: '32px', marginBottom: '32px' }}>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
                <span style={{ padding: '4px 12px', borderRadius: '100px', fontSize: '11px', fontWeight: 700, background: '#e8f5ee', color: '#1a6b3c' }}>{selected.funding}</span>
                <span style={{ padding: '4px 12px', borderRadius: '100px', fontSize: '11px', fontWeight: 700, background: 'rgba(255,255,255,0.1)', color: '#fff' }}>{selected.country}</span>
                <span style={{ padding: '4px 12px', borderRadius: '100px', fontSize: '11px', fontWeight: 700, background: 'rgba(255,255,255,0.1)', color: '#fff' }}>{selected.level}</span>
                <span style={{ padding: '4px 12px', borderRadius: '100px', fontSize: '11px', fontWeight: 700, background: 'rgba(255,255,255,0.1)', color: '#fff' }}>{selected.field}</span>
              </div>
              <h1 style={{ fontFamily: 'Georgia,serif', fontSize: '28px', fontWeight: 900, color: '#fff', lineHeight: 1.3, marginBottom: '16px' }}>{selected.title}</h1>
              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>🏛️ {selected.university}</span>
                <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>📅 Deadline: {selected.deadline}</span>
                <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>📅 Published: {today}</span>
                <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>📖 {selected.wordCount} words</span>
              </div>
            </div>

            <div style={{ background: '#fff', borderRadius: '16px', padding: '32px', border: '1px solid #e0ece4' }}>
              {selected.content ? selected.content.split('\n').map((line, i) => {
                if (line.startsWith('# ')) return <h1 key={i} style={{ fontFamily: 'Georgia,serif', fontSize: '26px', fontWeight: 700, color: '#1a2e1f', marginBottom: '16px' }}>{line.replace('# ', '')}</h1>
                if (line.startsWith('## ')) return <h2 key={i} style={{ fontFamily: 'Georgia,serif', fontSize: '20px', fontWeight: 700, color: '#1a6b3c', marginBottom: '12px', marginTop: '28px', paddingBottom: '8px', borderBottom: '2px solid #e8f5ee' }}>{line.replace('## ', '')}</h2>
                if (line.startsWith('- ')) return <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '6px', paddingLeft: '8px' }}><span style={{ color: '#1a6b3c', fontWeight: 700 }}>•</span><span style={{ fontSize: '14px', color: '#333', lineHeight: 1.7 }}>{line.replace('- ', '')}</span></div>
                if (line.match(/^\d+\./)) return <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}><span style={{ color: '#1a6b3c', fontWeight: 700, minWidth: '20px' }}>{line.split('.')[0]}.</span><span style={{ fontSize: '14px', color: '#333', lineHeight: 1.7 }}>{line.replace(/^\d+\.\s/, '')}</span></div>
                if (line.startsWith('---')) return <hr key={i} style={{ border: 'none', borderTop: '1px solid #e0ece4', margin: '24px 0' }} />
                if (line.trim() === '') return <div key={i} style={{ height: '8px' }} />
                return <p key={i} style={{ fontSize: '14px', color: '#333', lineHeight: 1.8, marginBottom: '12px' }}>{line}</p>
              }) : (
                <div>
                  <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '20px', color: '#1a6b3c', marginBottom: '16px' }}>About This Scholarship</h2>
                  <p style={{ fontSize: '14px', color: '#333', lineHeight: 1.8, marginBottom: '16px' }}>{selected.metaDescription}</p>
                  <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '20px', color: '#1a6b3c', marginBottom: '12px', marginTop: '24px' }}>Key Details</h2>
                  {[['University', selected.university], ['Country', selected.country], ['Field', selected.field], ['Level', selected.level], ['Funding', selected.funding], ['Deadline', selected.deadline]].map(([k, v]) => (
                    <div key={k} style={{ display: 'flex', gap: '12px', marginBottom: '10px', padding: '10px', background: '#f4f7f5', borderRadius: '8px' }}>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: '#6b8a72', minWidth: '100px' }}>{k}:</span>
                      <span style={{ fontSize: '13px', color: '#1a2e1f' }}>{v}</span>
                    </div>
                  ))}
                  <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '20px', color: '#1a6b3c', marginBottom: '12px', marginTop: '24px' }}>How to Apply</h2>
                  <p style={{ fontSize: '14px', color: '#333', lineHeight: 1.8 }}>Visit the official website to start your application. Make sure to prepare all required documents including academic transcripts, personal statement, and letters of recommendation. Apply before the deadline of {selected.deadline}.</p>
                </div>
              )}

              <div style={{ marginTop: '32px', padding: '20px', background: '#e8f5ee', borderRadius: '12px', textAlign: 'center' }}>
                <p style={{ fontSize: '14px', fontWeight: 600, color: '#1a2e1f', marginBottom: '12px' }}>Ready to Apply?</p>
                <a href={selected.link || '#'} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', padding: '12px 28px', background: '#1a6b3c', color: '#fff', borderRadius: '10px', fontSize: '14px', fontWeight: 700, textDecoration: 'none' }}>Apply Now on Official Website →</a>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ background: '#fff', borderRadius: '12px', padding: '18px', border: '1px solid #e0ece4' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#1a2e1f', marginBottom: '14px', paddingBottom: '10px', borderBottom: '1px solid #e0ece4' }}>📋 Quick Details</div>
              {[['🏛️ University', selected.university], ['🌍 Country', selected.country], ['📚 Field', selected.field], ['🎓 Level', selected.level], ['💰 Funding', selected.funding], ['⏰ Deadline', selected.deadline]].map(([label, val]) => (
                <div key={label} style={{ marginBottom: '10px' }}>
                  <div style={{ fontSize: '11px', color: '#6b8a72', fontWeight: 600 }}>{label}</div>
                  <div style={{ fontSize: '13px', color: '#1a2e1f', fontWeight: 500, marginTop: '2px' }}>{val}</div>
                </div>
              ))}
              <a href={selected.link || '#'} target="_blank" rel="noopener noreferrer" style={{ display: 'block', padding: '10px', background: '#1a6b3c', color: '#fff', borderRadius: '8px', fontSize: '13px', fontWeight: 600, textDecoration: 'none', textAlign: 'center', marginTop: '8px' }}>Apply Now →</a>
            </div>

            <div style={{ background: '#fff', borderRadius: '12px', padding: '18px', border: '1px solid #e0ece4' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#1a2e1f', marginBottom: '14px', paddingBottom: '10px', borderBottom: '1px solid #e0ece4' }}>📰 More Scholarships</div>
              {articles.filter(a => a.slug !== selected.slug).slice(0, 5).map(a => (
                <div key={a.slug} onClick={() => { setSelected(a); window.scrollTo(0, 0) }} style={{ cursor: 'pointer', padding: '10px', borderRadius: '8px', marginBottom: '8px', background: '#f4f7f5' }}>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: '#1a2e1f', marginBottom: '4px', lineHeight: 1.3 }}>{a.title.split('—')[0].split('2026')[0]}</div>
                  <div style={{ fontSize: '11px', color: '#6b8a72' }}>{a.country} · {a.funding}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main style={{ fontFamily: 'sans-serif', background: '#f4f7f5', minHeight: '100vh' }}>
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 32px', height: '64px', background: '#fff', borderBottom: '1px solid #e0ece4', position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 2px 12px rgba(26,107,60,0.07)' }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg,#1a6b3c,#2d9e5f)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>🎓</div>
          <span style={{ fontFamily: 'Georgia,serif', fontSize: '17px', fontWeight: 700, color: '#1a6b3c' }}>World<span style={{ color: '#c9a84c' }}>Scholarships</span>Africa</span>
        </a>
        <div style={{ display: 'flex', gap: '8px' }}>
          {[['Home', '/'], ['Scholarships', '/scholarships'], ['Blog', '/blog'], ['Forum', '/forum']].map(([item, href]) => (
            <a key={item} href={href} style={{ padding: '7px 13px', borderRadius: '8px', textDecoration: 'none', color: item === 'Blog' ? '#1a6b3c' : '#6b8a72', fontSize: '13px', fontWeight: item === 'Blog' ? 600 : 500, background: item === 'Blog' ? '#e8f5ee' : 'transparent' }}>{item}</a>
          ))}
        </div>
        <a href="/login" style={{ padding: '8px 16px', borderRadius: '8px', background: '#1a6b3c', color: '#fff', textDecoration: 'none', fontSize: '13px', fontWeight: 600 }}>Sign in</a>
      </nav>

      <div style={{ background: 'linear-gradient(135deg,#0d1f14,#1a5c35)', padding: '40px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'inline-block', padding: '4px 14px', background: 'rgba(201,168,76,0.2)', border: '1px solid rgba(201,168,76,0.4)', borderRadius: '100px', color: '#f0d080', fontSize: '11px', fontWeight: 600, marginBottom: '12px', textTransform: 'uppercase' as const }}>Updated Daily — {today}</div>
          <h1 style={{ fontFamily: 'Georgia,serif', fontSize: '36px', fontWeight: 900, color: '#fff', marginBottom: '8px' }}>📰 Scholarship Blog</h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>Complete guides, tips and updates — {articles.length} articles available</p>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 40px' }}>

        {/* TODAY'S POSTS BANNER */}
        <div style={{ background: '#fff', border: '1.5px solid #1a6b3c', borderRadius: '12px', padding: '16px 20px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '20px' }}>🆕</span>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#1a6b3c' }}>Today&apos;s Posts — {today}</div>
            <div style={{ fontSize: '12px', color: '#6b8a72', marginTop: '2px' }}>{articles.length} scholarship guides published today</div>
          </div>
          <span style={{ marginLeft: 'auto', background: '#e8f5ee', color: '#1a6b3c', fontSize: '12px', fontWeight: 700, padding: '4px 12px', borderRadius: '100px' }}>{articles.length} New</span>
        </div>

        {/* CATEGORIES */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '28px', flexWrap: 'wrap' }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => { setActiveCategory(cat); setVisibleCount(6) }} style={{ padding: '7px 16px', borderRadius: '100px', border: '1.5px solid #e0ece4', background: activeCategory === cat ? '#1a6b3c' : '#fff', color: activeCategory === cat ? '#fff' : '#6b8a72', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>{cat} {cat === 'All' ? `(${articles.length})` : `(${articles.filter(a => a.country === cat).length})`}</button>
          ))}
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px', color: '#6b8a72' }}>
            <div style={{ fontSize: '40px', marginBottom: '16px' }}>⏳</div>
            <div style={{ fontSize: '16px' }}>Loading today&apos;s articles...</div>
          </div>
        ) : (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '24px', marginBottom: '32px' }}>
              {visible.map((article, idx) => (
                <div key={article.slug} onClick={() => { setSelected(article); window.scrollTo(0, 0) }} style={{ background: '#fff', borderRadius: '16px', overflow: 'hidden', border: '1px solid #e0ece4', cursor: 'pointer', boxShadow: '0 2px 12px rgba(26,107,60,0.04)', position: 'relative' }}>
                  {idx < 3 && <div style={{ position: 'absolute', top: '12px', right: '12px', background: '#e05c2a', color: '#fff', fontSize: '9px', fontWeight: 700, padding: '2px 8px', borderRadius: '100px', textTransform: 'uppercase' as const }}>Today</div>}
                  <div style={{ background: 'linear-gradient(135deg,#0d1f14,#1a5c35)', padding: '20px' }}>
                    <div style={{ display: 'flex', gap: '6px', marginBottom: '10px', flexWrap: 'wrap' }}>
                      <span style={{ padding: '3px 10px', borderRadius: '100px', fontSize: '10px', fontWeight: 700, background: '#e8f5ee', color: '#1a6b3c' }}>{article.funding}</span>
                      <span style={{ padding: '3px 10px', borderRadius: '100px', fontSize: '10px', fontWeight: 700, background: 'rgba(255,255,255,0.15)', color: '#fff' }}>{article.country}</span>
                    </div>
                    <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '15px', fontWeight: 700, color: '#fff', lineHeight: 1.4 }}>{article.title.split('—')[0]}</h2>
                  </div>
                  <div style={{ padding: '16px 20px' }}>
                    <p style={{ fontSize: '12px', color: '#6b8a72', lineHeight: 1.6, marginBottom: '12px' }}>{article.metaDescription.substring(0, 100)}...</p>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '12px' }}>
                      {[article.level, article.field].map(tag => (
                        <span key={tag} style={{ padding: '3px 8px', background: '#f4f7f5', borderRadius: '100px', fontSize: '10px', color: '#6b8a72' }}>{tag}</span>
                      ))}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '10px', borderTop: '1px solid #f0f4f1' }}>
                      <div>
                        <div style={{ fontSize: '10px', color: '#6b8a72' }}>⏰ Deadline</div>
                        <div style={{ fontSize: '11px', fontWeight: 600, color: '#e05c2a' }}>{article.deadline}</div>
                      </div>
                      <button style={{ padding: '7px 14px', background: '#1a6b3c', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}>Read More →</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* LOAD MORE */}
            {visibleCount < filtered.length && (
              <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <button
                  onClick={loadMore}
                  disabled={loadingMore}
                  style={{ padding: '14px 40px', background: loadingMore ? '#6b8a72' : '#1a6b3c', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '14px', fontWeight: 600, cursor: loadingMore ? 'not-allowed' : 'pointer', fontFamily: 'sans-serif' }}
                >
                  {loadingMore ? '⏳ Loading...' : `Load More Scholarships (${filtered.length - visibleCount} remaining)`}
                </button>
              </div>
            )}

            {visibleCount >= filtered.length && filtered.length > 0 && (
              <div style={{ textAlign: 'center', padding: '20px', color: '#6b8a72', fontSize: '13px', marginBottom: '40px' }}>
                ✅ You have seen all {filtered.length} articles in this category!
              </div>
            )}
          </>
        )}
      </div>

      <footer style={{ background: '#0d1f14', color: 'rgba(255,255,255,0.6)', padding: '30px 40px', textAlign: 'center' }}>
        <p style={{ fontSize: '12px' }}>© 2026 WorldScholarshipsAfrica.com — All rights reserved</p>
      </footer>
    </main>
  )
}
