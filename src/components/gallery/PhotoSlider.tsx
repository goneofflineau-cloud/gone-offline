'use client'

import Image from 'next/image'
import { useRef } from 'react'

interface PhotoSliderProps {
  images: string[]
  alt: string
}

export default function PhotoSlider({ images, alt }: PhotoSliderProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return
    scrollRef.current.scrollBy({ left: dir === 'right' ? 420 : -420, behavior: 'smooth' })
  }

  if (!images.length) return null

  return (
    <div className="relative mt-10 group">
      {/* Scroll container */}
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {images.map((src, i) => (
          <div
            key={src}
            className="relative flex-none w-72 md:w-96 aspect-[3/4] snap-start overflow-hidden bg-ink/5"
          >
            <Image
              src={src}
              alt={`${alt} ${i + 1}`}
              fill
              className="object-cover transition-transform duration-500 hover:scale-[1.03]"
              sizes="(max-width: 768px) 288px, 384px"
            />
          </div>
        ))}
      </div>

      {/* Arrows */}
      <button
        onClick={() => scroll('left')}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 w-9 h-9 bg-background border border-ink/15 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:border-ink/40 z-10"
        aria-label="Scroll left"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <button
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 w-9 h-9 bg-background border border-ink/15 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:border-ink/40 z-10"
        aria-label="Scroll right"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 2L10 7L5 12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  )
}
