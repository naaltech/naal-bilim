import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline"
import Image from "next/image"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { NumberTag, SectionTitle } from "@/components/heading"
import { getClub, getMagazines, instagramHandle, issueLabel, splitList, toRoman } from "@/lib/supabase"

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
  {
    numeral: "V",
    title: "Dergiler",
    text: "Bilim dergimizi hazırlıyor, öğrencilerimizin yazdığı bilim makalelerini bulmacalarla birlikte yayımlıyoruz.",
    href: "/dergi",
  },
]

function InstagramIcon() {
  return (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

export default async function Home() {
  const [club, magazines] = await Promise.all([getClub(), getMagazines()])
  const magazine = magazines[0]
  const instagramAccounts = splitList(club?.instagram ?? "naalbilim").map(instagramHandle)
  const paragraphs = (club?.description || fallbackDescription)
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)

  return (
    <>
      <Header />

      <main>
        <section className="bg-gradient-to-b from-muted/70 to-transparent py-20">
          <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <Image
              src="/naalbilim.png"
              alt="Bilim Kulübü logosu"
              width={576}
              height={420}
              priority
              className="mx-auto mb-10 h-auto w-full max-w-sm sm:max-w-xl"
            />
            <h1 className="mb-6 text-4xl font-bold text-foreground md:text-6xl">
              Nevzat Ayaz Anadolu Lisesi
              <span className="block text-muted-foreground">Bilim Kulübü</span>
            </h1>
            <p className="mx-auto mb-8 max-w-3xl text-xl text-muted-foreground">Bilim ile yeniden doğacağız.</p>
            <div className="mx-auto flex max-w-md flex-col items-center justify-center gap-3 sm:max-w-none sm:flex-row sm:gap-4">
              <a href="/basvuru" className="button w-full sm:w-auto">Başvuru Yap</a>
              <a href="mailto:bilim@naal.org.tr" className="button-outline w-full sm:w-auto">İletişim</a>
            </div>
          </div>
        </section>

        <section id="atolye" className="scroll-mt-16 py-16">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
            <div>
              <h2 className="mb-6 text-3xl font-bold text-foreground">Atölyemiz</h2>
              <div className="text-muted-foreground">
                {paragraphs.map((paragraph) => (
                  <p key={paragraph} className="mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
            <figure>
              <Image
                src="/fig-isik.webp"
                alt="Leonardo defteri üslubunda göz, mercek ve ışık ışınları çizimi"
                width={1200}
                height={936}
                className="h-auto w-full"
              />
            </figure>
          </div>
        </section>

        <section className="bg-muted/60 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionTitle>Neler Yapıyoruz?</SectionTitle>
            <ol className="flex flex-wrap justify-center gap-6">
              {activities.map((activity, index) => (
                <li key={activity.title} className="card w-full p-6 md:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]">
                  <NumberTag index={index}>{activity.numeral}</NumberTag>
                  <h3 className="mb-2 mt-3 text-lg font-semibold text-foreground">
                    {activity.href ? (
                      <a href={activity.href} className="hover:underline">{activity.title}</a>
                    ) : (
                      activity.title
                    )}
                  </h3>
                  <p className="text-sm text-muted-foreground">{activity.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="dergi" className="scroll-mt-16 py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <SectionTitle>Bilim Dergisi</SectionTitle>
            {magazine ? (
              <div className={`card grid items-center gap-10 p-6 ${magazine.cover_url ? "sm:grid-cols-[10rem_1fr]" : ""}`}>
                {magazine.cover_url && (
                  <a href="/dergi" className="mx-auto block w-40">
                    <Image
                      src={magazine.cover_url}
                      alt={`Bilim Dergisi Sayı ${toRoman(magazine.issue_number)} kapağı`}
                      width={720}
                      height={1020}
                      className="h-auto w-full rounded-md border shadow-lg"
                    />
                  </a>
                )}
                <div className={`text-center ${magazine.cover_url ? "sm:text-left" : ""}`}>
                  <p className="tag bg-accent-yellow">{issueLabel(magazine)}</p>
                  <p className="mt-3 text-muted-foreground">{magazine.summary || magazine.description}</p>
                  <a href="/dergi" className="button mt-6">Dergiyi İncele</a>
                </div>
              </div>
            ) : (
              <p className="mx-auto max-w-2xl text-center text-muted-foreground">
                Bilim Dergisi&apos;nin yeni sayısı hazırlanıyor.
              </p>
            )}
          </div>
        </section>

        <section id="calistay" className="scroll-mt-16 bg-muted/60 py-16">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
            <div>
              <h2 className="mb-6 text-3xl font-bold text-foreground">Nevzat Ayaz Anadolu Lisesi Fen Bilimleri Çalıştayı</h2>
              <p className="mb-8 text-muted-foreground">
                Öğrencilerimizin düzenlediği iki günlük çalıştayda farklı bilim dallarındaki komiteler uzmanlarla buluşuyor;
                simülasyonlar, deneyler ve atölye etkinlikleri yapılıyor.
              </p>
              <a href="https://fbc.naal.org.tr" target="_blank" rel="noopener noreferrer" className="button gap-2">
                Çalıştay Sitesi
                <ArrowTopRightOnSquareIcon className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
            <div className="grid w-full grid-cols-2 gap-4">
              <Image
                src="/big.jpg"
                alt="Çalıştayda sınıfta yapılan bir sunum"
                width={800}
                height={533}
                className="col-span-2 aspect-[2.85/1] h-auto w-full rounded-xl object-cover shadow-sm"
              />
              <Image
                src="/kucuksol.jpg"
                alt="Çalıştayda sahnede yapılan bir etkinlik"
                width={800}
                height={533}
                className="aspect-[2.1/1] h-auto w-full rounded-xl object-cover shadow-sm"
              />
              <Image
                src="/kucuksag.jpg"
                alt="Çalıştayda mikroskopla çalışan öğrenciler"
                width={800}
                height={533}
                className="aspect-[2.1/1] h-auto w-full rounded-xl object-cover shadow-sm"
              />
            </div>
          </div>
        </section>

        <section id="basvuru" className="scroll-mt-16 py-16">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="mb-4 text-3xl font-bold text-foreground">Başvuru</h2>
            <p className="mx-auto mb-8 max-w-2xl text-muted-foreground">
              Bilime merakı olan her öğrencimizi kulübümüze bekliyoruz. Söyleşilerde, gezilerde, çalıştaylarda ya da
              Bilim Dergisi&apos;nin yeni sayısında yer almak istiyorsan başvuru formunu doldurman yeterli.
            </p>
            <a href="/basvuru" className="button">Başvuru Formu</a>
          </div>
        </section>

        <section id="instagram" className="scroll-mt-16 border-t py-6">
          <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-x-8 gap-y-3 px-4 text-sm font-medium text-muted-foreground sm:px-6 lg:px-8">
            {instagramAccounts.map((account) => (
              <a
                key={account}
                href={`https://instagram.com/${account}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 transition-colors hover:text-foreground"
              >
                <InstagramIcon />
                @{account}
              </a>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
