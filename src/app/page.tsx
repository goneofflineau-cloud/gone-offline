import { travelItems } from '@/data/media'
import MediaGrid from '@/components/grid/MediaGrid'

export default function HomePage() {
  return (
    <div className="pt-28 pb-24 px-2 md:px-3">
      <MediaGrid items={travelItems} />
    </div>
  )
}
