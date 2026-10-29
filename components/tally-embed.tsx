"use client"

import Script from "next/script"

declare global {
  interface Window {
    Tally?: { loadEmbeds: () => void }
  }
}

export default function TallyEmbed({ formId, title }: { formId: string; title: string }) {
  return (
    <>
      <iframe
        data-tally-src={`https://tally.so/embed/${formId}?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1`}
        loading="lazy"
        width="100%"
        height="900"
        title={title}
        className="block w-full border-0"
      />
      <Script
        src="https://tally.so/widgets/embed.js"
        strategy="afterInteractive"
        onReady={() => window.Tally?.loadEmbeds()}
      />
    </>
  )
}
