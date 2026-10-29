import type { Metadata } from "next"
import { Cormorant_Garamond, EB_Garamond } from "next/font/google"
import "./globals.css"

const garamond = EB_Garamond({
  subsets: ["latin", "latin-ext"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600"],
  variable: "--font-garamond",
  display: "swap",
})

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600"],
  variable: "--font-cormorant",
  display: "swap",
})

const title = "Naal Bilim - Nevzat Ayaz Anadolu Lisesi Bilim Kulübü"
const description = "Nevzat Ayaz Anadolu Lisesi Bilim Kulübü: söyleşiler, geziler, çalıştaylar, belgesel analizleri ve Naal Bilim dergisi."

export const metadata: Metadata = {
  metadataBase: new URL("https://bilim.naal.org.tr"),
  title: {
    default: title,
    template: "%s | Naal Bilim",
  },
  description,
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  keywords: [
    "Naal Bilim",
    "Nevzat Ayaz Anadolu Lisesi",
    "Bilim Kulübü",
    "Bilim Atölyesi",
    "Naal Bilim Dergisi",
    "Fen Bilimleri Çalıştayı",
  ],
  authors: [{ name: "Nevzat Ayaz Anadolu Lisesi Bilim Kulübü" }],
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://bilim.naal.org.tr",
    title,
    description,
    siteName: "Naal Bilim",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Naal Bilim" }],
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
    <html lang="tr" className={`${garamond.variable} ${cormorant.variable}`}>
      <body className="font-serif antialiased">
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  )
}
