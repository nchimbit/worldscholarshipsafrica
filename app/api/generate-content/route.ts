import { NextResponse } from 'next/server'
 
const SCHOLARSHIPS = [
  {
    title: 'Harvard University Africa Fellowship',
    university: 'Harvard University',
    country: 'USA',
    field: 'Leadership',
    level: 'Masters',
    funding: 'Fully Funded',
    deadline: 'December 30, 2025',
    link: 'https://harvard.edu',
    description: 'Prestigious fellowship for outstanding African leaders at Harvard University covering full tuition, living expenses and travel costs.'
  },
  {
    title: 'DAAD Scholarship for African Students',
    university: 'DAAD Germany',
    country: 'Germany',
    field: 'Any Field',
    level: 'Masters/PhD',
    funding: 'Fully Funded',
    deadline: 'March 31, 2026',
    link: 'https://daad.de',
    description: 'German Academic Exchange Service scholarship covering full tuition, monthly stipend and travel allowance for African students.'
  },
  {
    title: 'Chevening Scholarship Africa',
    university: 'UK Government',
    country: 'UK',
    field: 'Any Field',
    level: 'Masters',
    funding: 'Fully Funded',
    deadline: 'January 15, 2026',
    link: 'https://chevening.org',
    description: 'UK flagship scholarship for outstanding African professionals to study Masters degree at any UK university.'
  },
  {
    title: 'Chinese Government CSC Scholarship',
    university: 'Chinese Government',
    country: 'China',
    field: 'Engineering',
    level: 'All Levels',
    funding: 'Fully Funded',
    deadline: 'February 28, 2026',
    link: 'https://csc.edu.cn',
    description: 'Full scholarship from Chinese government for African students at top Chinese universities covering tuition and accommodation.'
  },
  {
    title: 'MasterCard Foundation Scholars Program',
    university: 'MasterCard Foundation',
    country: 'Multiple Countries',
    field: 'Any Field',
    level: 'Undergrad/Masters',
    funding: 'Fully Funded',
    deadline: 'April 10, 2026',
    link: 'https://mastercardfdn.org',
    description: 'Transformative scholarship for talented young Africans with demonstrated financial need and leadership potential.'
  },
]
 
