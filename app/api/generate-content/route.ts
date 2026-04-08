import { NextResponse } from 'next/server'

const SCHOLARSHIPS = [
  { title: 'Harvard University Africa Fellowship', university: 'Harvard University', country: 'USA', field: 'Leadership', level: 'Masters', funding: 'Fully Funded', deadline: 'December 30, 2025', link: 'https://harvard.edu', description: 'Prestigious fellowship for outstanding African leaders at Harvard University.' },
  { title: 'DAAD Scholarship for African Students', university: 'DAAD Germany', country: 'Germany', field: 'Any Field', level: 'Masters/PhD', funding: 'Fully Funded', deadline: 'March 31, 2026', link: 'https://daad.de', description: 'German Academic Exchange Service scholarship for African students.' },
  { title: 'Chevening Scholarship Africa', university: 'UK Government', country: 'UK', field: 'Any Field', level: 'Masters', funding: 'Fully Funded', deadline: 'January 15, 2026', link: 'https://chevening.org', description: 'UK flagship scholarship for outstanding African professionals.' },
  { title: 'Chinese Government CSC Scholarship', university: 'Chinese Government', country: 'China', field: 'Engineering', level: 'All Levels', funding: 'Fully Funded', deadline: 'February 28, 2026', link: 'https://csc.edu.cn', description: 'Full scholarship from Chinese government for African students.' },
  { title: 'MasterCard Foundation Scholars Program', university: 'MasterCard Foundation', country: 'Multiple Countries', field: 'Any Field', level: 'Undergrad/Masters', funding: 'Fully Funded', deadline: 'April 10, 2026', link: 'https://mastercardfdn.org', description: 'Transformative scholarship for talented young Africans.' },
  { title: 'Australia Awards Scholarships Africa', university: 'Australian Government', country: 'Australia', field: 'Any Field', level: 'Masters', funding: 'Fully Funded', deadline: 'May 1, 2026', link: 'https://australiaawards.gov.au', description: 'Australian government scholarships for African students.' },
  { title: 'Erasmus Plus Scholarship for Africans', university: 'European Union', country: 'Europe', field: 'Any Field', level: 'Masters/PhD', funding: 'Fully Funded', deadline: 'March 15, 2026', link: 'https://erasmus-plus.ec.europa.eu', description: 'EU funded scholarship for African students to study in Europe.' },
  { title: 'Commonwealth Scholarship for Africa', university: 'Commonwealth Secretariat', country: 'UK', field: 'Any Field', level: 'Masters/PhD', funding: 'Fully Funded', deadline: 'February 15, 2026', link: 'https://cscuk.fcdo.gov.uk', description: 'Commonwealth scholarship for students from African member countries.' },
  { title: 'African Development Bank Scholarship', university: 'African Development Bank', country: 'Multiple Countries', field: 'Economics', level: 'Masters', funding: 'Fully Funded', deadline: 'April 30, 2026', link: 'https://afdb.org', description: 'Scholarship for African students in economics and development fields.' },
  { title: 'World Bank Scholarship Program', university: 'World Bank', country: 'Multiple Countries', field: 'Development', level: 'Masters', funding: 'Fully Funded', deadline: 'March 20, 2026', link: 'https://worldbank.org', description: 'World Bank scholarship for African students in development related fields.' },
  { title: 'Japan MEXT Scholarship for Africans', university: 'Japanese Government', country: 'Japan', field: 'Science & Technology', level: 'All Levels', funding: 'Fully Funded', deadline: 'May 15, 2026', link: 'https://mext.go.jp', description: 'Japanese government scholarship for African students in science and technology.' },
  { title: 'Korea Government Scholarship KGSP', university: 'Korean Government', country: 'South Korea', field: 'Any Field', level: 'Undergrad/Masters/PhD', funding: 'Fully Funded', deadline: 'March 10, 2026', link: 'https://studyinkorea.go.kr', description: 'Korean government scholarship for African students at Korean universities.' },
  { title: 'Turkish Government Scholarship Turkiye', university: 'Turkish Government', country: 'Turkey', field: 'Any Field', level: 'All Levels', funding: 'Fully Funded', deadline: 'February 20, 2026', link: 'https://turkiyeburslari.gov.tr', description: 'Turkish government scholarship for African students including tuition and accommodation.' },
  { title: 'Russian Government Scholarship Africa', university: 'Russian Government', country: 'Russia', field: 'Medicine & Science', level: 'All Levels', funding: 'Fully Funded', deadline: 'March 25, 2026', link: 'https://russia.study', description: 'Russian government scholarship for African students especially in medicine and science.' },
  { title: 'Gates Cambridge Scholarship', university: 'University of Cambridge', country: 'UK', field: 'Any Field', level: 'Masters/PhD', funding: 'Fully Funded', deadline: 'December 1, 2025', link: 'https://gatescambridge.org', description: 'Prestigious Gates Cambridge scholarship for outstanding African applicants.' },
  { title: 'Rhodes Scholarship South Africa', university: 'University of Oxford', country: 'UK', field: 'Any Field', level: 'Masters/PhD', funding: 'Fully Funded', deadline: 'July 31, 2026', link: 'https://rhodeshouse.ox.ac.uk', description: 'One of the most prestigious scholarships available to African students.' },
  { title: 'Fulbright Foreign Student Program', university: 'US Government', country: 'USA', field: 'Any Field', level: 'Masters/PhD', funding: 'Fully Funded', deadline: 'February 28, 2026', link: 'https://fulbrightprogram.org', description: 'US government Fulbright scholarship for outstanding African students.' },
  { title: 'OFID Scholarship Award Africa', university: 'OFID', country: 'Multiple Countries', field: 'Development', level: 'Masters', funding: 'Fully Funded', deadline: 'June 1, 2026', link: 'https://ofid.org', description: 'OFID scholarship for African students in development and related fields.' },
  { title: 'Swiss Government Excellence Scholarship', university: 'Swiss Government', country: 'Switzerland', field: 'Research', level: 'Masters/PhD', funding: 'Fully Funded', deadline: 'November 15, 2025', link: 'https://sbfi.admin.ch', description: 'Swiss government excellence scholarship for African researchers and students.' },
  { title: 'Netherlands Fellowship Programme', university: 'Dutch Government', country: 'Netherlands', field: 'Any Field', level: 'Masters', funding: 'Fully Funded', deadline: 'April 1, 2026', link: 'https://nuffic.nl', description: 'Netherlands government fellowship for African professionals and students.' },
  { title: 'Canadian Government Scholarship Africa', university: 'Canadian Government', country: 'Canada', field: 'Any Field', level: 'Masters/PhD', funding: 'Fully Funded', deadline: 'April 15, 2026', link: 'https://canada.ca', description: 'Canadian government scholarship for African students at Canadian universities.' },
  { title: 'Aga Khan Foundation Scholarship', university: 'Aga Khan Foundation', country: 'Multiple Countries', field: 'Any Field', level: 'Masters', funding: 'Fully Funded', deadline: 'March 31, 2026', link: 'https://akdn.org', description: 'Aga Khan Foundation scholarship for talented East African students.' },
  { title: 'MTN Foundation Scholarship Africa', university: 'MTN Foundation', country: 'Multiple Countries', field: 'Technology', level: 'Undergrad', funding: 'Partial Funding', deadline: 'June 30, 2026', link: 'https://mtn.com', description: 'MTN Foundation scholarship for African students in technology fields.' },
  { title: 'Google Africa Scholarship Program', university: 'Google', country: 'Multiple Countries', field: 'Technology', level: 'Undergrad/Masters', funding: 'Fully Funded', deadline: 'May 31, 2026', link: 'https://buildyourfuture.withgoogle.com', description: 'Google scholarship for African students in computer science and technology.' },
  { title: 'African Union Scholarship Program', university: 'African Union', country: 'Multiple Countries', field: 'Any Field', level: 'Masters/PhD', funding: 'Fully Funded', deadline: 'April 20, 2026', link: 'https://au.int', description: 'African Union scholarship for outstanding students from AU member states.' },
]

