import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const SCHOLARSHIPS = [
  { title: 'Harvard University Africa Fellowship', university: 'Harvard University', country: 'USA', field: 'Leadership', level: 'Masters', funding: 'Fully Funded', deadline: 'December 30, 2025', link: 'https://harvard.edu', description: 'Prestigious fellowship for outstanding African leaders at Harvard University.' },
  { title: 'DAAD Scholarship for African Students', university: 'DAAD Germany', country: 'Germany', field: 'Any Field', level: 'Masters/PhD', funding: 'Fully Funded', deadline: 'March 31, 2026', link: 'https://daad.de', description: 'German Academic Exchange Service scholarship for African students.' },
  { title: 'Chevening Scholarship Africa', university: 'UK Government', country: 'UK', field: 'Any Field', level: 'Masters', funding: 'Fully Funded', deadline: 'January 15, 2026', link: 'https://chevening.org', description: 'UK flagship scholarship for outstanding African professionals.' },
  { title: 'Chinese Government CSC Scholarship', university: 'Chinese Government', country: 'China', field: 'Engineering', level: 'All Levels', funding: 'Fully Funded', deadline: 'February 28, 2026', link: 'https://csc.edu.cn', description: 'Full scholarship from Chinese government for African students.' },
  { title: 'MasterCard Foundation Scholars Program', university: 'MasterCard Foundation', country: 'Multiple Countries', field: 'Any Field', level: 'Undergrad/Masters', funding: 'Fully Funded', deadline: 'April 10, 2026', link: 'https://mastercardfdn.org', description: 'Transformative scholarship for talented young Africans.' },
  { title: 'Australia Awards Scholarships Africa', university: 'Australian Government', country: 'Australia', field: 'Any Field', level: 'Masters', funding: 'Fully Funded', deadline: 'May 1, 2026', link: 'https://australiaawards.gov.au', description: 'Australian government scholarships for African students.' },
  { title: 'Commonwealth Scholarship for Africans', university: 'Commonwealth Secretariat', country: 'UK', field: 'Any Field', level: 'Masters/PhD', funding: 'Fully Funded', deadline: 'December 15, 2025', link: 'https://cscuk.fcdo.gov.uk', description: 'Commonwealth scholarships for African students to study in the UK.' },
  { title: 'Japanese MEXT Scholarship for Africans', university: 'Japanese Government', country: 'Japan', field: 'Any Field', level: 'Masters/PhD', funding: 'Fully Funded', deadline: 'April 20, 2026', link: 'https://mext.go.jp', description: 'Japanese government scholarship for African students.' },
]

function generateArticle(scholarship: typeof SCHOLARSHIPS[0]) {
  const slug = `${scholarship.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${Date.now()}`

  const content = `
# ${scholarship.title} ${new Date().getFullYear()} — Complete Application Guide

## Overview

The **${scholarship.title}** is one of the most prestigious scholarship opportunities for African students in ${new Date().getFullYear()}. Offered by ${scholarship.university} in ${scholarship.country}, this scholarship provides ${scholarship.funding} support for ${scholarship.level} students.

## About the Scholarship

${scholarship.description} This program has been supporting African students for many years, helping talented individuals from across the continent access world-class education.

**Key Details:**
- **University:** ${scholarship.university}
- **Country:** ${scholarship.country}
- **Field:** ${scholarship.field}
- **Level:** ${scholarship.level}
- **Funding:** ${scholarship.funding}
- **Deadline:** ${scholarship.deadline}

## What Does the Scholarship Cover?

As a ${scholarship.funding} scholarship, this program covers:

- Full tuition fees for the entire program
- Monthly living stipend
- Return airfare from your home country
- Health insurance coverage
- Research and study materials allowance

## Eligibility Requirements

1. Be a citizen of an African country
2. Hold a bachelor's degree with excellent results
3. Demonstrate strong leadership potential
4. Meet English language requirements
5. Not be currently enrolled in another program

## Required Documents

- Completed online application form
- Academic transcripts and certificates
- Valid passport copy
- Personal statement (1000-1500 words)
- Two letters of recommendation
- Curriculum Vitae (CV)
- English language test scores (IELTS/TOEFL)

## Application Process

**Step 1:** Visit ${scholarship.link} and create an account.
**Step 2:** Complete the online application form.
**Step 3:** Upload all required documents.
**Step 4:** Write a compelling personal statement.
**Step 5:** Request letters of recommendation early.
**Step 6:** Submit before **${scholarship.deadline}**.

## Tips for Success

- Start preparing at least 3 months before the deadline
- Focus your personal statement on specific achievements
- Choose referees who know you well
- Research the program thoroughly
- Proofread everything carefully

## How to Apply

Visit the official portal at: ${scholarship.link}

Good luck with your application!

---

*Last updated: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}*
  `.trim()

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
    word_count: content.split(' ').length,
    meta_title: `${scholarship.title} ${new Date().getFullYear()} | WorldScholarshipsAfrica`,
    meta_description: `Complete guide to ${scholarship.title}. Learn eligibility, documents, and tips to win this ${scholarship.funding} scholarship for African students.`,
    status: 'published',
  }
}

export async function GET() {
  try {
    const { data: existing, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(20)

    if (error) throw error

    if (existing && existing.length > 0) {
      return NextResponse.json({
        success: true,
        message: `Found ${existing.length} articles in database`,
        articles: existing.map(p => ({
          title: p.title,
          slug: p.slug,
          content: p.content,
          university: p.university,
          country: p.country,
          field: p.field,
          level: p.level,
          funding: p.funding,
          deadline: p.deadline,
          link: p.link,
          wordCount: p.word_count,
          metaTitle: p.meta_title,
          metaDescription: p.meta_description,
          generatedAt: p.created_at,
        })),
      })
    }

    const articles = SCHOLARSHIPS.map(s => generateArticle(s))
    return NextResponse.json({
      success: true,
      message: `Generated ${articles.length} articles`,
      articles: articles.map(a => ({
        ...a,
        wordCount: a.word_count,
        metaTitle: a.meta_title,
        metaDescription: a.meta_description,
        generatedAt: new Date().toISOString(),
      })),
    })
  } catch {
    const articles = SCHOLARSHIPS.map(s => generateArticle(s))
    return NextResponse.json({
      success: true,
      articles: articles.map(a => ({
        ...a,
        wordCount: a.word_count,
        metaTitle: a.meta_title,
        metaDescription: a.meta_description,
        generatedAt: new Date().toISOString(),
      })),
    })
  }
}

export async function POST() {
  try {
    const articles = SCHOLARSHIPS.map(s => generateArticle(s))

    const { data, error } = await supabase
      .from('blog_posts')
      .insert(articles)
      .select()

    if (error) throw error

    return NextResponse.json({
      success: true,
      message: `Successfully saved ${data.length} articles to database!`,
      articles: data,
      savedToDatabase: true,
    })
  } catch (error) {
    console.error('Error saving to database:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to save to database', details: String(error) },
      { status: 500 }
    )
  }
}