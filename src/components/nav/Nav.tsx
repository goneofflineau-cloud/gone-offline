'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const links = [
  { href: '/', label: 'Travel' },
  { href: '/hotels', label: 'Stays' },
  { href: '/featured-projects', label: 'Highlights & Projects' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Nav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm border-b border-ink/5">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="font-display text-xl tracking-widest uppercase text-ink hover:text-gold transition-colors"
        >
          Gone Offline
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-xs tracking-widest uppercase transition-colors hover:text-gold ${
                pathname === href ? 'text-gold' : 'text-ink/60'
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-px bg-ink transition-transform ${open ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-5 h-px bg-ink transition-opacity ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-px bg-ink transition-transform ${open ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="md:hidden bg-background border-t border-ink/5 px-6 py-6 flex flex-col gap-6">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={`text-sm tracking-widest uppercase transition-colors hover:text-gold ${
                pathname === href ? 'text-gold' : 'text-ink/60'
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
