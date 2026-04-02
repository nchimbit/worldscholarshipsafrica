import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'WorldScholarshipsAfrica - Find Scholarships for African Students',
  description: 'Discover thousands of fully funded scholarships for African students from top universities across USA, UK, China, Germany and beyond.',
  keywords: 'scholarships Africa, African students scholarships, fully funded scholarships',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
