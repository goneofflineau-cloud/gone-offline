// Web3Forms — get a free access key at web3forms.com (no backend needed)
// Replace YOUR_WEB3FORMS_ACCESS_KEY below or set NEXT_PUBLIC_WEB3FORMS_KEY
// in a .env.local file (baked in at build time for static export)
'use client'

import { useState, FormEvent } from 'react'

const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? 'YOUR_WEB3FORMS_ACCESS_KEY'

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    const formData = new FormData(e.currentTarget)
    formData.append('access_key', ACCESS_KEY)

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()
      setStatus(data.success ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="pt-28 pb-24 max-w-2xl mx-auto px-4 md:px-6">
      <header className="mb-14">
        <p className="text-gold text-xs tracking-[0.3em] uppercase mb-2 font-body">Get in touch</p>
        <h1 className="font-display text-5xl md:text-6xl font-light italic">Contact</h1>
      </header>

      <div className="mb-12 space-y-3 text-ink/50 text-sm font-body">
        <a
          href="mailto:goneofflineau@gmail.com"
          className="block hover:text-gold transition-colors tracking-wide"
        >
          goneofflineau@gmail.com
        </a>
        <a
          href="https://www.instagram.com/zoe_laix"
          target="_blank"
          rel="noopener noreferrer"
          className="block hover:text-gold transition-colors tracking-wide"
        >
          @zoe_laix
        </a>
      </div>

      {status === 'success' ? (
        <div className="border border-gold/30 bg-gold/5 px-6 py-8 text-center">
          <p className="font-display text-2xl italic text-ink/70">Message sent — thank you.</p>
          <p className="mt-2 text-sm text-ink/40 font-body">We'll be in touch soon.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-6">
            <Field label="Name" name="name" type="text" required />
            <Field label="Email" name="email" type="email" required />
          </div>
          <Field label="Subject" name="subject" type="text" />
          <div className="space-y-2">
            <label className="block text-xs tracking-widest uppercase text-ink/40 font-body">
              Message
            </label>
            <textarea
              name="message"
              required
              rows={6}
              className="w-full bg-transparent border border-ink/10 px-4 py-3 text-sm font-body text-ink placeholder:text-ink/30 focus:outline-none focus:border-gold transition-colors resize-none"
              placeholder="Tell us about your project…"
            />
          </div>

          <button
            type="submit"
            disabled={status === 'sending'}
            className="text-xs tracking-[0.2em] uppercase border border-ink/20 px-8 py-3 hover:border-gold hover:text-gold transition-colors font-body disabled:opacity-40"
          >
            {status === 'sending' ? 'Sending…' : 'Send Message'}
          </button>

          {status === 'error' && (
            <p className="text-sm text-red-500/70 font-body">
              Something went wrong — please try emailing directly.
            </p>
          )}
        </form>
      )}
    </div>
  )
}

function Field({
  label,
  name,
  type,
  required,
}: {
  label: string
  name: string
  type: string
  required?: boolean
}) {
  return (
    <div className="space-y-2">
      <label className="block text-xs tracking-widest uppercase text-ink/40 font-body">
        {label}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        className="w-full bg-transparent border border-ink/10 px-4 py-3 text-sm font-body text-ink placeholder:text-ink/30 focus:outline-none focus:border-gold transition-colors"
      />
    </div>
  )
}
