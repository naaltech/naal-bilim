import type { Metadata } from "next"
import Image from "next/image"
import Header from "@/components/header"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "Dergi",
  description: "Nevzat Ayaz Anadolu Lisesi Bilim Kulübü'nün dergisi Naal Bilim: öğrencilerin yazdığı bilim makaleleri ve bulmacalar.",
  alternates: {
    canonical: "https://bilim.naal.org.tr/dergi",
  },
}

const stories = [
  { numeral: "I", title: "Işıkla Beyin Kontrolü", detail: "Optogenetik · Tıp" },
  { numeral: "II", title: "Buzun Altında Hayalet Avı", detail: "IceCube · Fizik" },
  { numeral: "III", title: "Ayna Görüntüsü Moleküller", detail: "Kiralite · Kimya" },
]

const issuePdf = "/dergi/naal-bilim-sayi-02.pdf"

export default function Dergi() {
  return (
    <>
      <Header />

      <main className="mx-auto max-w-page px-4 pt-12 md:px-6 md:pt-16">
        <div className="smallcaps flex justify-between text-ink-soft">
          <span>Nevzat Ayaz Anadolu Lisesi</span>
          <span className="hidden sm:inline">Bilim Kulübü</span>
        </div>
        <h1 className="mt-6 text-center text-5xl font-semibold italic tracking-tight md:text-6xl">Naal Bilim Dergisi</h1>
        <div className="rule mx-auto mt-4 max-w-[12rem]">
          <span className="diamond" />
        </div>

        <div className="mt-12 grid items-center gap-12 md:grid-cols-[minmax(0,20rem)_1fr]">
          <a href={issuePdf} target="_blank" rel="noopener noreferrer" className="mx-auto block w-full max-w-xs">
            <Image
              src="/dergi-kapak.webp"
              alt="Naal Bilim dergisi Sayı II kapağı"
              width={720}
              height={1020}
              priority
              className="h-auto w-full border border-ink/20 shadow-[0_18px_40px_-18px_rgba(46,31,18,0.55)]"
            />
          </a>
          <div>
            <p className="smallcaps text-rubric">Sayı II · Işık Sayısı · MMXXVI</p>
            <p className="mt-2 italic text-ink-soft">Yayımlandı · Kasım 2026</p>
            <p className="mt-4 text-lg leading-relaxed">
              Kulübümüzün dergisi Naal Bilim&apos;in ikinci sayısı, 2026 Nobel ödüllerinden yola çıkarak ışığın üç
              hikâyesini anlatıyor. Biyoloji, fizik ve kimya bölümlerinde öğrencilerimizin yazdığı makaleler,
              bulmacalar ve kaynakçayla 48 sayfa.
            </p>
            <ol className="mt-8 grid gap-6 sm:grid-cols-3">
              {stories.map((story) => (
                <li key={story.title} className="border-t border-ink/30 pt-4">
                  <span className="font-display text-2xl font-semibold text-rubric">{story.numeral}</span>
                  <p className="mt-1 text-lg font-medium leading-snug">{story.title}</p>
                  <p className="mt-1 text-sm italic text-ink-soft">{story.detail}</p>
                </li>
              ))}
            </ol>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href={issuePdf}
                target="_blank"
                rel="noopener noreferrer"
                className="smallcaps border border-rubric bg-rubric px-5 py-3 text-parchment-light hover:bg-ink hover:border-ink"
              >
                Dergiyi Oku
              </a>
            </div>
            <p className="mt-8 border-t border-ink/30 pt-4 text-ink-soft">
              <span className="smallcaps text-rubric">Önceki Sayı</span>
              <a
                href="https://nevzatayazal.meb.k12.tr/meb_iys_dosyalar/34/21/964159/fotograf_galerisi_3859407.html"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-3 italic hover:text-rubric hover:underline"
              >
                Sayı I · Naal Bilim 2025
              </a>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
