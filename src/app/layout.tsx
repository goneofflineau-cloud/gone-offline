import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import '@/styles/globals.css'
import Nav from '@/components/nav/Nav'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Gone Offline — Travel & Lifestyle Photography',
  description:
    'Photography and videography by Zoe and Les. Travel, hotels, and the moments worth capturing.',
  openGraph: {
    title: 'Gone Offline',
    description: 'Travel & lifestyle photography by Zoe and Les.',
    url: 'https://goneoffline.com.au',
    siteName: 'Gone Offline',
    locale: 'en_AU',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="bg-background text-ink min-h-screen font-body">
        <Nav />
        <main>{children}</main>
        <footer className="py-12 px-6 text-center text-sm text-ink/40 font-body tracking-wide">
          © {new Date().getFullYear()} Gone Offline
        </footer>
      </body>
    </html>
  )
}
