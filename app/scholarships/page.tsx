export default function ScholarshipsPage() {
  const scholarships = [
    { id: 1, logo: '🏛️', uni: 'Harvard University', country: '🇺🇸 USA', title: 'Harvard Africa Leaders Fellowship 2025', field: 'Leadership', level: 'Masters', funding: 'Fully Funded', deadline: 'Dec 30, 2025', bg: '#e8f0fb' },
    { id: 2, logo: '🎓', uni: 'University of Oxford', country: '🇬🇧 UK', title: 'Chevening Scholarship for African Students 2025', field: 'Any Field', level: 'Masters', funding: 'Fully Funded', deadline: 'Jan 15, 2026', bg: '#f0e8fb' },
    { id: 3, logo: '🌏', uni: 'Chinese Govt (CSC)', country: '🇨🇳 China', title: 'CSC Scholarship for African Students 2025', field: 'Engineering', level: 'All Levels', funding: 'Fully Funded', deadline: 'Feb 28, 2026', bg: '#fbe8e8' },
    { id: 4, logo: '🇩🇪', uni: 'DAAD Germany', country: '🇩🇪 Germany', title: 'DAAD Scholarship for African Students 2025', field: 'Any Field', level: 'Masters/PhD', funding: 'Fully Funded', deadline: 'Mar 31, 2026', bg: '#e8f5ee' },
    { id: 5, logo: '💳', uni: 'MasterCard Foundation', country: '🌍 Multiple', title: 'MasterCard Foundation Scholars Program 2025', field: 'Any Field', level: 'Undergrad/Masters', funding: 'Fully Funded', deadline: 'Apr 10, 2026', bg: '#fff3e0' },
    { id: 6, logo: '🇦🇺', uni: 'Australian Govt', country: '🇦🇺 Australia', title: 'Australia Awards Scholarships for Africa 2025', field: 'Any Field', level: 'Masters', funding: 'Fully Funded', deadline: 'May 1, 2026', bg: '#e8f0fb' },
  ]

  return (
    <main style={{ fontFamily: 'sans-serif', background: '#f4f7f5', minHeight: '100vh' }}>

      {/* NAVBAR */}
      <nav style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 32px', height: '64px', background: '#fff',
        borderBottom: '1px solid #e0ece4', position: 'sticky', top: 0, zIndex: 100,
        boxShadow: '0 2px 12px rgba(26,107,60,0.07)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg,#1a6b3c,#2d9e5f)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>🎓</div>
          <span style={{ fontFamily: 'Georgia,serif', fontSize: '17px', fontWeight: 700, color: '#1a6b3c' }}>
            World<span style={{ color: '#c9a84c' }}>Scholarships</span>Africa
          </span>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          {['Home', 'Scholarships', 'Forum', 'Blog'].map(item => (
            <a key={item} href={item === 'Home' ? '/' : '#'} style={{ padding: '7px 13px', borderRadius: '8px', textDecoration: 'none', color: item === 'Scholarships' ? '#1a6b3c' : '#6b8a72', fontSize: '13px', fontWeight: item === 'Scholarships' ? 600 : 500, background: item === 'Scholarships' ? '#e8f5ee' : 'transparent' }}>{item}</a>
          ))}
        </div>
        <button style={{ padding: '8px 16px', borderRadius: '8px', background: '#1a6b3c', color: '#fff', border: 'none', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Sign in with Google</button>
      </nav>

      {/* PAGE HEADER */}
      <div style={{ background: 'linear-gradient(135deg,#0d1f14,#1a5c35)', padding: '40px 40px 50px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{ fontFamily: 'Georgia,serif', fontSize: '36px', fontWeight: 900, color: '#fff', marginBottom: '8px' }}>
            All <span style={{ color: '#f0d080' }}>Scholarships</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', marginBottom: '20px' }}>1,248 active scholarships — updated daily</p>
          <div style={{ display: 'flex', background: '#fff', borderRadius: '10px', overflow: 'hidden', maxWidth: '600px' }}>
            <input type="text" placeholder="Search scholarships, universities, countries..." style={{ flex: 1, padding: '13px 16px', border: 'none', outline: 'none', fontSize: '14px' }} />
            <button style={{ padding: '13px 24px', background: '#1a6b3c', border: 'none', color: '#fff', fontWeight: 600, fontSize: '14px', cursor: 'pointer' }}>Search</button>
          </div>
        </div>
      </div>

      {/* MAIN LAYOUT */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px 40px', display: 'grid', gridTemplateColumns: '260px 1fr', gap: '24px' }}>

        {/* FILTER SIDEBAR */}
        <div style={{ background: '#fff', borderRadius: '14px', padding: '20px', border: '1px solid #e0ece4', height: 'fit-content', position: 'sticky', top: '80px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <span style={{ fontSize: '15px', fontWeight: 700, color: '#1a2e1f' }}>Filters</span>
            <span style={{ fontSize: '12px', color: '#1a6b3c', cursor: 'pointer', fontWeight: 500 }}>Clear All</span>
          </div>

          {/* Funding Type */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#6b8a72', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' }}>Funding Type</div>
            {['Fully Funded', 'Partial Funding', 'Tuition Only'].map(type => (
              <label key={type} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '6px 10px', borderRadius: '8px', cursor: 'pointer', marginBottom: '4px' }}>
                <input type="checkbox" style={{ accentColor: '#1a6b3c', width: '15px', height: '15px' }} />
                <span style={{ fontSize: '13px', color: '#1a2e1f' }}>{type}</span>
              </label>
            ))}
          </div>

          {/* Study Level */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#6b8a72', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' }}>Study Level</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {['All', 'Undergrad', 'Masters', 'PhD', 'Short Course'].map(level => (
                <button key={level} style={{ padding: '5px 12px', borderRadius: '100px', border: '1.5px solid #e0ece4', background: level === 'All' ? '#1a6b3c' : '#fff', color: level === 'All' ? '#fff' : '#6b8a72', fontSize: '12px', fontWeight: 500, cursor: 'pointer' }}>{level}</button>
              ))}
            </div>
          </div>

          {/* Destination */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#6b8a72', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' }}>Destination</div>
            {[['🇺🇸', 'USA', '145'], ['🇬🇧', 'UK', '132'], ['🇨🇳', 'China', '98'], ['🇩🇪', 'Germany', '87'], ['🇦🇺', 'Australia', '76']].map(([flag, country, count]) => (
              <label key={country} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '6px 10px', borderRadius: '8px', cursor: 'pointer', marginBottom: '4px' }}>
                <input type="checkbox" style={{ accentColor: '#1a6b3c', width: '15px', height: '15px' }} />
                <span style={{ fontSize: '13px', color: '#1a2e1f', flex: 1 }}>{flag} {country}</span>
                <span style={{ fontSize: '11px', color: '#6b8a72' }}>{count}</span>
              </label>
            ))}
          </div>

          {/* Field */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#6b8a72', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' }}>Field of Study</div>
            {[['🏥', 'Medicine'], ['⚙️', 'Engineering'], ['💼', 'Business'], ['💻', 'Technology'], ['🎨', 'Arts']].map(([icon, field]) => (
              <label key={field} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '6px 10px', borderRadius: '8px', cursor: 'pointer', marginBottom: '4px' }}>
                <input type="checkbox" style={{ accentColor: '#1a6b3c', width: '15px', height: '15px' }} />
                <span style={{ fontSize: '13px', color: '#1a2e1f' }}>{icon} {field}</span>
              </label>
            ))}
          </div>

          {/* Deadline */}
          <div>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#6b8a72', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' }}>Deadline</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {['This Month', '3 Months', '6 Months', 'Any'].map(d => (
                <button key={d} style={{ padding: '5px 12px', borderRadius: '100px', border: '1.5px solid #e0ece4', background: d === '3 Months' ? '#1a6b3c' : '#fff', color: d === '3 Months' ? '#fff' : '#6b8a72', fontSize: '12px', fontWeight: 500, cursor: 'pointer' }}>{d}</button>
              ))}
            </div>
          </div>
        </div>

        {/* SCHOLARSHIP LIST */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
            <span style={{ fontSize: '13px', color: '#6b8a72' }}>Showing <strong style={{ color: '#1a6b3c' }}>1,248 scholarships</strong></span>
            <select style={{ padding: '9px 12px', borderRadius: '8px', border: '1.5px solid #e0ece4', fontSize: '13px', color: '#1a2e1f', background: '#fff', outline: 'none', cursor: 'pointer' }}>
              <option>Latest First</option>
              <option>Deadline Soon</option>
              <option>Most Popular</option>
            </select>
          </div>

          {/* Active Filters */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
            {['Fully Funded', '🇺🇸 USA', '3 Months'].map(filter => (
              <div key={filter} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '5px 12px', background: '#e8f5ee', border: '1px solid #1a6b3c', borderRadius: '100px', fontSize: '12px', color: '#1a6b3c', fontWeight: 500 }}>
                {filter} <span style={{ cursor: 'pointer', fontSize: '14px' }}>✕</span>
              </div>
            ))}
          </div>

          {/* Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {scholarships.map(s => (
              <div key={s.id} style={{ background: '#fff', border: '1.5px solid #e0ece4', borderRadius: '14px', padding: '20px', display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: '16px', alignItems: 'center' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '12px', background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px', flexShrink: 0 }}>{s.logo}</div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '15px', fontWeight: 600, color: '#1a2e1f' }}>{s.title}</span>
                    <span style={{ padding: '3px 10px', borderRadius: '100px', fontSize: '10px', fontWeight: 700, background: '#e8f5ee', color: '#1a6b3c' }}>{s.funding}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                    {[['🏛️', s.uni], ['📍', s.country], ['🎓', s.level], ['📚', s.field]].map(([icon, val]) => (
                      <span key={val} style={{ fontSize: '12px', color: '#6b8a72', display: 'flex', alignItems: 'center', gap: '4px' }}>{icon} {val}</span>
                    ))}
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-end', flexShrink: 0 }}>
                  <div style={{ fontSize: '11px', color: '#6b8a72' }}>Deadline: <strong style={{ color: '#e05c2a' }}>{s.deadline}</strong></div>
                  <button style={{ padding: '9px 20px', background: '#1a6b3c', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }}>Apply Now</button>
                  <button style={{ padding: '7px 14px', background: 'transparent', color: '#1a6b3c', border: '1.5px solid #1a6b3c', borderRadius: '8px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>♡ Save</button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginTop: '28px' }}>
            {[1, 2, 3, 4, 5, '...', 48].map((p, i) => (
              <button key={i} style={{ width: '36px', height: '36px', borderRadius: '8px', border: '1.5px solid #e0ece4', background: p === 1 ? '#1a6b3c' : '#fff', color: p === 1 ? '#fff' : '#6b8a72', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>{p}</button>
            ))}
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
