import type { Metadata } from "next"
import { Geist } from "next/font/google"
import "./globals.css"

const geist = Geist({
  subsets: ["latin", "latin-ext"],
  variable: "--font-geist",
  display: "swap",
})

const title = "Nevzat Ayaz Anadolu Lisesi Bilim Kulübü"
const description = "Nevzat Ayaz Anadolu Lisesi Bilim Kulübü: söyleşiler, geziler, çalıştaylar, belgesel analizleri ve bilim dergisi."

export const metadata: Metadata = {
  metadataBase: new URL("https://bilim.naal.org.tr"),
  title: {
    default: title,
    template: "%s | Nevzat Ayaz Anadolu Lisesi Bilim Kulübü",
  },
  description,
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  keywords: [
    "Nevzat Ayaz Anadolu Lisesi",
    "Bilim Kulübü",
    "Bilim Atölyesi",
    "Bilim Dergisi",
    "Fen Bilimleri Çalıştayı",
  ],
  authors: [{ name: "Nevzat Ayaz Anadolu Lisesi Bilim Kulübü" }],
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://bilim.naal.org.tr",
    title,
    description,
    siteName: title,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: title }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.png"],
  },
  alternates: {
    canonical: "https://bilim.naal.org.tr",
  },
  category: "education",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="tr" className={geist.variable}>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
