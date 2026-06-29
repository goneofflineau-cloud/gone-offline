'use client'

import { useEffect } from 'react'
import Script from 'next/script'

interface Props {
  urls: string[]
}

export default function InstagramEmbeds({ urls }: Props) {
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).instgrm) {
      ;(window as any).instgrm.Embeds.process()
    }
  }, [])

  return (
    <>
      <Script
        src="https://www.instagram.com/embed.js"
        strategy="afterInteractive"
        onLoad={() => {
          if ((window as any).instgrm) {
            ;(window as any).instgrm.Embeds.process()
          }
        }}
      />
      <div
        className="grid gap-6 overflow-x-auto"
        style={{ gridTemplateColumns: `repeat(${urls.length}, minmax(260px, 1fr))` }}
      >
        {urls.map((url) => (
          <blockquote
            key={url}
            className="instagram-media"
            data-instgrm-permalink={url}
            data-instgrm-version="14"
            style={{ margin: 0, width: '100%', minWidth: 'unset', maxWidth: '100%' }}
          >
            <a href={url} target="_blank" rel="noopener noreferrer">View on Instagram</a>
          </blockquote>
        ))}
      </div>
    </>
  )
}
