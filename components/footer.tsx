const pages = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/dergi", label: "Dergi" },
  { href: "/#calistay", label: "Çalıştay" },
  { href: "/basvuru", label: "Başvuru" },
  { href: "/#instagram", label: "Instagram" },
]

export default function Footer() {
  return (
    <footer className="border-t bg-muted/60">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/*
        <Image
          src="/agac.webp"
          alt="Kökleri ve dallarıyla bir ağaç çizimi"
          width={1100}
          height={976}
          className="mx-auto mb-10 h-auto w-full max-w-xl"
        />
        */}
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="mb-2 text-lg font-semibold text-foreground">Bilim Kulübü</h3>
            <p className="text-sm text-muted-foreground">Nevzat Ayaz Anadolu Lisesi Bilim Kulübü</p>
          </div>
          <div>
            <h4 className="mb-2 text-sm font-semibold text-foreground">Sayfalar</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              {pages.map((page) => (
                <li key={page.href}>
                  <a href={page.href} className="hover:text-foreground">{page.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-2 text-sm font-semibold text-foreground">İletişim</h4>
            <div className="space-y-1 text-sm text-muted-foreground">
              <p>Nevzat Ayaz Anadolu Lisesi</p>
              <p>
                <a href="mailto:bilim@naal.org.tr" className="underline hover:text-foreground">bilim@naal.org.tr</a>
              </p>
            </div>
          </div>
        </div>
        <div className="mt-6 border-t pt-6 text-center text-sm text-muted-foreground">
          <p className="mb-2">
            © {new Date().getFullYear()} Nevzat Ayaz Anadolu Lisesi Bilim Kulübü. | Bu proje{" "}
            <a href="https://raw.githubusercontent.com/naaltech/naal-bilim/refs/heads/main/LICENSE" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">GPLv3</a>{" "}
            ile lisanslanmıştır.
          </p>
          <div className="flex items-center justify-center gap-4 text-xs">
            <a href="https://naal.org.tr" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">Etkileşim Ağı</a>
            <span>•</span>
            <a href="https://github.com/naaltech/naal-bilim" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">GitHub</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
