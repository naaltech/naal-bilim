import type { Metadata } from "next"
import Header from "@/components/header"
import Footer from "@/components/footer"
import TallyEmbed from "@/components/tally-embed"

export const metadata: Metadata = {
  title: "Başvuru",
  description: "Nevzat Ayaz Anadolu Lisesi Bilim Kulübü üyelik başvuru formu.",
  alternates: {
    canonical: "https://bilim.naal.org.tr/basvuru",
  },
}

export default function Basvuru() {
  return (
    <>
      <Header />

      <main className="mx-auto max-w-page px-4 pt-12 md:px-6 md:pt-16">
        <div className="smallcaps flex justify-between text-ink-soft">
          <span>Nevzat Ayaz Anadolu Lisesi</span>
          <span className="hidden sm:inline">Bilim Kulübü</span>
        </div>
        <h1 className="mt-6 text-center text-5xl font-semibold italic tracking-tight md:text-6xl">Başvuru</h1>
        <div className="rule mx-auto mt-4 max-w-[12rem]">
          <span className="diamond" />
        </div>
        <p className="mx-auto mt-8 max-w-2xl text-center text-lg leading-relaxed">
          Bilime merakı olan her öğrencimizi kulübümüze bekliyoruz. Formu doldurduktan sonra kulüp ekibi seninle
          e-posta ya da telefon üzerinden iletişime geçecek.
        </p>
        <div className="mx-auto mt-10 max-w-2xl border-t border-ink/30 pt-6">
          <TallyEmbed formId="M11WDg" title="Bilim Kulübü Üyelik Başvuru Formu" />
        </div>
      </main>

      <Footer />
    </>
  )
}
