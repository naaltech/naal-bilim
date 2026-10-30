import Image from "next/image"

const navItems = [
  { href: "/#atolye", label: "Atölye", desktopOnly: true },
  { href: "/dergi", label: "Dergi" },
  { href: "/basvuru", label: "Başvuru" },
  { href: "/#kunye", label: "Künye" },
]

export default function Header() {
  return (
    <header className="border-b border-ink/25">
      <div className="mx-auto flex h-16 max-w-page items-center justify-between gap-4 px-4 md:px-6">
        <a href="/" className="flex shrink-0 items-center gap-2 sm:gap-3">
          <Image src="/bilim-logo.webp" alt="" width={52} height={38} className="h-auto w-10 sm:w-[52px]" priority />
          <span className="whitespace-nowrap font-display text-base font-semibold uppercase tracking-[0.12em] text-ink sm:text-lg sm:tracking-[0.18em]">Naal Bilim</span>
        </a>
        <nav className="flex items-center gap-3 text-base italic text-ink-soft sm:gap-7 sm:text-[1.05rem]">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`hover:text-rubric hover:underline${item.desktopOnly ? " hidden sm:inline" : ""}`}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
