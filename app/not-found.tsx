import Link from "next/link"
import Header from "@/components/header"

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="mx-auto flex min-h-[70vh] max-w-7xl flex-col items-center justify-center px-4 text-center sm:px-6 lg:px-8">
        <p className="tag bg-accent-yellow">Sayfa bulunamadı</p>
        <h1 className="mb-8 mt-4 text-4xl font-bold text-foreground md:text-5xl">Bu sayfa defterde yok.</h1>
        <Link href="/" className="button">
          Ana sayfaya dön
        </Link>
      </main>
    </>
  )
}
