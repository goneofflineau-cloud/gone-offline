'use client'

import { useState, FormEvent } from 'react'
import Image from 'next/image'

const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? 'YOUR_WEB3FORMS_ACCESS_KEY'

const SERVICES = ['Photography', 'Videography', 'Both']

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [services, setServices] = useState<string[]>([])

  function toggleService(s: string) {
    setServices((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s])
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    const formData = new FormData(e.currentTarget)
    formData.append('access_key', ACCESS_KEY)
    formData.set('services', services.join(', '))

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
    <div className="min-h-screen pt-16 grid md:grid-cols-2">
      {/* Left — photo */}
      <div className="relative hidden md:block">
        <Image
          src="/images/contact/R0008118.jpg"
          alt="Gone Offline"
          fill
          className="object-cover"
          sizes="50vw"
          priority
        />
      </div>

      {/* Right — form */}
      <div className="px-8 md:px-16 py-20 flex flex-col justify-center">
        <h1 className="font-display text-4xl md:text-5xl font-light italic mb-4">
          Let's create
        </h1>
        <p className="text-sm text-ink/50 font-body leading-relaxed mb-12 max-w-sm">
          We take on a select number of collaborations each year to give every project the attention it deserves.
        </p>

        {status === 'success' ? (
          <div className="border border-gold/30 bg-gold/5 px-6 py-10">
            <p className="font-display text-2xl italic text-ink/70">Message sent — thank you.</p>
            <p className="mt-2 text-sm text-ink/40 font-body">We'll be in touch soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            <Field label="Name" name="name" type="text" required />
            <Field label="E-mail" name="email" type="email" required />

            {/* Service checkboxes */}
            <div className="space-y-3">
              <p className="text-xs tracking-widest uppercase text-ink/40 font-body">
                What are you interested in?
              </p>
              <div className="flex flex-wrap gap-3">
                {SERVICES.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => toggleService(s)}
                    className={`text-xs tracking-widest uppercase border px-4 py-2 font-body transition-colors ${
                      services.includes(s)
                        ? 'border-gold text-gold'
                        : 'border-ink/20 text-ink/50 hover:border-ink/40'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Project description */}
            <div className="space-y-2">
              <label className="block text-xs tracking-widest uppercase text-ink/40 font-body">
                Tell us about your project
              </label>
              <textarea
                name="message"
                required
                rows={5}
                className="w-full bg-transparent border-b border-ink/20 py-3 text-sm font-body text-ink placeholder:text-ink/30 focus:outline-none focus:border-gold transition-colors resize-none"
                placeholder="Scope, goals, timeline…"
              />
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              className="text-xs tracking-[0.2em] uppercase border border-ink/20 px-8 py-3 hover:border-gold hover:text-gold transition-colors font-body disabled:opacity-40"
            >
              {status === 'sending' ? 'Sending…' : 'Submit your project'}
            </button>

            {status === 'error' && (
              <p className="text-sm text-red-500/70 font-body">
                Something went wrong — please email us directly at goneofflineau@gmail.com
              </p>
            )}
          </form>
        )}
      </div>
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
        className="w-full bg-transparent border-b border-ink/20 py-3 text-sm font-body text-ink placeholder:text-ink/30 focus:outline-none focus:border-gold transition-colors"
      />
    </div>
  )
}
