import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="px-6 md:px-12 py-16 border-t border-ink/8">
      <div className="max-w-7xl mx-auto">
        <p className="font-display text-2xl md:text-3xl font-light italic text-ink mb-6">
          Contact
        </p>
        <a
          href="mailto:goneofflineau@gmail.com"
          className="block text-sm text-ink/50 font-body tracking-wide hover:text-gold transition-colors mb-8"
        >
          goneofflineau@gmail.com
        </a>
        <div className="flex items-center gap-6">
          {/* Instagram */}
          <a
            href="https://www.instagram.com/zoe_laix"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-ink/40 hover:text-gold transition-colors"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
            </svg>
          </a>
          {/* Email */}
          <a
            href="mailto:goneofflineau@gmail.com"
            aria-label="Email"
            className="text-ink/40 hover:text-gold transition-colors"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <polyline points="2,4 12,13 22,4" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  )
}
