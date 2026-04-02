'use client'
import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async () => {
    if (!email) {
      setError('Please enter your email address')
      return
    }
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin,
      },
    })
    if (error) {
      setError(error.message)
    } else {
      setSent(true)
    }
    setLoading(false)
  }

  return (
    <main style={{ fontFamily: 'sans-serif', background: '#f4f7f5', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      {/* NAVBAR */}
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 32px', height: '64px', background: '#fff', borderBottom: '1px solid #e0ece4', boxShadow: '0 2px 12px rgba(26,107,60,0.07)' }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg,#1a6b3c,#2d9e5f)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>🎓</div>
          <span style={{ fontFamily: 'Georgia,serif', fontSize: '17px', fontWeight: 700, color: '#1a6b3c' }}>World<span style={{ color: '#c9a84c' }}>Scholarships</span>Africa</span>
        </a>
      </nav>

      {/* LOGIN CARD */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
        <div style={{ background: '#fff', borderRadius: '20px', padding: '48px 40px', width: '100%', maxWidth: '440px', border: '1px solid #e0ece4', boxShadow: '0 8px 40px rgba(26,107,60,0.08)' }}>

          {/* Logo */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'linear-gradient(135deg,#0d1f14,#1a5c35)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', margin: '0 auto 16px' }}>🎓</div>
            <h1 style={{ fontFamily: 'Georgia,serif', fontSize: '24px', fontWeight: 700, color: '#1a2e1f', marginBottom: '8px' }}>Welcome Back!</h1>
            <p style={{ fontSize: '14px', color: '#6b8a72' }}>Sign in to access scholarships, save favourites and join the community</p>
          </div>

          {!sent ? (
            <>
              {/* Email Input */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#1a2e1f', marginBottom: '8px' }}>Email Address</label>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                  style={{ width: '100%', padding: '13px 16px', borderRadius: '10px', border: '1.5px solid #e0ece4', fontSize: '14px', outline: 'none', color: '#1a2e1f', fontFamily: 'sans-serif' }}
                />
              </div>

              {/* Error */}
              {error && (
                <div style={{ background: '#fde8e8', border: '1px solid #f0b8b8', borderRadius: '8px', padding: '10px 14px', marginBottom: '16px', fontSize: '13px', color: '#c0392b' }}>
                  ⚠️ {error}
                </div>
              )}

              {/* Submit Button */}
              <button
                onClick={handleLogin}
                disabled={loading}
                style={{ width: '100%', padding: '14px', background: loading ? '#6b8a72' : '#1a6b3c', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '15px', fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'sans-serif', marginBottom: '20px' }}
              >
                {loading ? 'Sending...' : 'Send Magic Link ✨'}
              </button>

              {/* Divider */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <div style={{ flex: 1, height: '1px', background: '#e0ece4' }}></div>
                <span style={{ fontSize: '12px', color: '#6b8a72' }}>How it works</span>
                <div style={{ flex: 1, height: '1px', background: '#e0ece4' }}></div>
              </div>

              {/* Steps */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  ['1️⃣', 'Enter your email above'],
                  ['2️⃣', 'Check your inbox for a magic link'],
                  ['3️⃣', 'Click the link to sign in instantly'],
                ].map(([num, text]) => (
                  <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 14px', background: '#f4f7f5', borderRadius: '8px' }}>
                    <span style={{ fontSize: '16px' }}>{num}</span>
                    <span style={{ fontSize: '13px', color: '#6b8a72' }}>{text}</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            /* SUCCESS STATE */
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '64px', marginBottom: '20px' }}>📧</div>
              <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '22px', fontWeight: 700, color: '#1a2e1f', marginBottom: '12px' }}>Check your email!</h2>
              <p style={{ fontSize: '14px', color: '#6b8a72', lineHeight: 1.7, marginBottom: '24px' }}>
                We sent a magic link to <strong style={{ color: '#1a6b3c' }}>{email}</strong>. Click the link in your email to sign in instantly!
              </p>
              <div style={{ background: '#e8f5ee', border: '1px solid #1a6b3c', borderRadius: '10px', padding: '14px', marginBottom: '20px' }}>
                <p style={{ fontSize: '13px', color: '#1a6b3c', fontWeight: 500 }}>✅ No password needed — just click the link!</p>
              </div>
              <button
                onClick={() => { setSent(false); setEmail('') }}
                style={{ fontSize: '13px', color: '#6b8a72', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
              >
                Use a different email
              </button>
            </div>
          )}

        </div>
      </div>

      {/* FOOTER */}
      <footer style={{ background: '#0d1f14', color: 'rgba(255,255,255,0.6)', padding: '20px 40px', textAlign: 'center' }}>
        <p style={{ fontSize: '12px' }}>© 2026 WorldScholarshipsAfrica.com — All rights reserved</p>
      </footer>

    </main>
  )
}
