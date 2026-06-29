'use client'

import Image from 'next/image'
import { MediaItem } from '@/lib/types'
import VimeoBackground from '@/components/vimeo/VimeoBackground'

interface Props {
  item: MediaItem
  onClick: () => void
  priority?: boolean
}

export default function MediaTile({ item, onClick, priority = false }: Props) {
  // aspect-ratio class drives tile height in the CSS-column masonry grid
  const aspectClass =
    item.aspectRatio === 'portrait'
      ? 'aspect-[3/4]'
      : item.aspectRatio === 'square'
      ? 'aspect-square'
      : 'aspect-video'

  return (
    <button
      onClick={onClick}
      className={`group relative w-full ${aspectClass} overflow-hidden bg-ink/5 block`}
      aria-label={`View ${item.title}`}
    >
      {item.mediaType === 'video' && item.vimeoId ? (
        <>
          <Image
            src={item.imageUrl}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={priority}
          />
          <div className="absolute inset-0 hidden sm:block overflow-hidden">
            <VimeoBackground vimeoId={item.vimeoId} />
          </div>
        </>
      ) : (
        <Image
          src={item.imageUrl}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={priority}
        />
      )}

      <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/30 transition-colors duration-300 flex items-end p-4">
        <span className="text-background font-display text-lg italic opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-1 group-hover:translate-y-0">
          {item.title}
        </span>
      </div>

      {item.mediaType === 'video' && (
        <span className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-gold opacity-80" />
      )}
    </button>
  )
}
