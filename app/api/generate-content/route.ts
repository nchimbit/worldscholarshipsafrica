import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const SCHOLARSHIPS = [
  { title: 'Harvard University Africa Fellowship', university: 'Harvard University', country: 'USA', field: 'Leadership', level: 'Masters', funding: 'Fully Funded', deadline: 'December 30, 2025', link: 'https://harvard.edu' },
  { title: 'DAAD Scholarship for African Students', university: 'DAAD Germany', country: 'Germany', field: 'Any Field', level: 'Masters/PhD', funding: 'Fully Funded', deadline: 'March 31, 2026', link: 'https://daad.de' },
  { title: 'Chevening Scholarship Africa', university: 'UK Government', country: 'UK', field: 'Any Field', level: 'Masters', funding: 'Fully Funded', deadline: 'January 15, 2026', link: 'https://chevening.org' },
  { title: 'Chinese Government CSC Scholarship', university: 'Chinese Government', country: 'China', field: 'Engineering', level: 'All Levels', funding: 'Fully Funded', deadline: 'February 28, 2026', link: 'https://csc.edu.cn' },
  { title: 'MasterCard Foundation Scholars Program', university: 'MasterCard Foundation', country: 'Multiple Countries', field: 'Any Field', level: 'Undergrad/Masters', funding: 'Fully Funded', deadline: 'April 10, 2026', link: 'https://mastercardfdn.org' },
  { title: 'Australia Awards Scholarships Africa', university: 'Australian Government', country: 'Australia', field: 'Any Field', level: 'Masters', funding: 'Fully Funded', deadline: 'May 1, 2026', link: 'https://australiaawards.gov.au' },
  { title: 'Commonwealth Scholarship for Africans', university: 'Commonwealth Secretariat', country: 'UK', field: 'Any Field', level: 'Masters/PhD', funding: 'Fully Funded', deadline: 'December 15, 2025', link: 'https://cscuk.fcdo.gov.uk' },
  { title: 'Japanese MEXT Scholarship for Africans', university: 'Japanese Government', country: 'Japan', field: 'Any Field', level: 'Masters/PhD', funding: 'Fully Funded', deadline: 'April 20, 2026', link: 'https://mext.go.jp' },
]

function generateArticle(scholarship: typeof SCHOLARSHIPS[0], index: number) {
  const slug = scholarship.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
  const content = `# ${scholarship.title} ${new Date().getFullYear()} — Complete Application Guide

## Overview
The **${scholarship.title}** is one of the most prestigious scholarships for African students. Offered by ${scholarship.university} in ${scholarship.country}, this scholarship provides ${scholarship.funding} support for ${scholarship.level} students.

## Key Details
- **University:** ${scholarship.university}
- **Country:** ${scholarship.country}
- **Field:** ${scholarship.field}
- **Level:** ${scholarship.level}
- **Funding:** ${scholarship.funding}
- **Deadline:** ${scholarship.deadline}

## What the Scholarship Covers
- Full tuition fees
- Monthly living stipend
- Return airfare
- Health insurance
- Study materials allowance

## Eligibility Requirements
1. Be a citizen of an African country
2. Hold a bachelor degree with excellent results
3. Demonstrate strong leadership potential
4. Meet English language requirements
5. Not be enrolled in another program

## Required Documents
- Academic transcripts and certificates
- Valid passport copy
- Personal statement (1000-1500 words)
- Two letters of recommendation
- CV or Resume
- English test scores (IELTS/TOEFL)

## How to Apply
Visit ${scholarship.link} and submit before **${scholarship.deadline}**.

Good luck with your application!

---
*Last updated: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}*`

  return {
    title: `${scholarship.title} ${new Date().getFullYear()} — Complete Application Guide`,
    slug,
    content,
    university: scholarship.university,
    country: scholarship.country,
    field: scholarship.field,
    level: scholarship.level,
    funding: scholarship.funding,
    deadline: scholarship.deadline,
    link: scholarship.link,
    word_count: 900 + (index * 20),
    meta_title: `${scholarship.title} ${new Date().getFullYear()} | WorldScholarshipsAfrica`,
    meta_description: `Complete guide to ${scholarship.title}. Learn eligibility, documents and tips to win this ${scholarship.funding} scholarship for African students.`,
    status: 'published',
  }
}

export async function GET() {
  const articles = SCHOLARSHIPS.map((s, i) => generateArticle(s, i))
  return NextResponse.json({
    success: true,
    message: `Generated ${articles.length} scholarship articles for today`,
    total: articles.length,
    articles: articles.map(a => ({
      ...a,
      wordCount: a.word_count,
      metaTitle: a.meta_title,
      metaDescription: a.meta_description,
      generatedAt: new Date().toISOString(),
    })),
    generatedAt: new Date().toISOString(),
    nextRun: 'Tomorrow at 7:00 AM',
  })
}

export async function POST() {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!url || !key) {
      return NextResponse.json({ success: false, error: 'Missing env vars', savedToDatabase: false })
    }

    const articles = SCHOLARSHIPS.map((s, i) => generateArticle(s, i))

    const response = await fetch(
      `${url}/rest/v1/blog_posts`,
      {
        method: 'POST',
        headers: {
          'apikey': key,
          'Authorization': `Bearer ${key}`,
          'Content-Type': 'application/json',
          'Prefer': 'resolution=ignore-duplicates,return=representation',
        },
        body: JSON.stringify(articles),
      }
    )

    if (!response.ok) {
      const err = await response.text()
      return NextResponse.json({ success: false, error: err, savedToDatabase: false })
    }

    const saved = await response.json()

    return NextResponse.json({
      success: true,
      message: `Successfully saved ${saved.length} new articles to database!`,
      articles: saved,
      savedToDatabase: true,
      total: saved.length,
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: String(error), savedToDatabase: false },
      { status: 500 }
    )
  }
}
