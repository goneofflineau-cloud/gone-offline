'use client'

import { useState } from 'react'
import { MediaItem } from '@/lib/types'
import MediaTile from './MediaTile'
import MediaLightbox from '@/components/lightbox/Lightbox'

interface Props {
  items: MediaItem[]
}

export default function MediaGrid({ items }: Props) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  return (
    <>
      {/*
        CSS column masonry — no JS reflow, graceful on mobile.
        Two columns on mobile, three on md, four on xl.
      */}
      <div className="columns-2 md:columns-3 xl:columns-4 gap-2 md:gap-3">
        {items.map((item, i) => (
          <div key={item.id} className="mb-2 md:mb-3 break-inside-avoid">
            <MediaTile
              item={item}
              onClick={() => setLightboxIndex(i)}
              priority={i < 4}
            />
          </div>
        ))}
      </div>

      {lightboxIndex !== null && (
        <MediaLightbox
          items={items}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </>
  )
}
