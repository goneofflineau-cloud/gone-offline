'use client'

import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import { MediaItem } from '@/lib/types'
import VimeoPlayer from '@/components/vimeo/VimeoPlayer'

interface Props {
  items: MediaItem[]
  index: number
  onClose: () => void
}

export default function MediaLightbox({ items, index, onClose }: Props) {
  // Build slides — photos use yarl's default image slide, videos use a custom render
  const slides = items.map((item) => ({
    src: item.imageUrl,
    alt: item.title,
    type: item.mediaType,
    vimeoId: item.vimeoId,
    title: item.title,
    description: item.description,
  }))

  return (
    <Lightbox
      open
      close={onClose}
      index={index}
      slides={slides}
      render={{
        slide: ({ slide }) => {
          const s = slide as (typeof slides)[number]
          if (s.type === 'video' && s.vimeoId) {
            return (
              <div className="flex flex-col items-center justify-center w-full h-full px-4">
                <div className="w-full max-w-4xl">
                  <VimeoPlayer vimeoId={s.vimeoId} />
                  {s.title && (
                    <p className="mt-4 text-center font-display text-xl italic text-background/80">
                      {s.title}
                    </p>
                  )}
                </div>
              </div>
            )
          }
          return null // yarl renders image slides by default
        },
      }}
      styles={{
        container: { backgroundColor: 'rgba(26,26,26,0.97)' },
      }}
      carousel={{ finite: false }}
    />
  )
}
