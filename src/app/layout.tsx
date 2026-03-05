/*
 * Root layout for the Dreamscape Aquariums website.
 *
 * This file defines the HTML structure for all pages in the app and
 * applies global styles. We import the global Tailwind CSS file here so
 * that utility classes are available throughout the site. The body
 * element applies a dark background and white text to provide good
 * contrast for the hero video and coral cards.
 */

import type { Metadata } from 'next'
import './globals.css'

// Basic metadata for the site. You can extend this with OpenGraph
// properties or other SEO tags as needed.
export const metadata: Metadata = {
  title: 'Dreamscape Aquariums',
  description: 'Experience vibrant corals from Dreamscape Aquariums delivered straight to your door.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}