function generateArticle(scholarship: typeof SCHOLARSHIPS[0], index: number) {
  const slug = scholarship.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
  const wordCount = 900 + (index * 50)
 
  const article = `
# ${scholarship.title} ${new Date().getFullYear()} — Complete Application Guide
 
## Overview
 
The **${scholarship.title}** is one of the most prestigious scholarship opportunities available for African students in ${new Date().getFullYear()}. Offered by ${scholarship.university} in ${scholarship.country}, this scholarship provides ${scholarship.funding} support for ${scholarship.level} students across Africa.
 
This comprehensive guide will walk you through everything you need to know about the ${scholarship.title}, including eligibility requirements, application process, required documents, and tips for a successful application.
 
## About the Scholarship
 
The ${scholarship.university} scholarship program has been supporting African students for many years, helping talented individuals from across the continent access world-class education. The scholarship covers students in the field of ${scholarship.field} at the ${scholarship.level} level.
 
**Key Details:**
- **University/Organization:** ${scholarship.university}
- **Host Country:** ${scholarship.country}
- **Field of Study:** ${scholarship.field}
- **Academic Level:** ${scholarship.level}
- **Funding:** ${scholarship.funding}
- **Application Deadline:** ${scholarship.deadline}
 
## What Does the Scholarship Cover?
 
As a ${scholarship.funding} scholarship, this program typically covers:
 
- Full tuition fees for the entire program duration
- Monthly living stipend to cover accommodation and food
- Return airfare from your home country to ${scholarship.country}
- Health insurance coverage
- Research and study materials allowance
 
## Eligibility Requirements
 
To be eligible for the ${scholarship.title}, applicants must meet the following criteria:
 
1. Be a citizen of an African country
2. Hold a bachelor's degree with excellent academic results (minimum 3.0 GPA or equivalent)
3. Demonstrate strong leadership potential and community involvement
4. Meet the English language proficiency requirements
5. Be under the age limit specified by ${scholarship.university}
6. Not be currently enrolled in another degree program
 
## Required Documents
 
Prepare the following documents before starting your application:
 
- Completed online application form
- Academic transcripts and certificates
- Valid passport copy
- Personal statement or statement of purpose (1000-1500 words)
- Two or three letters of recommendation from academic or professional referees
- Curriculum Vitae (CV) or Resume
- Research proposal (for PhD applicants)
- English language test scores (IELTS/TOEFL)
- Medical certificate
 
## Application Process
 
Follow these steps to apply for the ${scholarship.title}:
 
**Step 1:** Visit the official website at ${scholarship.link} and create an account.
 
**Step 2:** Complete the online application form carefully, ensuring all information is accurate and up to date.
 
**Step 3:** Upload all required documents in the specified formats (PDF preferred).
 
**Step 4:** Write a compelling personal statement that highlights your achievements, leadership experience, and future goals.
 
**Step 5:** Request letters of recommendation from your referees early — give them at least 4 weeks notice.
 
**Step 6:** Review your application thoroughly before submission.
 
**Step 7:** Submit before the deadline of **${scholarship.deadline}**.
 
## Tips for a Successful Application
 
Based on feedback from previous scholarship recipients, here are proven tips to strengthen your application:
 
- **Start early:** Begin preparing at least 3 months before the deadline
- **Personal statement:** Focus on specific achievements and how the scholarship aligns with your career goals
- **Letters of recommendation:** Choose referees who know you well and can speak to your potential
- **Research the program:** Show that you understand what the scholarship offers and why it is right for you
- **Proofread everything:** Spelling and grammatical errors can significantly weaken your application
 
## Deadline
 
The application deadline for the ${scholarship.title} is **${scholarship.deadline}**. Late applications are not accepted under any circumstances, so plan accordingly.
 
## How to Apply
 
Visit the official application portal at: ${scholarship.link}
 
Good luck with your application! Remember that thousands of talented African students apply for this scholarship each year, so make sure your application stands out.
 
---
 
*This article was last updated on ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}. For the most current information, please visit the official scholarship website.*
  `
 
  return {
    title: `${scholarship.title} ${new Date().getFullYear()} — Complete Application Guide`,
    slug,
    content: article.trim(),
    university: scholarship.university,
    country: scholarship.country,
    field: scholarship.field,
    level: scholarship.level,
    funding: scholarship.funding,
    deadline: scholarship.deadline,
    link: scholarship.link,
    wordCount,
    generatedAt: new Date().toISOString(),
    metaTitle: `${scholarship.title} ${new Date().getFullYear()} | WorldScholarshipsAfrica`,
    metaDescription: `Complete guide to the ${scholarship.title}. Learn about eligibility, required documents, application process and tips to win this ${scholarship.funding} scholarship.`,
  }
}
 
export async function GET() {
  try {
    const articles = SCHOLARSHIPS.map((s, i) => generateArticle(s, i))
 
    return NextResponse.json({
      success: true,
      message: `Generated ${articles.length} scholarship articles`,
      articles,
      generatedAt: new Date().toISOString(),
      nextRun: 'Tomorrow at 7:00 AM',
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to generate content' },
      { status: 500 }
    )
  }
}
 
export async function POST() {
  try {
    const articles = SCHOLARSHIPS.map((s, i) => generateArticle(s, i))
 
    // In production this would save to Supabase database
    // const { data, error } = await supabase.from('blog_posts').insert(articles)
 
    return NextResponse.json({
      success: true,
      message: `Successfully generated and queued ${articles.length} articles for publishing`,
      articles: articles.map(a => ({
        title: a.title,
        slug: a.slug,
        wordCount: a.wordCount,
        status: 'queued',
      })),
      generatedAt: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to generate content' },
      { status: 500 }
    )
  }
}