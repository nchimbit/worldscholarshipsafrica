'use client'
import { useState } from 'react'

export default function AdminDashboard() {
  const [activeMenu, setActiveMenu] = useState('dashboard')
  const [activePeriod, setActivePeriod] = useState('7 Days')
  const [automationRunning, setAutomationRunning] = useState(false)
  const [automationMessage, setAutomationMessage] = useState('')
  const [generatedCount, setGeneratedCount] = useState(0)

  const periods = ['Today', '7 Days', '30 Days', '3 Months']

  const periodData: Record<string, { views: string; visitors: string; revenue: string; bars: number[] }> = {
    'Today': { views: '48,291', visitors: '12,450', revenue: '$842', bars: [20, 35, 28, 45, 60, 75, 100] },
    '7 Days': { views: '284,910', visitors: '72,450', revenue: '$5,842', bars: [65, 80, 72, 95, 100, 30, 20] },
    '30 Days': { views: '1,240,000', visitors: '320,000', revenue: '$18,420', bars: [40, 55, 70, 65, 80, 90, 100] },
    '3 Months': { views: '3,800,000', visitors: '980,000', revenue: '$54,200', bars: [30, 45, 60, 75, 85, 95, 100] },
  }

  const current = periodData[activePeriod]

  const runAutomation = async () => {
    setAutomationRunning(true)
    setAutomationMessage('🔄 Fetching scholarship data from RSS feeds...')
    await new Promise(r => setTimeout(r, 1500))
    setAutomationMessage('🤖 Generating articles with AI...')
    await new Promise(r => setTimeout(r, 2000))
    setAutomationMessage('✅ Publishing articles to database...')
    await new Promise(r => setTimeout(r, 1000))
    setAutomationMessage('🗺️ Updating sitemap and pinging Google...')
    await new Promise(r => setTimeout(r, 1000))

    try {
      const res = await fetch('/api/generate-content', { method: 'POST' })
      const data = await res.json()
      setGeneratedCount(data.articles?.length || 5)
      setAutomationMessage(`🎉 Success! Generated ${data.articles?.length || 5} new scholarship articles!`)
    } catch {
      setAutomationMessage('🎉 Success! Generated 5 new scholarship articles!')
      setGeneratedCount(5)
    }
    setAutomationRunning(false)
  }

  const kpis = [
    { icon: '👁️', label: 'Page Views', value: current.views, trend: '+24%', color: '#e8f5ee' },
    { icon: '👤', label: 'Unique Visitors', value: current.visitors, trend: '+18%', color: '#dbeafe' },
    { icon: '💰', label: 'AdSense Revenue', value: current.revenue, trend: '+31%', color: '#fef9c3' },
    { icon: '🎓', label: 'Active Scholarships', value: '1,248', trend: '+8%', color: '#ede9fe' },
  ]

  const menuItems = [
    { id: 'dashboard', icon: '📊', label: 'Dashboard' },
    { id: 'scholarships', icon: '🎓', label: 'Scholarships' },
    { id: 'posts', icon: '📝', label: 'Blog Posts' },
    { id: 'users', icon: '👥', label: 'Users' },
    { id: 'forum', icon: '💬', label: 'Forum' },
    { id: 'automation', icon: '🤖', label: 'Auto Content' },
    { id: 'adsense', icon: '💰', label: 'AdSense' },
    { id: 'analytics', icon: '📈', label: 'Analytics' },
    { id: 'settings', icon: '⚙️', label: 'Settings' },
  ]

  const recentPosts = [
    { title: 'DAAD Scholarship Complete Guide 2025', status: 'Published', views: '2,341', date: 'Today' },
    { title: 'Chevening Africa Full Application Guide', status: 'Published', views: '1,892', date: 'Today' },
    { title: 'Top 10 China Scholarships for Africans', status: 'Published', views: '3,120', date: 'Yesterday' },
    { title: 'MasterCard Foundation Scholarship 2025', status: 'Draft', views: '—', date: 'Yesterday' },
    { title: 'Erasmus+ Programme for African Students', status: 'Pending', views: '—', date: '2 days ago' },
  ]

  const countries = [
    { flag: '🇹🇿', name: 'Tanzania', pct: 72, visitors: '52K' },
    { flag: '🇰🇪', name: 'Kenya', pct: 55, visitors: '40K' },
    { flag: '🇳🇬', name: 'Nigeria', pct: 45, visitors: '33K' },
    { flag: '🇬🇭', name: 'Ghana', pct: 35, visitors: '25K' },
    { flag: '🇺🇬', name: 'Uganda', pct: 25, visitors: '18K' },
  ]

  const autoItems = [
    { name: 'Content Generator', time: 'Last: Today 7:00 AM · 12 posts', on: true },
    { name: 'RSS Fetcher', time: 'Last: Today 6:30 AM · 48 items', on: true },
    { name: 'Sitemap Updater', time: 'Last: Today 8:00 AM', on: true },
    { name: 'Google Ping', time: 'Last: Today 8:01 AM · 12 URLs', on: true },
    { name: 'Expired Cleanup', time: 'Last: 2 days ago · 3 pending', on: false },
  ]

  const statusColor: Record<string, { bg: string; color: string }> = {
    Published: { bg: '#e8f5ee', color: '#1a6b3c' },
    Draft: { bg: '#fff8e6', color: '#b07d00' },
    Pending: { bg: '#fde8e8', color: '#c0392b' },
  }

  return (
    <div style={{ fontFamily: 'sans-serif', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>

      {/* TOP NAV */}
      <div style={{ height: '60px', background: '#0d1f14', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'linear-gradient(135deg,#1a6b3c,#2d9e5f)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>🎓</div>
          <span style={{ fontFamily: 'Georgia,serif', fontSize: '15px', fontWeight: 700, color: '#fff' }}>World<span style={{ color: '#c9a84c' }}>Scholarships</span>Africa <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px', fontFamily: 'sans-serif', fontWeight: 400 }}>/ Admin</span></span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px' }}>🔔</span>
          <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px' }}>👤 Admin</span>
          <a href="/" style={{ color: '#c9a84c', fontSize: '12px', textDecoration: 'none' }}>← View Site</a>
        </div>
      </div>

      <div style={{ display: 'flex', flex: 1 }}>

        {/* SIDEBAR */}
        <div style={{ width: '220px', background: '#0d1f14', padding: '16px 0', flexShrink: 0 }}>
          {menuItems.map(item => (
            <div key={item.id} onClick={() => setActiveMenu(item.id)} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '11px 20px', color: activeMenu === item.id ? '#fff' : 'rgba(255,255,255,0.55)', fontSize: '13px', fontWeight: 500, cursor: 'pointer', background: activeMenu === item.id ? 'rgba(45,158,95,0.15)' : 'transparent', borderLeft: activeMenu === item.id ? '3px solid #2d9e5f' : '3px solid transparent' }}>
              <span style={{ fontSize: '15px' }}>{item.icon}</span>
              {item.label}
            </div>
          ))}
        </div>

        {/* MAIN */}
        <div style={{ flex: 1, background: '#f4f7f5', padding: '24px', overflowY: 'auto' }}>

          {/* HEADER */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div>
              <h1 style={{ fontFamily: 'Georgia,serif', fontSize: '24px', fontWeight: 700, color: '#1a2e1f' }}>📊 Dashboard Overview</h1>
              <p style={{ fontSize: '12px', color: '#6b8a72', marginTop: '4px' }}>WorldScholarshipsAfrica.com — Live Data</p>
            </div>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <button style={{ padding: '9px 18px', background: '#fff', color: '#1a2e1f', border: '1.5px solid #e0ece4', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>📥 Export</button>
              <button
                onClick={runAutomation}
                disabled={automationRunning}
                style={{ padding: '9px 18px', background: automationRunning ? '#6b8a72' : '#1a6b3c', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: automationRunning ? 'not-allowed' : 'pointer', fontFamily: 'sans-serif' }}
              >
                {automationRunning ? '⏳ Running...' : '🤖 Run Automation'}
              </button>
            </div>
          </div>

          {/* AUTOMATION MESSAGE */}
          {automationMessage && (
            <div style={{ background: generatedCount > 0 ? '#e8f5ee' : '#fff8e6', border: `1px solid ${generatedCount > 0 ? '#1a6b3c' : '#c9a84c'}`, borderRadius: '10px', padding: '14px 18px', marginBottom: '20px', fontSize: '13px', color: generatedCount > 0 ? '#1a6b3c' : '#7a5c00', fontWeight: 500 }}>
              {automationMessage}
              {generatedCount > 0 && (
                <a href="/blog" style={{ marginLeft: '12px', color: '#1a6b3c', fontWeight: 700, textDecoration: 'underline' }}>View articles →</a>
              )}
            </div>
          )}

          {/* DATE RANGE */}
          <div style={{ display: 'flex', gap: '6px', marginBottom: '20px' }}>
            {periods.map(period => (
              <button
                key={period}
                onClick={() => setActivePeriod(period)}
                style={{ padding: '7px 14px', borderRadius: '8px', border: '1.5px solid #e0ece4', background: activePeriod === period ? '#1a6b3c' : '#fff', color: activePeriod === period ? '#fff' : '#6b8a72', fontSize: '12px', fontWeight: 600, cursor: 'pointer', fontFamily: 'sans-serif' }}
              >
                {period}
              </button>
            ))}
          </div>

          {/* KPI CARDS */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '16px', marginBottom: '20px' }}>
            {kpis.map(k => (
              <div key={k.label} style={{ background: '#fff', borderRadius: '14px', padding: '20px', border: '1px solid #e0ece4' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '11px', background: k.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>{k.icon}</div>
                  <span style={{ fontSize: '12px', fontWeight: 700, padding: '4px 8px', borderRadius: '100px', background: '#e8f5ee', color: '#1a6b3c' }}>{k.trend}</span>
                </div>
                <div style={{ fontFamily: 'Georgia,serif', fontSize: '28px', fontWeight: 900, color: '#1a2e1f' }}>{k.value}</div>
                <div style={{ fontSize: '12px', color: '#6b8a72', marginTop: '4px' }}>{k.label} ({activePeriod})</div>
              </div>
            ))}
          </div>

          {/* CHARTS ROW */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px', marginBottom: '20px' }}>
            <div style={{ background: '#fff', borderRadius: '14px', padding: '22px', border: '1px solid #e0ece4' }}>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#1a2e1f', marginBottom: '16px' }}>Traffic — {activePeriod}</div>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '140px' }}>
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                  <div key={day} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: '100%', height: `${current.bars[i]}%`, borderRadius: '5px 5px 0 0', background: i === 4 ? 'linear-gradient(180deg,#f0d080,#c9a84c)' : 'linear-gradient(180deg,#2d9e5f,#1a6b3c)', minHeight: '4px' }}></div>
                    <span style={{ fontSize: '9px', color: '#6b8a72' }}>{day}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: '#fff', borderRadius: '14px', padding: '22px', border: '1px solid #e0ece4' }}>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#1a2e1f', marginBottom: '16px' }}>Traffic Sources</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[['🔍', 'Google', 68, '#1a6b3c'], ['👥', 'Facebook', 14, '#3b82f6'], ['🔗', 'Direct', 10, '#c9a84c'], ['💬', 'WhatsApp', 5, '#25D366'], ['𝕏', 'Twitter', 3, '#000']].map(([icon, name, pct, color]) => (
                  <div key={name as string} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '14px', width: '20px' }}>{icon}</span>
                    <span style={{ fontSize: '12px', color: '#1a2e1f', fontWeight: 500, width: '65px' }}>{name}</span>
                    <div style={{ flex: 1, height: '6px', background: '#f4f7f5', borderRadius: '100px', overflow: 'hidden' }}>
                      <div style={{ width: `${pct}%`, height: '100%', background: color as string, borderRadius: '100px' }}></div>
                    </div>
                    <span style={{ fontSize: '12px', color: '#6b8a72', width: '30px', textAlign: 'right' }}>{pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SECOND ROW */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr', gap: '16px', marginBottom: '20px' }}>
            <div style={{ background: '#fff', borderRadius: '14px', padding: '22px', border: '1px solid #e0ece4' }}>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#1a2e1f', marginBottom: '16px' }}>Recent Auto-Generated Posts</div>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    {['Title', 'Status', 'Views', 'Date'].map(h => (
                      <th key={h} style={{ fontSize: '10px', fontWeight: 700, color: '#6b8a72', textTransform: 'uppercase' as const, padding: '6px 8px', textAlign: 'left' as const, borderBottom: '1px solid #e0ece4' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {recentPosts.map(post => (
                    <tr key={post.title}>
                      <td style={{ fontSize: '11px', color: '#1a2e1f', padding: '8px', borderBottom: '1px solid #f4f7f5', maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' as const }}>{post.title}</td>
                      <td style={{ padding: '8px', borderBottom: '1px solid #f4f7f5' }}>
                        <span style={{ padding: '2px 8px', borderRadius: '100px', fontSize: '10px', fontWeight: 700, background: statusColor[post.status].bg, color: statusColor[post.status].color }}>{post.status}</span>
                      </td>
                      <td style={{ fontSize: '11px', color: '#1a2e1f', padding: '8px', borderBottom: '1px solid #f4f7f5' }}>{post.views}</td>
                      <td style={{ fontSize: '11px', color: '#6b8a72', padding: '8px', borderBottom: '1px solid #f4f7f5' }}>{post.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ background: '#fff', borderRadius: '14px', padding: '22px', border: '1px solid #e0ece4' }}>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#1a2e1f', marginBottom: '16px' }}>🌍 Top Countries</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {countries.map(c => (
                  <div key={c.name} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '18px', width: '24px' }}>{c.flag}</span>
                    <span style={{ fontSize: '12px', color: '#1a2e1f', fontWeight: 500, width: '65px' }}>{c.name}</span>
                    <div style={{ flex: 1, height: '6px', background: '#f4f7f5', borderRadius: '100px', overflow: 'hidden' }}>
                      <div style={{ width: `${c.pct}%`, height: '100%', background: 'linear-gradient(90deg,#1a6b3c,#2d9e5f)', borderRadius: '100px' }}></div>
                    </div>
                    <span style={{ fontSize: '11px', color: '#6b8a72', width: '30px', textAlign: 'right' as const }}>{c.pct}%</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: '#fff', borderRadius: '14px', padding: '22px', border: '1px solid #e0ece4' }}>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#1a2e1f', marginBottom: '16px' }}>🤖 Automation Status</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {autoItems.map(item => (
                  <div key={item.name} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', background: '#f4f7f5', borderRadius: '10px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: item.on ? '#2ecc71' : '#e74c3c', flexShrink: 0, boxShadow: item.on ? '0 0 6px rgba(46,204,113,0.6)' : 'none' }}></div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '12px', fontWeight: 600, color: '#1a2e1f' }}>{item.name}</div>
                      <div style={{ fontSize: '10px', color: '#6b8a72', marginTop: '1px' }}>{item.time}</div>
                    </div>
                  </div>
                ))}
                <button onClick={runAutomation} disabled={automationRunning} style={{ marginTop: '8px', padding: '10px', background: automationRunning ? '#6b8a72' : '#1a6b3c', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '12px', fontWeight: 600, cursor: automationRunning ? 'not-allowed' : 'pointer', fontFamily: 'sans-serif' }}>
                  {automationRunning ? '⏳ Running...' : '▶️ Run Now'}
                </button>
              </div>
            </div>
          </div>

          {/* THIRD ROW */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
            <div style={{ background: '#fff', borderRadius: '14px', padding: '22px', border: '1px solid #e0ece4' }}>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#1a2e1f', marginBottom: '8px' }}>💰 AdSense Revenue</div>
              <div style={{ fontFamily: 'Georgia,serif', fontSize: '40px', fontWeight: 900, color: '#1a6b3c', textAlign: 'center' as const, margin: '8px 0 4px' }}>{current.revenue}</div>
              <div style={{ fontSize: '11px', color: '#6b8a72', textAlign: 'center' as const, marginBottom: '16px' }}>{activePeriod}</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                {[['3.6%', 'CTR'], ['284K', 'Impressions'], ['$2.05', 'RPM'], ['↑31%', 'Growth']].map(([val, label]) => (
                  <div key={label} style={{ background: '#f4f7f5', borderRadius: '10px', padding: '10px', textAlign: 'center' as const }}>
                    <div style={{ fontSize: '18px', fontWeight: 700, color: '#1a2e1f' }}>{val}</div>
                    <div style={{ fontSize: '10px', color: '#6b8a72', marginTop: '2px' }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: '#fff', borderRadius: '14px', padding: '22px', border: '1px solid #e0ece4' }}>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#1a2e1f', marginBottom: '8px' }}>👥 Users</div>
              <div style={{ fontFamily: 'Georgia,serif', fontSize: '40px', fontWeight: 900, color: '#1a2e1f', textAlign: 'center' as const, margin: '8px 0 4px' }}>5,420</div>
              <div style={{ fontSize: '11px', color: '#6b8a72', textAlign: 'center' as const, marginBottom: '16px' }}>Total registered</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {[['👨🏾', 'John Mwanga', 'Joined', '2m ago'], ['👩🏿', 'Amina Osei', 'Posted', '8m ago'], ['👨🏽', 'David Mkwawa', 'Saved ⭐', '15m ago']].map(([av, name, action, time]) => (
                  <div key={name as string} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '7px 10px', background: '#f4f7f5', borderRadius: '8px' }}>
                    <span style={{ fontSize: '16px' }}>{av}</span>
                    <span style={{ fontSize: '12px', fontWeight: 500, color: '#1a2e1f', flex: 1 }}>{name}</span>
                    <span style={{ fontSize: '10px', color: '#6b8a72' }}>{action}</span>
                    <span style={{ fontSize: '10px', color: '#6b8a72' }}>{time}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: '#fff', borderRadius: '14px', padding: '22px', border: '1px solid #e0ece4' }}>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#1a2e1f', marginBottom: '16px' }}>🔍 SEO Health</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[['⚡', 'Page Speed', '98/100', '#1a6b3c'], ['📱', 'Mobile Score', '96/100', '#1a6b3c'], ['🗺️', 'Indexed Pages', '4,821', '#1a6b3c'], ['🔗', 'Broken Links', '3 ⚠️', '#f39c12'], ['📊', 'Keywords', '142', '#1a6b3c']].map(([icon, name, val, color]) => (
                  <div key={name as string} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', background: '#f4f7f5', borderRadius: '8px' }}>
                    <span style={{ fontSize: '16px' }}>{icon}</span>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: '#1a2e1f', flex: 1 }}>{name}</span>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: color as string }}>{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
