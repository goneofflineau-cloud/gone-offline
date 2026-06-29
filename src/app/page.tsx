'use client'

import { useState } from 'react'
import { travelItems } from '@/data/media'
import { MediaType } from '@/lib/types'
import MediaGrid from '@/components/grid/MediaGrid'
import FilterToggle from '@/components/ui/FilterToggle'

type Filter = MediaType | 'all'

export default function HomePage() {
  const [filter, setFilter] = useState<Filter>('all')

  const filtered =
    filter === 'all' ? travelItems : travelItems.filter((i) => i.mediaType === filter)

  return (
    <div className="pt-28 pb-24 px-2 md:px-3">
      <div className="flex justify-end mb-8">
        <FilterToggle value={filter} onChange={setFilter} />
      </div>
      <MediaGrid items={filtered} />
    </div>
  )
}
