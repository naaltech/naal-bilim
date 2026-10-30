import type { Metadata } from "next"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { PageHero } from "@/components/heading"
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

      <main>
        <PageHero title="Başvuru">
          Bilime merakı olan her öğrencimizi kulübümüze bekliyoruz. Formu doldurduktan sonra kulüp ekibi seninle
          e-posta ya da telefon üzerinden iletişime geçecek.
        </PageHero>
        <section className="py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="card p-6">
              <TallyEmbed formId="M11WDg" title="Bilim Kulübü Üyelik Başvuru Formu" />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
