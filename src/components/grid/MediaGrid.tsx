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
      <div className="grid grid-cols-2 md:grid-cols-3 gap-1 md:gap-1.5">
        {items.map((item, i) => (
          <div key={item.id}>
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
