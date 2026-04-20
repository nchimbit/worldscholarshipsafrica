import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!url || !key) {
      return NextResponse.json({
        success: false,
        error: `Missing vars: URL=${!!url} KEY=${!!key}`
      })
    }

    const response = await fetch(
      `${url}/rest/v1/blog_posts?select=*&order=created_at.desc`,
      {
        headers: {
          'apikey': key,
          'Authorization': `Bearer ${key}`,
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      }
    )

    if (!response.ok) {
      const err = await response.text()
      return NextResponse.json({ success: false, error: err })
    }

    const data = await response.json()

    const articles = (data || []).map((post: {
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
      word_count: number
      created_at: string
      meta_title: string
      meta_description: string
      status: string
    }) => ({
      title: post.title,
      slug: post.slug,
      content: post.content || '',
      university: post.university,
      country: post.country,
      field: post.field,
      level: post.level,
      funding: post.funding,
      deadline: post.deadline,
      link: post.link || '#',
      wordCount: post.word_count || 900,
      generatedAt: post.created_at,
      metaTitle: post.meta_title || post.title,
      metaDescription: post.meta_description || '',
      status: post.status,
    }))

    return NextResponse.json({
      success: true,
      total: articles.length,
      articles,
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    )
  }
}