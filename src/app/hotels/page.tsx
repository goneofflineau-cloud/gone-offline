import Link from 'next/link'
import Image from 'next/image'
import { hotelProperties, getCoverImage } from '@/data/hotels'

export const metadata = { title: 'Stays | Gone Offline' }

export default function StaysPage() {
  return (
    <div className="pt-28 pb-24 px-2 md:px-3">
      <header className="mb-12 px-1">
        <p className="text-gold text-xs tracking-[0.3em] uppercase mb-2 font-body">Selected Works</p>
        <h1 className="font-display text-5xl md:text-6xl font-light italic">Stays</h1>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-[1cm]">
        {hotelProperties.map((property) => {
          const cover = getCoverImage(property.name)
          if (!cover) return null

          return (
            <div key={property.id}>
              <Link href={`/hotels/${property.id}`} className="group relative block w-full aspect-[3/4] overflow-hidden bg-ink/5">
                <Image
                  src={cover.imageUrl}
                  alt={property.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <div className="absolute inset-0 flex items-end justify-center" style={{ paddingBottom: 'calc(1.5rem + 2cm)' }}>
                  <span className="text-background font-display text-4xl italic text-center px-4 drop-shadow-lg">
                    {property.name}
                  </span>
                </div>
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}
