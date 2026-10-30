import Link from "next/link"
import Header from "@/components/header"
import { Ornament } from "@/components/ornament"

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="mx-auto flex min-h-[70vh] max-w-page flex-col items-center justify-center px-4 text-center">
        <p className="smallcaps text-primary">Sayfa bulunamadı</p>
        <h1 className="mt-4 text-5xl font-semibold italic">Bu sayfa defterde yok.</h1>
        <Ornament className="mt-6 w-full max-w-xs" />
        <Link href="/" className="mt-6 text-lg italic text-muted-foreground hover:text-primary hover:underline">
          Ana sayfaya dön
        </Link>
      </main>
    </>
  )
}