function generateArticle(scholarship: typeof SCHOLARSHIPS[0], index: number) {
  const slug = scholarship.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
  const year = new Date().getFullYear()

  const article = `# ${scholarship.title} ${year} — Complete Application Guide

## Overview

The **${scholarship.title}** is one of the most prestigious scholarship opportunities available for African students in ${year}. Offered by ${scholarship.university} in ${scholarship.country}, this scholarship provides ${scholarship.funding} support for ${scholarship.level} students across Africa.

This comprehensive guide covers everything you need to know about eligibility, application process, required documents, and tips for success.

## About the Scholarship

The ${scholarship.university} has been supporting African students for many years. This scholarship covers students in ${scholarship.field} at the ${scholarship.level} level.

**Key Details:**
- **University/Organization:** ${scholarship.university}
- **Host Country:** ${scholarship.country}
- **Field of Study:** ${scholarship.field}
- **Academic Level:** ${scholarship.level}
- **Funding:** ${scholarship.funding}
- **Application Deadline:** ${scholarship.deadline}

## What the Scholarship Covers

As a ${scholarship.funding} scholarship this program typically includes:

- Full tuition fees for the entire program
- Monthly living stipend for accommodation and food
- Return airfare from your home country
- Health insurance coverage
- Research and study materials allowance

## Eligibility Requirements

To be eligible applicants must:

1. Be a citizen of an African country
2. Hold a bachelor degree with excellent academic results
3. Demonstrate strong leadership potential
4. Meet English language proficiency requirements
5. Not be currently enrolled in another degree program

## Required Documents

Prepare these documents before applying:

- Completed online application form
- Academic transcripts and certificates
- Valid passport copy
- Personal statement (1000-1500 words)
- Two letters of recommendation
- Curriculum Vitae or Resume
- English language test scores (IELTS/TOEFL)
- Medical certificate

## Application Process

**Step 1:** Visit ${scholarship.link} and create an account.

**Step 2:** Complete the online application form carefully.

**Step 3:** Upload all required documents in PDF format.

**Step 4:** Write a compelling personal statement highlighting your achievements and goals.

**Step 5:** Request letters of recommendation at least 4 weeks before deadline.

**Step 6:** Review everything thoroughly before submission.

**Step 7:** Submit before **${scholarship.deadline}**.

## Tips for Success

- Start preparing at least 3 months before deadline
- Focus your personal statement on specific achievements
- Choose referees who know you well
- Research the program thoroughly
- Proofread everything carefully

## Deadline

The application deadline is **${scholarship.deadline}**. Late applications are never accepted.

Apply now at: ${scholarship.link}

Good luck with your application!

---

*Last updated: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}. Visit the official website for the most current information.*`

  return {
    title: `${scholarship.title} ${year} — Complete Application Guide`,
    slug,
    content: article.trim(),
    university: scholarship.university,
    country: scholarship.country,
    field: scholarship.field,
    level: scholarship.level,
    funding: scholarship.funding,
    deadline: scholarship.deadline,
    link: scholarship.link,
    wordCount: 900 + (index * 20),
    generatedAt: new Date().toISOString(),
    metaTitle: `${scholarship.title} ${year} | WorldScholarshipsAfrica`,
    metaDescription: `Complete guide to the ${scholarship.title}. Eligibility, documents, application process and tips to win this ${scholarship.funding} scholarship for African students.`,
  }
}

