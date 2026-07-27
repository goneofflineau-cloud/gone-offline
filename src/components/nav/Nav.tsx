'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { hotelProperties } from '@/data/hotels'
import { featuredProjects } from '@/data/projects'

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
  const [staysOpen, setStaysOpen] = useState(false)
  const [projectsOpen, setProjectsOpen] = useState(false)

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
          {links.map(({ href, label }) => {
            if (label === 'Stays') {
              return (
                <div
                  key={href}
                  className="relative"
                  onMouseEnter={() => setStaysOpen(true)}
                  onMouseLeave={() => setStaysOpen(false)}
                >
                  <Link
                    href={href}
                    className={`text-xs tracking-widest uppercase transition-colors hover:text-gold ${
                      pathname.startsWith('/hotels') ? 'text-gold' : 'text-ink/60'
                    }`}
                  >
                    {label}
                  </Link>

                  {staysOpen && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4">
                      <div className="bg-background border border-ink/8 shadow-lg py-3 w-56">
                        {hotelProperties.map((property) => (
                          <Link
                            key={property.id}
                            href={`/hotels/${property.id}`}
                            className={`block px-5 py-2 text-[10px] tracking-widest uppercase transition-colors hover:text-gold hover:bg-ink/3 ${
                              pathname === `/hotels/${property.id}` ? 'text-gold' : 'text-ink/60'
                            }`}
                          >
                            {property.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )
            }

            if (label === 'Highlights & Projects') {
              return (
                <div
                  key={href}
                  className="relative"
                  onMouseEnter={() => setProjectsOpen(true)}
                  onMouseLeave={() => setProjectsOpen(false)}
                >
                  <Link
                    href={href}
                    className={`text-xs tracking-widest uppercase transition-colors hover:text-gold ${
                      pathname === '/featured-projects' ? 'text-gold' : 'text-ink/60'
                    }`}
                  >
                    {label}
                  </Link>

                  {projectsOpen && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4">
                      <div className="bg-background border border-ink/8 shadow-lg py-3 w-56">
                        {featuredProjects.map((project) => (
                          <Link
                            key={project.id}
                            href={`/featured-projects#${project.id}`}
                            className="block px-5 py-2 text-[10px] tracking-widest uppercase transition-colors hover:text-gold hover:bg-ink/3 text-ink/60"
                          >
                            {project.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )
            }

            return (
              <Link
                key={href}
                href={href}
                className={`text-xs tracking-widest uppercase transition-colors hover:text-gold ${
                  pathname === href ? 'text-gold' : 'text-ink/60'
                }`}
              >
                {label}
              </Link>
            )
          })}
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
          {links.map(({ href, label }) => {
            if (label === 'Stays') {
              return (
                <div key={href}>
                  <button
                    onClick={() => setStaysOpen(!staysOpen)}
                    className={`text-sm tracking-widest uppercase transition-colors hover:text-gold flex items-center gap-2 ${
                      pathname.startsWith('/hotels') ? 'text-gold' : 'text-ink/60'
                    }`}
                  >
                    {label}
                    <span className="text-xs">{staysOpen ? '−' : '+'}</span>
                  </button>
                  {staysOpen && (
                    <div className="mt-3 ml-3 flex flex-col gap-3">
                      {hotelProperties.map((property) => (
                        <Link
                          key={property.id}
                          href={`/hotels/${property.id}`}
                          onClick={() => { setOpen(false); setStaysOpen(false) }}
                          className={`text-xs tracking-widest uppercase transition-colors hover:text-gold ${
                            pathname === `/hotels/${property.id}` ? 'text-gold' : 'text-ink/50'
                          }`}
                        >
                          {property.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )
            }

            if (label === 'Highlights & Projects') {
              return (
                <div key={href}>
                  <button
                    onClick={() => setProjectsOpen(!projectsOpen)}
                    className={`text-sm tracking-widest uppercase transition-colors hover:text-gold flex items-center gap-2 ${
                      pathname === '/featured-projects' ? 'text-gold' : 'text-ink/60'
                    }`}
                  >
                    {label}
                    <span className="text-xs">{projectsOpen ? '−' : '+'}</span>
                  </button>
                  {projectsOpen && (
                    <div className="mt-3 ml-3 flex flex-col gap-3">
                      {featuredProjects.map((project) => (
                        <Link
                          key={project.id}
                          href={`/featured-projects#${project.id}`}
                          onClick={() => { setOpen(false); setProjectsOpen(false) }}
                          className="text-xs tracking-widest uppercase transition-colors hover:text-gold text-ink/50"
                        >
                          {project.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )
            }

            return (
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
            )
          })}
        </nav>
      )}
    </header>
  )
}
