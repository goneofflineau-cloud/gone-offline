import Link from 'next/link'
import Image from 'next/image'
import { featuredProjects } from '@/data/projects'

export default function FeaturedProjectsPage() {
  return (
    <div className="pt-28 pb-24">
      <header className="max-w-7xl mx-auto px-4 md:px-6 mb-16">
        <p className="text-gold text-xs tracking-[0.3em] uppercase mb-2 font-body">Selected</p>
        <h1 className="font-display text-5xl md:text-6xl font-light italic">Featured Projects</h1>
      </header>

      <div className="space-y-0">
        {featuredProjects.map((project, i) => (
          <article key={project.id} className="group relative">
            {/* Full-width hero image */}
            <div className="relative h-[60vh] md:h-[70vh] overflow-hidden bg-ink/10">
              <Image
                src={project.heroImage}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                sizes="100vw"
                priority={i === 0}
              />
              <div className="absolute inset-0 bg-ink/20 group-hover:bg-ink/30 transition-colors duration-500" />
            </div>

            {/* Project meta */}
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-b border-ink/8">
              <div>
                <p className="text-ink/40 text-xs tracking-widest uppercase mb-2 font-body">
                  {project.client ? `${project.client} · ` : ''}{project.year}
                </p>
                <h2 className="font-display text-3xl md:text-4xl font-light italic mb-3">
                  {project.title}
                </h2>
                <p className="text-ink/60 text-sm md:text-base max-w-xl leading-relaxed font-body">
                  {project.description}
                </p>
              </div>
              <Link
                href={`/featured-projects/${project.id}`}
                className="shrink-0 text-xs tracking-[0.2em] uppercase border border-ink/20 px-6 py-3 hover:border-gold hover:text-gold transition-colors font-body"
              >
                View Project
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
