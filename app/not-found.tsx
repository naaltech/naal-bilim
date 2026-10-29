import Link from "next/link"
import Header from "@/components/header"

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="mx-auto flex min-h-[70vh] max-w-page flex-col items-center justify-center px-4 text-center">
        <p className="smallcaps text-rubric">Sayfa bulunamadı</p>
        <h1 className="mt-4 text-5xl font-semibold italic">Bu sayfa defterde yok.</h1>
        <div className="rule mt-6 w-full max-w-xs">
          <span className="diamond" />
        </div>
        <Link href="/" className="mt-6 text-lg italic text-ink-soft hover:text-rubric hover:underline">
          Ana sayfaya dön
        </Link>
      </main>
    </>
  )
}
