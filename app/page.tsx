import Image from "next/image"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Masthead, SectionTitle } from "@/components/heading"
import { Diamond, Ornament } from "@/components/ornament"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { getClub, getMagazines, instagramHandle, issueLabel, splitList, toRoman } from "@/lib/supabase"
import { cn } from "@/lib/utils"

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
    text: "Naal Bilim dergisini hazırlıyor, öğrencilerimizin yazdığı bilim makalelerini bulmacalarla birlikte yayımlıyoruz.",
    href: "/dergi",
  },
]

const dropcap =
  "first-letter:float-left first-letter:mr-2 first-letter:mt-1 first-letter:font-display first-letter:text-[3.6rem] first-letter:font-semibold first-letter:leading-[0.8] first-letter:text-primary"

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

function KunyeRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-[11rem_1fr] sm:gap-6">
      <dt className="smallcaps text-muted-foreground sm:text-right">{label}</dt>
      <dd className="text-lg">{children}</dd>
    </div>
  )
}

export default async function Home() {
  const [club, magazines] = await Promise.all([getClub(), getMagazines()])
  const magazine = magazines[0]
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
          <Masthead />
          <h1 className="mt-6 text-center font-display text-[3.4rem] font-semibold uppercase leading-none tracking-[0.06em] sm:text-7xl md:text-8xl">
            Naal Bilim
          </h1>
          <Ornament className="mx-auto mt-6 max-w-md" />
          <p className="mt-6 text-center text-2xl italic md:text-3xl">Bilim ile yeniden doğacağız.</p>
          <p className="smallcaps mt-3 text-center text-primary">Bilim Kulübü</p>
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
          <SectionTitle>Atölyemiz</SectionTitle>
          <div className="mt-10 gap-10 text-justify text-lg leading-relaxed [hyphens:auto] md:columns-2">
            {paragraphs.map((paragraph, index) => (
              <p key={paragraph} className={cn("mb-4", index === 0 && dropcap)}>
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mx-auto mt-16 max-w-3xl">
            <h3 className="text-2xl font-semibold italic">Neler Yapıyoruz?</h3>
            <div className="mt-1 flex items-center">
              <Diamond />
              <Separator className="flex-1 bg-primary/70" />
            </div>
            <ol className="mt-4">
              {activities.map((activity) => (
                <li key={activity.title} className="py-3">
                  <div className="flex items-baseline text-lg">
                    <span className="w-10 shrink-0 font-display font-semibold text-primary">{activity.numeral}</span>
                    {activity.href ? (
                      <a href={activity.href} className="font-medium hover:text-primary hover:underline">{activity.title}</a>
                    ) : (
                      <span className="font-medium">{activity.title}</span>
                    )}
                  </div>
                  <p className="pl-10 text-muted-foreground">{activity.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="dergi" className="mx-auto mt-24 max-w-page scroll-mt-6 px-4 md:px-6">
          <SectionTitle>Naal Bilim Dergisi</SectionTitle>
          {magazine ? (
            <div
              className={cn(
                "mx-auto mt-10 grid max-w-3xl items-center gap-10",
                magazine.cover_url && "sm:grid-cols-[10rem_1fr]"
              )}
            >
              {magazine.cover_url && (
                <a href="/dergi" className="mx-auto block w-40">
                  <Image
                    src={magazine.cover_url}
                    alt={`Naal Bilim dergisi Sayı ${toRoman(magazine.issue_number)} kapağı`}
                    width={720}
                    height={1020}
                    className="h-auto w-full border border-foreground/20 shadow-[0_18px_40px_-18px_hsl(var(--foreground)/0.55)]"
                  />
                </a>
              )}
              <div className={cn("text-center", magazine.cover_url && "sm:text-left")}>
                <p className="smallcaps text-primary">{issueLabel(magazine)}</p>
                <p className="mt-3 text-lg leading-relaxed">{magazine.summary || magazine.description}</p>
                <Button asChild className="mt-6">
                  <a href="/dergi">Dergiyi İncele</a>
                </Button>
              </div>
            </div>
          ) : (
            <p className="mx-auto mt-10 max-w-2xl text-center text-lg italic text-muted-foreground">
              Naal Bilim&apos;in yeni sayısı hazırlanıyor.
            </p>
          )}
        </section>

        <section id="basvuru" className="mx-auto mt-24 max-w-page scroll-mt-6 px-4 md:px-6">
          <SectionTitle>Başvuru</SectionTitle>
          <div className="mx-auto mt-10 max-w-2xl text-center">
            <p className="text-lg leading-relaxed">
              Bilime merakı olan her öğrencimizi kulübümüze bekliyoruz. Söyleşilerde, gezilerde, çalıştaylarda ya da
              Naal Bilim dergisinin yeni sayısında yer almak istiyorsan başvuru formunu doldurman yeterli.
            </p>
            <Button asChild className="mt-8">
              <a href="/basvuru">Başvuru Formu</a>
            </Button>
          </div>
        </section>

        <section id="kunye" className="mx-auto mt-24 max-w-page scroll-mt-6 px-4 md:px-6">
          <SectionTitle>Künye</SectionTitle>
          <dl className="mx-auto mt-10 max-w-2xl">
            <KunyeRow label="Kulüp">{club?.title || "Bilim Kulübü"}</KunyeRow>
            <KunyeRow label="Okul">Nevzat Ayaz Anadolu Lisesi</KunyeRow>
            {owners.length > 0 && (
              <KunyeRow label={owners.length > 1 ? "Kulüp Başkanları" : "Kulüp Başkanı"}>
                {owners.map((owner) => (
                  <span key={owner} className="block">{owner}</span>
                ))}
              </KunyeRow>
            )}
            <KunyeRow label="E-posta">
              <a href="mailto:bilim@naal.org.tr" className="hover:text-primary hover:underline">bilim@naal.org.tr</a>
            </KunyeRow>
            {instagramAccounts.length > 0 && (
              <KunyeRow label="Instagram">
                {instagramAccounts.map((account) => (
                  <a
                    key={account}
                    href={`https://instagram.com/${account}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block italic hover:text-primary hover:underline"
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
                    className="block italic hover:text-primary hover:underline"
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
