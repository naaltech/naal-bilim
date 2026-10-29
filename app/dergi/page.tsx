import type { Metadata } from "next"
import Image from "next/image"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { getMagazines, issueHref, issueLabel, publishedMonth, shortIssueLabel, toRoman } from "@/lib/supabase"

export const revalidate = 300

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
        <div className="smallcaps flex justify-between text-ink-soft">
          <span>Nevzat Ayaz Anadolu Lisesi</span>
          <span className="hidden sm:inline">Bilim Kulübü</span>
        </div>
        <h1 className="mt-6 text-center text-5xl font-semibold italic tracking-tight md:text-6xl">Naal Bilim Dergisi</h1>
        <div className="rule mx-auto mt-4 max-w-[12rem]">
          <span className="diamond" />
        </div>

        {current ? (
          <div className={`mt-12 grid items-center gap-12 ${current.cover_url ? "md:grid-cols-[minmax(0,20rem)_1fr]" : ""}`}>
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
                  className="h-auto w-full border border-ink/20 shadow-[0_18px_40px_-18px_rgba(46,31,18,0.55)]"
                />
              </a>
            )}
            <div>
              <p className="smallcaps text-rubric">{issueLabel(current)}</p>
              {month && <p className="mt-2 italic text-ink-soft">Yayımlandı · {month}</p>}
              {paragraphs.map((paragraph) => (
                <p key={paragraph} className="mt-4 text-lg leading-relaxed">
                  {paragraph}
                </p>
              ))}
              {current.stories.length > 0 && (
                <ol className="mt-8 grid gap-6 sm:grid-cols-3">
                  {current.stories.map((story, index) => (
                    <li key={`${index}-${story.title}`} className="border-t border-ink/30 pt-4">
                      <span className="font-display text-2xl font-semibold text-rubric">{toRoman(index + 1)}</span>
                      <p className="mt-1 text-lg font-medium leading-snug">{story.title}</p>
                      {story.detail && <p className="mt-1 text-sm italic text-ink-soft">{story.detail}</p>}
                    </li>
                  ))}
                </ol>
              )}
              {href && (
                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="smallcaps border border-rubric bg-rubric px-5 py-3 text-parchment-light hover:bg-ink hover:border-ink"
                  >
                    Dergiyi Oku
                  </a>
                </div>
              )}
              {previous.length > 0 && (
                <p className="mt-8 border-t border-ink/30 pt-4 text-ink-soft">
                  <span className="smallcaps text-rubric">{previous.length > 1 ? "Önceki Sayılar" : "Önceki Sayı"}</span>
                  {previous.map((magazine) => {
                    const previousHref = issueHref(magazine)
                    return previousHref ? (
                      <a
                        key={magazine.id}
                        href={previousHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-3 italic hover:text-rubric hover:underline"
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
          <p className="mx-auto mt-12 max-w-2xl text-center text-lg italic text-ink-soft">
            Naal Bilim&apos;in yeni sayısı hazırlanıyor.
          </p>
        )}
      </main>

      <Footer />
    </>
  )
}
