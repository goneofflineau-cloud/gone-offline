import Image from 'next/image'
import { featuredProjects } from '@/data/projects'
import InstagramEmbeds from '@/components/instagram/InstagramEmbeds'

export const metadata = { title: 'Projects | Gone Offline' }

export default function FeaturedProjectsPage() {
  return (
    <>
      <div className="pt-28 pb-24">
        <header className="max-w-7xl mx-auto px-6 mb-20">
          <p className="text-gold text-xs tracking-[0.3em] uppercase mb-2 font-body">Selected</p>
          <h1 className="font-display text-5xl md:text-6xl font-light italic">Highlights & Projects</h1>
        </header>

        <div className="space-y-0">
          {featuredProjects.map((project, i) => {
            /* ── Embed layout (e.g. Visit Victoria) ── */
            if (project.instagramEmbeds?.length) {
              return (
                <article key={project.id} className="border-t border-ink/8 first:border-t-0 px-6 md:px-16 py-16 md:py-24">
                  <div className="max-w-2xl mb-12">
                    <h2 className="font-display text-4xl md:text-5xl font-light italic mb-4 leading-tight">
                      {project.title}
                    </h2>
                    {(project.client || project.clients?.length) && (
                      <p className="text-ink/40 text-xs tracking-[0.25em] uppercase mb-6 font-body flex flex-wrap gap-x-3 gap-y-1">
                        {project.clients ? (
                          project.clients.map((c) => (
                            <a key={c.name} href={c.url} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">
                              {c.name}
                            </a>
                          ))
                        ) : project.clientUrl ? (
                          <a href={project.clientUrl} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">
                            {project.client}
                          </a>
                        ) : (
                          project.client
                        )}
                      </p>
                    )}
                    <p className="text-ink/60 text-sm leading-relaxed font-body">
                      {project.description}
                    </p>
                  </div>

                  <InstagramEmbeds urls={project.instagramEmbeds} />
                </article>
              )
            }

            /* ── Standard image + text layout ── */
            const imageLeft = i % 2 === 0
            return (
              <article
                key={project.id}
                className="border-t border-ink/8 first:border-t-0"
              >
                <div className={`flex flex-col ${imageLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className="w-full md:w-1/2 relative aspect-[4/5] overflow-hidden bg-ink/5">
                    <Image
                      src={project.heroImage}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-[1.02]"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority={i === 0}
                    />
                  </div>

                  <div className="w-full md:w-1/2 flex items-center px-8 md:px-16 py-16 md:py-24">
                    <div className="max-w-sm">
                      <p className="text-ink/40 text-xs tracking-[0.25em] uppercase mb-4 font-body">
                        {project.client && (
                          <>
                            {project.clientUrl ? (
                              <a
                                href={project.clientUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-gold transition-colors"
                              >
                                {project.client}
                              </a>
                            ) : (
                              project.client
                            )}
                            {' · '}
                          </>
                        )}
                        {project.year}
                      </p>
                      <h2 className="font-display text-4xl md:text-5xl font-light italic mb-6 leading-tight">
                        {project.title}
                      </h2>
                      <p className="text-ink/60 text-sm leading-relaxed font-body">
                        {project.description}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </>
  )
}
