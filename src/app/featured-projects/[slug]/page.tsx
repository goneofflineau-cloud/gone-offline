import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { featuredProjects } from '@/data/projects'
import VimeoPlayer from '@/components/vimeo/VimeoPlayer'

export function generateStaticParams() {
  return featuredProjects.map((p) => ({ slug: p.id }))
}

interface Props {
  params: { slug: string }
}

export default function ProjectPage({ params }: Props) {
  const project = featuredProjects.find((p) => p.id === params.slug)
  if (!project) notFound()

  return (
    <article className="pt-20">
      {/* Hero */}
      <div className="relative h-[70vh] md:h-screen overflow-hidden bg-ink">
        <Image
          src={project.heroImage}
          alt={project.title}
          fill
          className="object-cover opacity-90"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 max-w-4xl">
          <p className="text-gold/70 text-xs tracking-[0.3em] uppercase mb-3 font-body">
            {project.client ? `${project.client} · ` : ''}{project.year}
          </p>
          <h1 className="font-display text-5xl md:text-7xl text-background font-light italic leading-none">
            {project.title}
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-6 py-16 md:py-24">
        {/* Description */}
        <p className="font-body text-lg md:text-xl text-ink/70 leading-relaxed mb-16 max-w-2xl">
          {project.description}
        </p>

        {/* Featured video */}
        {project.mediaType === 'video' && project.vimeoId && (
          <div className="mb-16">
            <VimeoPlayer vimeoId={project.vimeoId} />
          </div>
        )}

        {/* Gallery */}
        {project.gallery.length > 0 && (
          <div className="columns-1 md:columns-2 gap-3 mb-16">
            {project.gallery.map((src, i) => (
              <div key={i} className="mb-3 break-inside-avoid relative aspect-video">
                <Image
                  src={src}
                  alt={`${project.title} — ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            ))}
          </div>
        )}

        {/* Shot on — footer credit */}
        {project.shotOn && (
          <p className="text-ink/30 text-xs tracking-widest uppercase font-body border-t border-ink/8 pt-8">
            Shot on {project.shotOn}
          </p>
        )}

        <div className="mt-12 pt-8 border-t border-ink/8">
          <Link
            href="/featured-projects"
            className="text-xs tracking-[0.2em] uppercase text-ink/40 hover:text-gold transition-colors font-body"
          >
            ← All Projects
          </Link>
        </div>
      </div>
    </article>
  )
}
