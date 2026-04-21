import { NextResponse } from 'next/server'
export const dynamic = 'force-dynamic'
export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return NextResponse.json({ success: false, error: 'Missing env vars' })
  const res = await fetch(`${url}/rest/v1/blog_posts?select=*&order=created_at.desc`, { headers: { 'apikey': key, 'Authorization': `Bearer ${key}` }, cache: 'no-store' })
  const data = await res.json()
  const articles = data.map((p: Record<string, string | number>) => ({ title: p.title, slug: p.slug, content: p.content || '', university: p.university, country: p.country, field: p.field, level: p.level, funding: p.funding, deadline: p.deadline, link: p.link || '#', wordCount: p.word_count || 900, generatedAt: p.created_at, metaTitle: p.meta_title || p.title, metaDescription: p.meta_description || '', status: p.status }))
  return NextResponse.json({ success: true, total: articles.length, articles })
}
