import Image from "next/image"
import { ArrowRight, Compass, ExternalLink, FlaskConical, Film, Mic, Users } from "lucide-react"
import { SiInstagram } from "@icons-pack/react-simple-icons"
import Header from "@/components/header"
import Footer from "@/components/footer"
import InstagramFeed from "@/components/instagram-feed"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getClub, getInstagramPosts, instagramHandle, splitList } from "@/lib/supabase"

export const revalidate = 300

const fallbackDescription =
  "Bilimin sınırı yoktur. Her geçen gün gelişir ve hayatımızı kolaylaştırmaya yardımcı olur. Bilimi en iyi konuşarak, tartışarak ve bu konuda uzmanlara sorular sorarak öğrenebiliriz."

const activities = [
  {
    icon: Mic,
    title: "Söyleşiler",
    text: "Alanında uzman bilim insanlarını okulumuzda ağırlıyor, merak ettiklerimizi doğrudan onlara soruyoruz.",
  },
  {
    icon: Compass,
    title: "Geziler",
    text: "Müzeleri, laboratuvarları ve araştırma merkezlerini ziyaret ederek bilimi yerinde görüyoruz.",
  },
  {
    icon: FlaskConical,
    title: "Çalıştaylar",
    text: "İç ve dış çalıştaylarda kara delikler gibi farklı konuları araştırıp tartışıyoruz.",
  },
  {
    icon: Film,
    title: "Belgesel Analizleri",
    text: "Bilim belgesellerini birlikte izliyor, ardından bilimsel yönlerini analiz ediyoruz.",
  },
]

function linkLabel(url: string) {
  try {
    return new URL(url.startsWith("http") ? url : `https://${url}`).hostname.replace(/^www\./, "")
  } catch {
    return url
  }
}

export default async function Home() {
  const club = await getClub()
  const instagramAccounts = splitList(club?.instagram ?? "naalbilim").map(instagramHandle)
  const posts = await getInstagramPosts(instagramAccounts)
  const owners = splitList(club?.owners ?? null)
  const links = splitList(club?.urls ?? null)
  const paragraphs = (club?.description || fallbackDescription).split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean)
  const mainAccount = instagramAccounts[0]

  return (
    <main className="flex min-h-screen flex-col">
      <Header />

      <section className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted">
        <div className="container max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-6 text-center">
            {club?.logo && (
              <div className="relative h-28 w-28 md:h-32 md:w-32 overflow-hidden rounded-full border bg-background shadow-sm">
                <Image src={club.logo} alt={club.title || "Bilim Kulübü"} fill className="object-cover" priority />
              </div>
            )}
            <div className="space-y-4 max-w-5xl">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                <span style={{ color: '#2ea5d5' }}>Nevzat Ayaz Anadolu Lisesi</span><br /> {club?.title || "Bilim Kulübü"}
              </h1>
              <p className="max-w-3xl mx-auto text-muted-foreground text-lg md:text-xl lg:text-2xl">
                Söyleşiler, geziler, çalıştaylar ve belgesel analizleriyle bilimi birlikte öğreniyoruz.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button size="lg" className="gap-2" asChild>
                <a href="#hakkimizda">
                  Bizi Tanıyın <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
              {mainAccount && (
                <Button size="lg" variant="outline" className="gap-2" asChild>
                  <a href={`https://instagram.com/${mainAccount}`} target="_blank" rel="noopener noreferrer">
                    <SiInstagram className="h-4 w-4" /> @{mainAccount}
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      <section id="hakkimizda" className="w-full py-12 md:py-24 bg-background scroll-mt-28">
        <div className="container max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid gap-10 md:grid-cols-3">
            <div className="md:col-span-2 space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Hakkımızda</h2>
              {paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-lg text-muted-foreground leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="space-y-4">
              {owners.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Users className="h-5 w-5 text-muted-foreground" />
                      Kulüp Başkanları
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-wrap gap-2">
                    {owners.map((owner) => (
                      <Badge key={owner} variant="secondary" className="text-sm font-normal">
                        {owner}
                      </Badge>
                    ))}
                  </CardContent>
                </Card>
              )}
              {(instagramAccounts.length > 0 || links.length > 0) && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <ExternalLink className="h-5 w-5 text-muted-foreground" />
                      Bağlantılar
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {instagramAccounts.map((account) => (
                      <a
                        key={account}
                        href={`https://instagram.com/${account}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-primary hover:underline"
                      >
                        <SiInstagram className="h-4 w-4" /> @{account}
                      </a>
                    ))}
                    {links.map((url) => (
                      <a
                        key={url}
                        href={url.startsWith("http") ? url : `https://${url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-primary hover:underline"
                      >
                        <ExternalLink className="h-4 w-4" /> {linkLabel(url)}
                      </a>
                    ))}
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>

      <section id="etkinlikler" className="w-full py-12 md:py-24 bg-muted scroll-mt-28">
        <div className="container max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Neler Yapıyoruz?</h2>
            <p className="max-w-3xl text-muted-foreground text-lg md:text-xl">
              Meraklı ve araştırmacı öğrencilerle bilimi hem öğreniyor hem de eğleniyoruz.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {activities.map(({ icon: Icon, title, text }) => (
              <Card key={title} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-background" style={{ color: '#2ea5d5' }}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">{title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="instagram" className="w-full py-12 md:py-24 bg-background scroll-mt-28">
        <div className="container max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Instagram&apos;dan Paylaşımlar</h2>
            <p className="max-w-3xl text-muted-foreground text-lg md:text-xl">
              Etkinliklerimizden kareler ve duyurular.
            </p>
          </div>
          <InstagramFeed posts={posts} />
          {mainAccount && (
            <div className="mt-10 text-center">
              <Button variant="outline" className="gap-2" asChild>
                <a href={`https://instagram.com/${mainAccount}`} target="_blank" rel="noopener noreferrer">
                  <SiInstagram className="h-4 w-4" /> Tüm paylaşımlar için Instagram&apos;a göz atın
                </a>
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
