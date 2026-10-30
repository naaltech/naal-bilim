export function PageHero({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="bg-gradient-to-b from-muted/70 to-transparent py-20">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h1 className="mb-6 text-4xl font-bold text-foreground md:text-5xl">{title}</h1>
        <p className="mx-auto max-w-2xl text-xl text-muted-foreground">{children}</p>
      </div>
    </section>
  )
}

const tagColors = ["bg-primary", "bg-accent-cyan", "bg-accent-yellow"]

export function NumberTag({ index, children }: { index: number; children: React.ReactNode }) {
  return <span className={`tag ${tagColors[index % tagColors.length]}`}>{children}</span>
}

export function SectionTitle({ children, description }: { children: React.ReactNode; description?: string }) {
  return (
    <div className="mb-12 text-center">
      <h2 className="mb-4 text-3xl font-bold text-foreground">{children}</h2>
      {description && <p className="mx-auto max-w-2xl text-muted-foreground">{description}</p>}
    </div>
  )
}
