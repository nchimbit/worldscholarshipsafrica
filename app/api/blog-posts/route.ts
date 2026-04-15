import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

    const supabase = createClient(supabaseUrl, supabaseKey)

    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      return NextResponse.json({ success: false, error: error.message })
    }

    const articles = (data || []).map(post => ({
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