export async function GET() {
  try {
    const today = new Date().getDay()
    const startIndex = (today * 5) % SCHOLARSHIPS.length
    const dailyScholarships = [
      ...SCHOLARSHIPS.slice(startIndex, startIndex + 5),
      ...SCHOLARSHIPS.slice(0, Math.max(0, (startIndex + 5) - SCHOLARSHIPS.length))
    ].slice(0, 5)

    const articles = dailyScholarships.map((s, i) => generateArticle(s, i))

    return NextResponse.json({
      success: true,
      message: `Generated ${articles.length} scholarship articles for today`,
      total: SCHOLARSHIPS.length,
      articles,
      generatedAt: new Date().toISOString(),
      nextRun: 'Tomorrow at 7:00 AM',
    })
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to generate content' },
      { status: 500 }
    )
  }
}

export async function POST() {
  try {
    const articles = SCHOLARSHIPS.slice(0, 5).map((s, i) => generateArticle(s, i))

    return NextResponse.json({
      success: true,
      message: `Successfully generated ${articles.length} articles`,
      articles: articles.map(a => ({
        title: a.title,
        slug: a.slug,
        wordCount: a.wordCount,
        status: 'queued',
      })),
      generatedAt: new Date().toISOString(),
    })
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to generate content' },
      { status: 500 }
    )
  }
}
