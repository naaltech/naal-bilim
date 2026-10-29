import Image from "next/image"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { getClub, instagramHandle, splitList } from "@/lib/supabase"

export const revalidate = 300

const fallbackDescription =
  "Bilimin sınırı yoktur. Her geçen gün gelişir ve hayatımızı kolaylaştırmaya yardımcı olur. Bilimi en iyi konuşarak, tartışarak ve bu konuda uzmanlara sorular sorarak öğrenebiliriz."

const activities = [
  {
    numeral: "I",
    title: "Söyleşiler",
    text: "Alanında uzman bilim insanlarını okulumuzda ağırlıyor, merak ettiklerimizi doğrudan onlara soruyoruz.",
  },
  {
    numeral: "II",
    title: "Geziler",
    text: "Müzeleri, laboratuvarları ve araştırma merkezlerini ziyaret ederek bilimi yerinde görüyoruz.",
  },
  {
    numeral: "III",
    title: "Çalıştaylar",
    text: "İç ve dış çalıştaylarda kara delikler gibi farklı konuları araştırıp tartışıyoruz.",
  },
  {
    numeral: "IV",
    title: "Belgesel Analizleri",
    text: "Bilim belgesellerini birlikte izliyor, ardından bilimsel yönlerini konuşuyoruz.",
  },
]

const stories = [
  { numeral: "I", title: "Işıkla Beyin Kontrolü", detail: "Optogenetik · Tıp" },
  { numeral: "II", title: "Buzun Altında Hayalet Avı", detail: "IceCube · Fizik" },
  { numeral: "III", title: "Ayna Görüntüsü Moleküller", detail: "Kiralite · Kimya" },
]

function hrefFor(url: string) {
  return url.startsWith("http") ? url : `https://${url}`
}

function linkLabel(url: string) {
  try {
    return new URL(hrefFor(url)).hostname.replace(/^www\./, "")
  } catch {
    return url
  }
}

function SectionTitle({ title }: { title: string }) {
  return (
    <div className="text-center">
      <h2 className="text-4xl font-semibold italic tracking-tight md:text-5xl">{title}</h2>
      <div className="rule mx-auto mt-4 max-w-[12rem]">
        <span className="diamond" />
      </div>
    </div>
  )
}

function KunyeRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-[11rem_1fr] sm:gap-6">
      <dt className="smallcaps text-ink-soft sm:text-right">{label}</dt>
      <dd className="text-lg">{children}</dd>
    </div>
  )
}

export default async function Home() {
  const club = await getClub()
  const instagramAccounts = splitList(club?.instagram ?? "naalbilim").map(instagramHandle)
  const owners = splitList(club?.owners ?? null)
  const links = splitList(club?.urls ?? null)
  const paragraphs = (club?.description || fallbackDescription)
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)

  return (
    <>
      <Header />

      <main>
        <section className="mx-auto max-w-page px-4 pt-12 md:px-6 md:pt-16">
          <div className="smallcaps flex justify-between text-ink-soft">
            <span>Nevzat Ayaz Anadolu Lisesi</span>
            <span className="hidden sm:inline">Bilim Kulübü</span>
          </div>
          <h1 className="mt-6 text-center font-display text-[3.4rem] font-semibold uppercase leading-none tracking-[0.06em] sm:text-7xl md:text-8xl">
            Naal Bilim
          </h1>
          <div className="rule mx-auto mt-6 max-w-md">
            <span className="diamond" />
          </div>
          <p className="mt-6 text-center text-2xl italic md:text-3xl">Bilim ile yeniden doğacağız.</p>
          <p className="smallcaps mt-3 text-center text-rubric">Bilim Kulübü</p>
          <figure className="mx-auto mt-10 max-w-3xl">
            <Image
              src="/fig-isik.webp"
              alt="Leonardo defteri üslubunda göz, mercek ve ışık ışınları çizimi"
              width={1200}
              height={936}
              priority
              className="h-auto w-full"
            />
          </figure>
        </section>

        <section id="atolye" className="mx-auto mt-24 max-w-page scroll-mt-6 px-4 md:px-6">
          <SectionTitle title="Atölyemiz" />
          <div className="mt-10 gap-10 text-justify text-lg leading-relaxed [hyphens:auto] md:columns-2">
            {paragraphs.map((paragraph, index) => (
              <p key={paragraph} className={index === 0 ? "dropcap mb-4" : "mb-4"}>
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mx-auto mt-16 max-w-3xl">
            <h3 className="text-2xl font-semibold italic">Neler Yapıyoruz?</h3>
            <div className="mt-1 flex items-center">
              <span className="diamond" />
              <span className="h-px flex-1 bg-rubric/70" />
            </div>
            <ol className="mt-4">
              {activities.map((activity) => (
                <li key={activity.title} className="py-3">
                  <div className="flex items-baseline text-lg">
                    <span className="w-10 shrink-0 font-display font-semibold text-rubric">{activity.numeral}</span>
                    <span className="font-medium">{activity.title}</span>
                  </div>
                  <p className="pl-10 text-ink-soft">{activity.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="dergi" className="mx-auto mt-24 max-w-page scroll-mt-6 px-4 md:px-6">
          <SectionTitle title="Naal Bilim Dergisi" />
          <div className="mt-12 grid items-center gap-12 md:grid-cols-[minmax(0,20rem)_1fr]">
            <Image
              src="/dergi-kapak.webp"
              alt="Naal Bilim dergisi Sayı II kapağı"
              width={720}
              height={1020}
              className="mx-auto h-auto w-full max-w-xs border border-ink/20 shadow-[0_18px_40px_-18px_rgba(46,31,18,0.55)]"
            />
            <div>
              <p className="smallcaps text-rubric">Sayı II · Işık Sayısı · MMXXVI</p>
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
            </div>
          </div>
        </section>

        <section id="kunye" className="mx-auto mt-24 max-w-page scroll-mt-6 px-4 md:px-6">
          <SectionTitle title="Künye" />
          <dl className="mx-auto mt-10 max-w-2xl">
            <KunyeRow label="Kulüp">{club?.title || "Bilim Kulübü"}</KunyeRow>
            <KunyeRow label="Okul">Nevzat Ayaz Anadolu Lisesi</KunyeRow>
            {owners.length > 0 && (
              <KunyeRow label="Kulüp Başkanları">
                {owners.map((owner) => (
                  <span key={owner} className="block">{owner}</span>
                ))}
              </KunyeRow>
            )}
            <KunyeRow label="E-posta">
              <a href="mailto:bilim@naal.org.tr" className="hover:text-rubric hover:underline">bilim@naal.org.tr</a>
            </KunyeRow>
            {instagramAccounts.length > 0 && (
              <KunyeRow label="Instagram">
                {instagramAccounts.map((account) => (
                  <a
                    key={account}
                    href={`https://instagram.com/${account}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block italic hover:text-rubric hover:underline"
                  >
                    @{account}
                  </a>
                ))}
              </KunyeRow>
            )}
            {links.length > 0 && (
              <KunyeRow label="Bağlantılar">
                {links.map((url) => (
                  <a
                    key={url}
                    href={hrefFor(url)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block italic hover:text-rubric hover:underline"
                  >
                    {linkLabel(url)}
                  </a>
                ))}
              </KunyeRow>
            )}
          </dl>
        </section>
      </main>

      <Footer />
    </>
  )
}
