import { Ornament } from "@/components/ornament"

export function Masthead() {
  return (
    <div className="smallcaps flex justify-between text-muted-foreground">
      <span>Nevzat Ayaz Anadolu Lisesi</span>
      <span className="hidden sm:inline">Bilim Kulübü</span>
    </div>
  )
}

export function PageTitle({ children }: { children: React.ReactNode }) {
  return (
    <>
      <h1 className="mt-6 text-center text-5xl font-semibold italic tracking-tight md:text-6xl">{children}</h1>
      <Ornament className="mx-auto mt-4 max-w-[12rem]" />
    </>
  )
}

export function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-center">
      <h2 className="text-4xl font-semibold italic tracking-tight md:text-5xl">{children}</h2>
      <Ornament className="mx-auto mt-4 max-w-[12rem]" />
    </div>
  )
}
