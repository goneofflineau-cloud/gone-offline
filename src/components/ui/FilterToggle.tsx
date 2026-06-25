'use client'

import { MediaType } from '@/lib/types'

type Filter = MediaType | 'all'

interface Props {
  value: Filter
  onChange: (v: Filter) => void
}

const options: { value: Filter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'photo', label: 'Photo' },
  { value: 'video', label: 'Video' },
]

export default function FilterToggle({ value, onChange }: Props) {
  return (
    <div className="flex items-center gap-1 border border-ink/10 p-1 w-fit">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`px-4 py-1.5 text-xs tracking-widest uppercase transition-colors ${
            value === opt.value
              ? 'bg-ink text-background'
              : 'text-ink/50 hover:text-ink'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}
