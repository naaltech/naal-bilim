import type { Metadata } from "next"
import Image from "next/image"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Masthead, PageTitle } from "@/components/heading"
import { Button } from "@/components/ui/button"
import { getMagazines, issueHref, issueLabel, publishedMonth, shortIssueLabel, toRoman } from "@/lib/supabase"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Dergi",
  description: "Nevzat Ayaz Anadolu Lisesi Bilim Kulübü'nün dergisi Naal Bilim: öğrencilerin yazdığı bilim makaleleri ve bulmacalar.",
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

      <main className="mx-auto max-w-page px-4 pt-12 md:px-6 md:pt-16">
        <Masthead />
        <PageTitle>Naal Bilim Dergisi</PageTitle>

        {current ? (
          <div className={cn("mt-12 grid items-center gap-12", current.cover_url && "md:grid-cols-[minmax(0,20rem)_1fr]")}>
            {current.cover_url && (
              <a
                href={href ?? undefined}
                target="_blank"
                rel="noopener noreferrer"
                className="mx-auto block w-full max-w-xs"
              >
                <Image
                  src={current.cover_url}
                  alt={`Naal Bilim dergisi Sayı ${toRoman(current.issue_number)} kapağı`}
                  width={720}
                  height={1020}
                  priority
                  className="h-auto w-full border border-foreground/20 shadow-[0_18px_40px_-18px_hsl(var(--foreground)/0.55)]"
                />
              </a>
            )}
            <div>
              <p className="smallcaps text-primary">{issueLabel(current)}</p>
              {month && <p className="mt-2 italic text-muted-foreground">Yayımlandı · {month}</p>}
              {paragraphs.map((paragraph) => (
                <p key={paragraph} className="mt-4 text-lg leading-relaxed">
                  {paragraph}
                </p>
              ))}
              {current.stories.length > 0 && (
                <ol className="mt-8 grid gap-6 sm:grid-cols-3">
                  {current.stories.map((story, index) => (
                    <li key={`${index}-${story.title}`} className="border-t border-foreground/30 pt-4">
                      <span className="font-display text-2xl font-semibold text-primary">{toRoman(index + 1)}</span>
                      <p className="mt-1 text-lg font-medium leading-snug">{story.title}</p>
                      {story.detail && <p className="mt-1 text-sm italic text-muted-foreground">{story.detail}</p>}
                    </li>
                  ))}
                </ol>
              )}
              {href && (
                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <Button asChild>
                    <a href={href} target="_blank" rel="noopener noreferrer">
                      Dergiyi Oku
                    </a>
                  </Button>
                </div>
              )}
              {previous.length > 0 && (
                <p className="mt-8 border-t border-foreground/30 pt-4 text-muted-foreground">
                  <span className="smallcaps text-primary">{previous.length > 1 ? "Önceki Sayılar" : "Önceki Sayı"}</span>
                  {previous.map((magazine) => {
                    const previousHref = issueHref(magazine)
                    return previousHref ? (
                      <a
                        key={magazine.id}
                        href={previousHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-3 italic hover:text-primary hover:underline"
                      >
                        {shortIssueLabel(magazine)}
                      </a>
                    ) : (
                      <span key={magazine.id} className="ml-3 italic">
                        {shortIssueLabel(magazine)}
                      </span>
                    )
                  })}
                </p>
              )}
            </div>
          </div>
        ) : (
          <p className="mx-auto mt-12 max-w-2xl text-center text-lg italic text-muted-foreground">
            Naal Bilim&apos;in yeni sayısı hazırlanıyor.
          </p>
        )}
      </main>

      <Footer />
    </>
  )
}
