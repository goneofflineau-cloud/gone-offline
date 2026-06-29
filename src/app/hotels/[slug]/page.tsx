import { notFound } from 'next/navigation'
import { hotelProperties, getPropertyImages } from '@/data/hotels'
import HotelGallery from '@/components/hotel/HotelGallery'

interface Props {
  params: { slug: string }
}

export function generateStaticParams() {
  return hotelProperties.map((p) => ({ slug: p.id }))
}

export default function HotelPage({ params }: Props) {
  const property = hotelProperties.find((p) => p.id === params.slug)
  if (!property) notFound()

  const images = getPropertyImages(property.name)

  return (
    <div className="pt-28 pb-24 px-2 md:px-3">
      <header className="mb-12 px-1">
        <p className="text-gold text-xs tracking-[0.3em] uppercase mb-2 font-body">Selected Works</p>
        <h1 className="font-display text-5xl md:text-6xl font-light italic">{property.name}</h1>
      </header>

      <HotelGallery items={images} />
    </div>
  )
}
