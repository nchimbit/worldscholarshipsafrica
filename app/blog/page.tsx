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

export default function BlogPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<Article | null>(null)
  const [activeCategory, setActiveCategory] = useState('All')

  const categories = ['All', 'USA', 'UK', 'Germany', 'China', 'Multiple Countries']

  useEffect(() => {
    fetch('/api/generate-content')
      .then(res => res.json())
      .then(data => {
        setArticles(data.articles || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const filtered = activeCategory === 'All'
    ? articles
    : articles.filter(a => a.country === activeCategory)

  const fundingColor: Record<string, { bg: string; color: string }> = {
    'Fully Funded': { bg: '#e8f5ee', color: '#1a6b3c' },
    'Partial': { bg: '#fff8e6', color: '#b07d00' },
  }

  if (selected) {
    return (
      <main style={{ fontFamily: 'sans-serif', background: '#f4f7f5', minHeight: '100vh' }}>
        {/* NAVBAR */}
        <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 32px', height: '64px', background: '#fff', borderBottom: '1px solid #e0ece4', position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 2px 12px rgba(26,107,60,0.07)' }}>
          <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg,#1a6b3c,#2d9e5f)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>🎓</div>
            <span style={{ fontFamily: 'Georgia,serif', fontSize: '17px', fontWeight: 700, color: '#1a6b3c' }}>World<span style={{ color: '#c9a84c' }}>Scholarships</span>Africa</span>
          </a>
          <button onClick={() => setSelected(null)} style={{ padding: '8px 18px', background: '#1a6b3c', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>← Back to Blog</button>
        </nav>

        {/* ARTICLE */}
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 24px', display: 'grid', gridTemplateColumns: '1fr 280px', gap: '32px' }}>
          <div>
            {/* Header */}
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
                <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>📖 {selected.wordCount} words</span>
              </div>
            </div>

            {/* Content */}
            <div style={{ background: '#fff', borderRadius: '16px', padding: '32px', border: '1px solid #e0ece4' }}>
              {selected.content.split('\n').map((line, i) => {
                if (line.startsWith('# ')) return <h1 key={i} style={{ fontFamily: 'Georgia,serif', fontSize: '26px', fontWeight: 700, color: '#1a2e1f', marginBottom: '16px', marginTop: '8px' }}>{line.replace('# ', '')}</h1>
                if (line.startsWith('## ')) return <h2 key={i} style={{ fontFamily: 'Georgia,serif', fontSize: '20px', fontWeight: 700, color: '#1a6b3c', marginBottom: '12px', marginTop: '28px', paddingBottom: '8px', borderBottom: '2px solid #e8f5ee' }}>{line.replace('## ', '')}</h2>
                if (line.startsWith('- ')) return <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '6px', paddingLeft: '8px' }}><span style={{ color: '#1a6b3c', fontWeight: 700 }}>•</span><span style={{ fontSize: '14px', color: '#333', lineHeight: 1.7 }}>{line.replace('- ', '').replace(/\*\*(.*?)\*\*/g, '$1')}</span></div>
                if (line.match(/^\d+\./)) return <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '8px', paddingLeft: '8px' }}><span style={{ color: '#1a6b3c', fontWeight: 700, minWidth: '20px' }}>{line.split('.')[0]}.</span><span style={{ fontSize: '14px', color: '#333', lineHeight: 1.7 }}>{line.replace(/^\d+\.\s/, '').replace(/\*\*(.*?)\*\*/g, '$1')}</span></div>
                if (line.startsWith('---')) return <hr key={i} style={{ border: 'none', borderTop: '1px solid #e0ece4', margin: '24px 0' }} />
                if (line.startsWith('*') && line.endsWith('*')) return <p key={i} style={{ fontSize: '12px', color: '#6b8a72', fontStyle: 'italic', marginTop: '16px' }}>{line.replace(/\*/g, '')}</p>
                if (line.trim() === '') return <div key={i} style={{ height: '8px' }} />
                return <p key={i} style={{ fontSize: '14px', color: '#333', lineHeight: 1.8, marginBottom: '12px' }}>{line.replace(/\*\*(.*?)\*\*/g, '$1')}</p>
              })}

              <div style={{ marginTop: '32px', padding: '20px', background: '#e8f5ee', borderRadius: '12px', textAlign: 'center' }}>
                <p style={{ fontSize: '14px', fontWeight: 600, color: '#1a2e1f', marginBottom: '12px' }}>Ready to Apply for This Scholarship?</p>
                <a href={selected.link} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', padding: '12px 28px', background: '#1a6b3c', color: '#fff', borderRadius: '10px', fontSize: '14px', fontWeight: 700, textDecoration: 'none' }}>Apply Now on Official Website →</a>
              </div>
            </div>
          </div>

          {/* SIDEBAR */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ background: '#fff', borderRadius: '12px', padding: '18px', border: '1px solid #e0ece4' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#1a2e1f', marginBottom: '14px', paddingBottom: '10px', borderBottom: '1px solid #e0ece4' }}>📋 Quick Details</div>
              {[['🏛️ University', selected.university], ['🌍 Country', selected.country], ['📚 Field', selected.field], ['🎓 Level', selected.level], ['💰 Funding', selected.funding], ['⏰ Deadline', selected.deadline]].map(([label, val]) => (
                <div key={label} style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
                  <span style={{ fontSize: '11px', color: '#6b8a72', fontWeight: 600 }}>{label}</span>
                  <span style={{ fontSize: '13px', color: '#1a2e1f', fontWeight: 500, marginTop: '2px' }}>{val}</span>
                </div>
              ))}
              <a href={selected.link} target="_blank" rel="noopener noreferrer" style={{ display: 'block', padding: '10px', background: '#1a6b3c', color: '#fff', borderRadius: '8px', fontSize: '13px', fontWeight: 600, textDecoration: 'none', textAlign: 'center', marginTop: '8px' }}>Apply Now →</a>
            </div>

            <div style={{ background: '#fff', borderRadius: '12px', padding: '18px', border: '1px solid #e0ece4' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#1a2e1f', marginBottom: '14px', paddingBottom: '10px', borderBottom: '1px solid #e0ece4' }}>📰 More Scholarships</div>
              {articles.filter(a => a.slug !== selected.slug).slice(0, 4).map(a => (
                <div key={a.slug} onClick={() => setSelected(a)} style={{ cursor: 'pointer', padding: '10px', borderRadius: '8px', marginBottom: '8px', background: '#f4f7f5' }}>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: '#1a2e1f', marginBottom: '4px', lineHeight: 1.3 }}>{a.title.split('—')[0]}</div>
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
      {/* NAVBAR */}
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

      {/* HERO */}
      <div style={{ background: 'linear-gradient(135deg,#0d1f14,#1a5c35)', padding: '40px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{ fontFamily: 'Georgia,serif', fontSize: '36px', fontWeight: 900, color: '#fff', marginBottom: '8px' }}>📰 Scholarship Blog</h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>Complete guides, tips and updates — auto-generated daily</p>
        </div>
      </div>

      {/* MAIN */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 40px' }}>

        {/* CATEGORIES */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '28px', flexWrap: 'wrap' }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)} style={{ padding: '8px 18px', borderRadius: '100px', border: '1.5px solid #e0ece4', background: activeCategory === cat ? '#1a6b3c' : '#fff', color: activeCategory === cat ? '#fff' : '#6b8a72', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>{cat}</button>
          ))}
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px', color: '#6b8a72', fontSize: '16px' }}>
            <div style={{ fontSize: '40px', marginBottom: '16px' }}>⏳</div>
            Loading articles...
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '24px' }}>
            {filtered.map(article => (
              <div key={article.slug} onClick={() => setSelected(article)} style={{ background: '#fff', borderRadius: '16px', overflow: 'hidden', border: '1px solid #e0ece4', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 2px 12px rgba(26,107,60,0.04)' }}>

                {/* Card Header */}
                <div style={{ background: 'linear-gradient(135deg,#0d1f14,#1a5c35)', padding: '20px' }}>
                  <div style={{ display: 'flex', gap: '6px', marginBottom: '10px', flexWrap: 'wrap' }}>
                    <span style={{ padding: '3px 10px', borderRadius: '100px', fontSize: '10px', fontWeight: 700, background: fundingColor[article.funding]?.bg || '#e8f5ee', color: fundingColor[article.funding]?.color || '#1a6b3c' }}>{article.funding}</span>
                    <span style={{ padding: '3px 10px', borderRadius: '100px', fontSize: '10px', fontWeight: 700, background: 'rgba(255,255,255,0.15)', color: '#fff' }}>{article.country}</span>
                  </div>
                  <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '16px', fontWeight: 700, color: '#fff', lineHeight: 1.4 }}>{article.title.split('—')[0]}</h2>
                </div>

                {/* Card Body */}
                <div style={{ padding: '16px 20px' }}>
                  <p style={{ fontSize: '13px', color: '#6b8a72', lineHeight: 1.6, marginBottom: '14px' }}>{article.metaDescription.substring(0, 120)}...</p>

                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '14px' }}>
                    {[article.level, article.field].map(tag => (
                      <span key={tag} style={{ padding: '3px 10px', background: '#f4f7f5', borderRadius: '100px', fontSize: '11px', color: '#6b8a72' }}>{tag}</span>
                    ))}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '12px', borderTop: '1px solid #f0f4f1' }}>
                    <div>
                      <div style={{ fontSize: '11px', color: '#6b8a72' }}>⏰ Deadline</div>
                      <div style={{ fontSize: '12px', fontWeight: 600, color: '#e05c2a' }}>{article.deadline}</div>
                    </div>
                    <button style={{ padding: '8px 16px', background: '#1a6b3c', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>Read More →</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <footer style={{ background: '#0d1f14', color: 'rgba(255,255,255,0.6)', padding: '30px 40px', textAlign: 'center', marginTop: '40px' }}>
        <p style={{ fontSize: '12px' }}>© 2026 WorldScholarshipsAfrica.com — All rights reserved</p>
      </footer>
    </main>
  )
}
