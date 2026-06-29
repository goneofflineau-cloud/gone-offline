import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import '@/styles/globals.css'
import Nav from '@/components/nav/Nav'
import Footer from '@/components/footer/Footer'

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
        <Footer />
      </body>
    </html>
  )
}
