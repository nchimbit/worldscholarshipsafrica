export default function ForumPage() {
  const threads = [
    { id: 1, avatar: '👨🏾‍🎓', name: 'John Mwanga', country: '🇹🇿 Tanzania', time: '2 hours ago', title: 'How I got the DAAD Scholarship from Tanzania — Complete Step by Step Guide', preview: 'I applied for the DAAD scholarship last year and got accepted. Here is everything I did from finding the scholarship to receiving the acceptance letter...', badge: 'HOT', replies: 142, views: '3.2K', likes: 89 },
    { id: 2, avatar: '👩🏾‍💻', name: 'Amina Osei', country: '🇰🇪 Kenya', time: '5 hours ago', title: 'China CSC Scholarship 2025 — Documents needed and application portal tips', preview: 'The CSC portal can be confusing at first. Here are all the documents you need and tips for filling the application form correctly...', badge: 'NEW', replies: 98, views: '2.1K', likes: 67 },
    { id: 3, avatar: '👨🏿‍🔬', name: 'Emeka Adeyemi', country: '🇳🇬 Nigeria', time: '1 day ago', title: 'Chevening Interview Questions — Everything they asked me at UK Embassy Lagos', preview: 'Just had my Chevening interview at the UK Embassy in Lagos. They asked about 8 questions. Here is what they asked and how I answered...', badge: 'PINNED', replies: 76, views: '5.8K', likes: 124 },
    { id: 4, avatar: '👩🏽‍⚕️', name: 'Fatima Diallo', country: '🇬🇭 Ghana', time: '2 days ago', title: 'I got a Full Scholarship to study Medicine in Russia — Here is my story', preview: 'After 3 failed applications I finally got accepted for a full scholarship to study Medicine in Russia. I want to share my journey so others do not give up...', badge: 'TOP', replies: 201, views: '9.4K', likes: 342 },
    { id: 5, avatar: '👨🏾‍💼', name: 'David Mkwawa', country: '🇹🇿 Tanzania', time: '3 days ago', title: 'MasterCard Foundation Scholarship — Who is eligible from Tanzania?', preview: 'I have been trying to understand the eligibility criteria for the MasterCard Foundation scholarship. Can anyone from Tanzania who applied share their experience?', badge: 'NEW', replies: 54, views: '1.2K', likes: 23 },
  ]

  const categories = [
    { icon: '🎓', name: 'Scholarship Tips', count: '2,341' },
    { icon: '🌍', name: 'Country Specific', count: '1,892' },
    { icon: '📝', name: 'Document Help', count: '987' },
    { icon: '🛂', name: 'Visa & Travel', count: '654' },
    { icon: '⭐', name: 'Success Stories', count: '432' },
    { icon: '💼', name: 'After Scholarship', count: '312' },
  ]

  const trending = [
    'China CSC Scholarship 2025 Application Guide',
    'DAAD Germany Tips for East Africans',
    'How to Write a Winning Personal Statement',
    'UK Student Visa Process from Tanzania',
    'MasterCard Foundation Eligibility 2025',
  ]

  const badgeColors: Record<string, { bg: string; color: string }> = {
    HOT: { bg: '#fde8e8', color: '#c0392b' },
    NEW: { bg: '#e8f5ee', color: '#1a6b3c' },
    PINNED: { bg: '#fff8e6', color: '#b07d00' },
    TOP: { bg: '#e8f0fb', color: '#185fa5' },
  }

  return (
    <main style={{ fontFamily: 'sans-serif', background: '#f4f7f5', minHeight: '100vh' }}>

      {/* NAVBAR */}
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 32px', height: '64px', background: '#fff', borderBottom: '1px solid #e0ece4', position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 2px 12px rgba(26,107,60,0.07)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg,#1a6b3c,#2d9e5f)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>🎓</div>
          <span style={{ fontFamily: 'Georgia,serif', fontSize: '17px', fontWeight: 700, color: '#1a6b3c' }}>World<span style={{ color: '#c9a84c' }}>Scholarships</span>Africa</span>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          {[['Home', '/'], ['Scholarships', '/scholarships'], ['Forum', '/forum'], ['Blog', '#']].map(([item, href]) => (
            <a key={item} href={href} style={{ padding: '7px 13px', borderRadius: '8px', textDecoration: 'none', color: item === 'Forum' ? '#1a6b3c' : '#6b8a72', fontSize: '13px', fontWeight: item === 'Forum' ? 600 : 500, background: item === 'Forum' ? '#e8f5ee' : 'transparent' }}>{item}</a>
          ))}
        </div>
        <button style={{ padding: '8px 16px', borderRadius: '8px', background: '#1a6b3c', color: '#fff', border: 'none', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Sign in with Google</button>
      </nav>

      {/* HERO */}
      <div style={{ background: 'linear-gradient(135deg,#0d1f14,#1a5c35)', padding: '40px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{ fontFamily: 'Georgia,serif', fontSize: '32px', fontWeight: 900, color: '#fff', marginBottom: '8px' }}>💬 Community Forum</h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', marginBottom: '20px' }}>Connect with 5,000+ African students. Share tips, ask questions, celebrate successes!</p>
          <div style={{ display: 'flex', background: 'rgba(255,255,255,0.12)', borderRadius: '10px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.2)', maxWidth: '500px' }}>
            <input type="text" placeholder="Search discussions..." style={{ flex: 1, padding: '11px 16px', border: 'none', background: 'transparent', color: '#fff', fontSize: '13px', outline: 'none' }} />
            <button style={{ padding: '11px 20px', background: '#c9a84c', border: 'none', color: '#0d1f14', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}>Search</button>
          </div>
        </div>
      </div>

      {/* MAIN */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px 40px', display: 'grid', gridTemplateColumns: '1fr 280px', gap: '24px' }}>

        {/* LEFT */}
        <div>
          {/* Categories */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '10px', marginBottom: '24px' }}>
            {categories.map(cat => (
              <div key={cat.name} style={{ background: '#fff', border: '1.5px solid #e0ece4', borderRadius: '12px', padding: '14px', cursor: 'pointer', transition: 'all 0.2s' }}>
                <div style={{ fontSize: '22px', marginBottom: '6px' }}>{cat.icon}</div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#1a2e1f' }}>{cat.name}</div>
                <div style={{ fontSize: '11px', color: '#6b8a72', marginTop: '2px' }}>{cat.count} posts</div>
              </div>
            ))}
          </div>

          {/* Tabs + New Post */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div style={{ display: 'flex', gap: '4px' }}>
              {['🔥 Hot', '🆕 New', '📌 Pinned', '⭐ Top'].map((tab, i) => (
                <button key={tab} style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', background: i === 0 ? '#1a6b3c' : '#e8f5ee', color: i === 0 ? '#fff' : '#6b8a72', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>{tab}</button>
              ))}
            </div>
            <button style={{ padding: '9px 20px', background: '#1a6b3c', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>+ New Post</button>
          </div>

          {/* Threads */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {threads.map(t => (
              <div key={t.id} style={{ background: '#fff', border: '1.5px solid #e0ece4', borderRadius: '12px', padding: '16px 20px', display: 'flex', gap: '14px', cursor: 'pointer' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#e8f5ee', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>{t.avatar}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px', marginBottom: '6px' }}>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: '#1a2e1f', lineHeight: 1.3 }}>{t.title}</div>
                    <span style={{ padding: '2px 8px', borderRadius: '100px', fontSize: '10px', fontWeight: 700, whiteSpace: 'nowrap', flexShrink: 0, background: badgeColors[t.badge].bg, color: badgeColors[t.badge].color }}>{t.badge}</span>
                  </div>
                  <div style={{ fontSize: '12px', color: '#6b8a72', lineHeight: 1.5, marginBottom: '8px' }}>{t.preview}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <span style={{ fontSize: '11px', color: '#6b8a72' }}>👤 {t.name}</span>
                    <span style={{ fontSize: '11px', color: '#6b8a72' }}>{t.country}</span>
                    <span style={{ fontSize: '11px', color: '#6b8a72' }}>⏰ {t.time}</span>
                    <div style={{ marginLeft: 'auto', display: 'flex', gap: '12px' }}>
                      <span style={{ fontSize: '12px', color: '#6b8a72' }}>💬 {t.replies}</span>
                      <span style={{ fontSize: '12px', color: '#6b8a72' }}>👁️ {t.views}</span>
                      <span style={{ fontSize: '12px', color: '#6b8a72' }}>❤️ {t.likes}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

          <button style={{ width: '100%', padding: '12px', background: '#1a6b3c', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>+ Start New Discussion</button>

          {/* Online Users */}
          <div style={{ background: '#fff', border: '1px solid #e0ece4', borderRadius: '12px', padding: '18px' }}>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#1a2e1f', marginBottom: '14px', paddingBottom: '10px', borderBottom: '1px solid #e0ece4' }}>🟢 Online Now (24)</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {['👨🏾', '👩🏿', '👨🏽', '👩🏾', '👨🏿', '👩🏽', '👨🏾', '👩🏿'].map((av, i) => (
                <div key={i} style={{ width: '34px', height: '34px', borderRadius: '50%', background: '#e8f5ee', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', border: '2px solid #fff', boxShadow: '0 0 0 2px #1a6b3c' }}>{av}</div>
              ))}
            </div>
          </div>

          {/* Trending */}
          <div style={{ background: '#fff', border: '1px solid #e0ece4', borderRadius: '12px', padding: '18px' }}>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#1a2e1f', marginBottom: '14px', paddingBottom: '10px', borderBottom: '1px solid #e0ece4' }}>🔥 Trending Topics</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {trending.map((topic, i) => (
                <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', cursor: 'pointer' }}>
                  <span style={{ fontSize: '18px', fontWeight: 700, color: '#e8f5ee', fontFamily: 'Georgia,serif', lineHeight: 1, minWidth: '20px' }}>0{i + 1}</span>
                  <span style={{ fontSize: '12px', color: '#1a2e1f', fontWeight: 500, lineHeight: 1.4 }}>{topic}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Deadlines */}
          <div style={{ background: '#fff', border: '1px solid #e0ece4', borderRadius: '12px', padding: '18px' }}>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#1a2e1f', marginBottom: '14px', paddingBottom: '10px', borderBottom: '1px solid #e0ece4' }}>⏰ Closing Soon</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[['Harvard Fellowship', '3 days left', '#e05c2a'], ['MasterCard Foundation', '7 days left', '#e05c2a'], ['DAAD Germany', '15 days left', '#b07d00']].map(([name, days, color]) => (
                <div key={name} style={{ padding: '10px', background: '#f4f7f5', borderRadius: '8px' }}>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#1a2e1f' }}>{name}</div>
                  <div style={{ fontSize: '11px', color, marginTop: '2px' }}>⚠️ {days}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* FOOTER */}
      <footer style={{ background: '#0d1f14', color: 'rgba(255,255,255,0.6)', padding: '30px 40px', textAlign: 'center', marginTop: '40px' }}>
        <p style={{ fontSize: '12px' }}>© 2026 WorldScholarshipsAfrica.com — All rights reserved</p>
      </footer>

    </main>
  )
}
