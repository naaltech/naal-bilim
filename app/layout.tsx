import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

const title = 'Bilim Kulübü - Nevzat Ayaz Anadolu Lisesi'
const description = 'Nevzat Ayaz Anadolu Lisesi Bilim Kulübü: söyleşiler, geziler, çalıştaylar ve belgesel analizleriyle bilimi birlikte öğreniyoruz.'

export const metadata: Metadata = {
  metadataBase: new URL('https://bilim.naal.org.tr'),
  title: {
    default: title,
    template: '%s | Bilim Kulübü',
  },
  description,
  icons: {
    icon: '/favicon.ico',
  },
  keywords: [
    'Nevzat Ayaz Anadolu Lisesi',
    'NAAL',
    'Bilim Kulübü',
    'Bilim Atölyesi',
    'Fen Bilimleri Çalıştayı',
    'Öğrenci Kulüpleri',
  ],
  authors: [{ name: 'Nevzat Ayaz Anadolu Lisesi' }],
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://bilim.naal.org.tr',
    title,
    description,
    siteName: 'Nevzat Ayaz Anadolu Lisesi',
    images: [{ url: '/og-image.png', alt: 'Nevzat Ayaz Anadolu Lisesi' }],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    site: '@NevzatAyazLise',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://bilim.naal.org.tr',
  },
  category: 'education',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="tr" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className={`${GeistSans.className} antialiased min-w-0 w-full`}>{children}</body>
    </html>
  )
}
