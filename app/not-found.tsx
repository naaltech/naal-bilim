import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <section className="flex flex-1 items-center justify-center px-4 py-24">
        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-bold tracking-tighter">Sayfa bulunamadı</h1>
          <p className="text-muted-foreground">Aradığınız sayfa taşınmış ya da hiç var olmamış olabilir.</p>
          <Button asChild>
            <Link href="/">Ana Sayfaya Dön</Link>
          </Button>
        </div>
      </section>
      <Footer />
    </main>
  )
}
