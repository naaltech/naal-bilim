import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-muted/30 border-t border-border/50 mt-auto">
      <div className="container max-w-7xl mx-auto px-4 md:px-6 py-6">
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Nevzat Ayaz Anadolu Lisesi Bilim Kulübü. | Bu proje <Link href="https://github.com/naaltech/naal-bilim/blob/main/LICENSE" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">GPLv3</Link> ile lisanslanmıştır.
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            <Link href="https://naal.org.tr" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Etkileşim Ağı</Link>
            {" · "}
            Açık Kaynak: <Link href="https://github.com/naaltech/naal-bilim" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">GitHub</Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
