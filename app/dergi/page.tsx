import type { Metadata } from "next"
import Image from "next/image"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { NumberTag, PageHero } from "@/components/heading"
import { getMagazines, issueHref, issueLabel, publishedMonth, shortIssueLabel, toRoman } from "@/lib/supabase"

export const metadata: Metadata = {
  title: { absolute: "Bilim Dergisi" },
  description: "Nevzat Ayaz Anadolu Lisesi Bilim Kulübü'nün bilim dergisi: öğrencilerin yazdığı bilim makaleleri ve bulmacalar.",
  alternates: {
    canonical: "https://bilim.naal.org.tr/dergi",
  },
}

export default async function Dergi() {
  const [current, ...previous] = await getMagazines()
  const href = current ? issueHref(current) : null
  const month = current ? publishedMonth(current) : null
  const paragraphs = (current?.description ?? "")
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)

  return (
    <>
      <Header />

      <main>
        <PageHero title="Bilim Dergisi">Öğrencilerimizin yazdığı bilim makaleleri ve bulmacalar.</PageHero>

        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {current ? (
              <div className={`grid items-center gap-12 ${current.cover_url ? "md:grid-cols-[minmax(0,20rem)_1fr]" : ""}`}>
                {current.cover_url && (
                  <a
                    href={href ?? undefined}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mx-auto block w-full max-w-xs"
                  >
                    <Image
                      src={current.cover_url}
                      alt={`Bilim Dergisi Sayı ${toRoman(current.issue_number)} kapağı`}
                      width={720}
                      height={1020}
                      priority
                      className="h-auto w-full rounded-lg border shadow-lg"
                    />
                  </a>
                )}
                <div>
                  <p className="tag bg-accent-yellow">{issueLabel(current)}</p>
                  {month && <p className="mt-2 text-sm text-muted-foreground">Yayımlandı · {month}</p>}
                  {paragraphs.map((paragraph) => (
                    <p key={paragraph} className="mt-4 text-muted-foreground">
                      {paragraph}
                    </p>
                  ))}
                  {current.stories.length > 0 && (
                    <ol className="mt-8 grid gap-6 sm:grid-cols-3">
                      {current.stories.map((story, index) => (
                        <li key={`${index}-${story.title}`} className="card p-6">
                          <NumberTag index={index}>{toRoman(index + 1)}</NumberTag>
                          <p className="mt-3 font-semibold leading-snug text-foreground">{story.title}</p>
                          {story.detail && <p className="mt-1 text-sm text-muted-foreground">{story.detail}</p>}
                        </li>
                      ))}
                    </ol>
                  )}
                  {href && (
                    <div className="mt-10 flex flex-wrap items-center gap-4">
                      <a href={href} target="_blank" rel="noopener noreferrer" className="button">
                        Dergiyi Oku
                      </a>
                    </div>
                  )}
                  {previous.length > 0 && (
                    <p className="mt-8 border-t pt-4 text-sm text-muted-foreground">
                      <span className="font-semibold text-foreground">{previous.length > 1 ? "Önceki Sayılar" : "Önceki Sayı"}</span>
                      {previous.map((magazine) => {
                        const previousHref = issueHref(magazine)
                        return previousHref ? (
                          <a
                            key={magazine.id}
                            href={previousHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-3 underline hover:text-foreground"
                          >
                            {shortIssueLabel(magazine)}
                          </a>
                        ) : (
                          <span key={magazine.id} className="ml-3">
                            {shortIssueLabel(magazine)}
                          </span>
                        )
                      })}
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <p className="mx-auto max-w-2xl text-center text-muted-foreground">
                Bilim Dergisi&apos;nin yeni sayısı hazırlanıyor.
              </p>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
