import { featuredMediaItems } from '@/data/media'
import MediaGrid from '@/components/grid/MediaGrid'

export default function HomePage() {
  return (
    <>
      {/* Full-bleed hero */}
      <section className="relative h-screen flex items-end pb-16 px-6 overflow-hidden bg-ink">
        {/* Swap this div for a real hero image/video once assets arrive */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/20 to-ink/60" />
        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <p className="text-gold/70 text-xs tracking-[0.3em] uppercase mb-3 font-body">
            Travel & Lifestyle
          </p>
          <h1 className="font-display text-5xl sm:text-7xl md:text-8xl text-background font-light italic leading-none">
            Gone Offline
          </h1>
          <p className="mt-4 text-background/60 text-sm tracking-widest uppercase font-body">
            Photography & Videography by Zoe and Les
          </p>
        </div>
      </section>

      {/* Mixed grid — recent featured work */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24">
        <MediaGrid items={featuredMediaItems} />
      </section>
    </>
  )
}
