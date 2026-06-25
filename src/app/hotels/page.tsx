'use client'

import { useState } from 'react'
import { hotelItems } from '@/data/media'
import { MediaType } from '@/lib/types'
import MediaGrid from '@/components/grid/MediaGrid'
import FilterToggle from '@/components/ui/FilterToggle'

type Filter = MediaType | 'all'

export default function HotelsPage() {
  const [filter, setFilter] = useState<Filter>('all')

  const filtered =
    filter === 'all' ? hotelItems : hotelItems.filter((i) => i.mediaType === filter)

  return (
    <div className="pt-28 pb-24 max-w-7xl mx-auto px-4 md:px-6">
      <header className="mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
        <div>
          <p className="text-gold text-xs tracking-[0.3em] uppercase mb-2 font-body">Work</p>
          <h1 className="font-display text-5xl md:text-6xl font-light italic">Hotels</h1>
        </div>
        <FilterToggle value={filter} onChange={setFilter} />
      </header>
      <MediaGrid items={filtered} />
    </div>
  )
}
