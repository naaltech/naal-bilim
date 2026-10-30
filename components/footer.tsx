import Image from "next/image"

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-ink/25">
      <div className="mx-auto max-w-page px-4 pt-16 md:px-6">
        <Image
          src="/agac.webp"
          alt="Kökleri ve dallarıyla bir ağaç çizimi"
          width={1100}
          height={976}
          className="mx-auto h-auto w-full max-w-xl"
        />
        <div className="mt-10 flex items-center justify-center gap-8">
          <Image src="/bilim-logo.webp" alt="Bilim Kulübü" width={96} height={70} className="h-auto w-24" />
          <Image src="/naal-logo.webp" alt="Nevzat Ayaz Anadolu Lisesi" width={40} height={62} className="h-auto w-10" />
        </div>
        <div className="mt-10 space-y-1 pb-10 text-center text-sm italic text-ink-soft">
          <p>
            © {new Date().getFullYear()} Nevzat Ayaz Anadolu Lisesi Bilim Kulübü. | Bu proje{" "}
            <a href="https://raw.githubusercontent.com/naaltech/naal-bilim/refs/heads/main/LICENSE" target="_blank" rel="noopener noreferrer" className="hover:text-rubric hover:underline">GPLv3</a>{" "}
            ile lisanslanmıştır.
          </p>
          <p>
            <a href="https://naal.org.tr" target="_blank" rel="noopener noreferrer" className="hover:text-rubric hover:underline">Etkileşim Ağı</a>
            <span className="mx-2">·</span>
            <a href="https://github.com/naaltech/naal-bilim" target="_blank" rel="noopener noreferrer" className="hover:text-rubric hover:underline">GitHub</a>
          </p>
        </div>
      </div>
    </footer>
  )
}
