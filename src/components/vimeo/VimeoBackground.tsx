'use client'

// Muted, autoplay, looping tile — behaves like a moving photograph.
// Vimeo background mode requires the video to be unlisted or public.
export default function VimeoBackground({ vimeoId }: { vimeoId: string }) {
  const src = `https://player.vimeo.com/video/${vimeoId}?background=1&autoplay=1&loop=1&muted=1&quality=540p`

  return (
    <iframe
      src={src}
      className="absolute inset-0 w-full h-full pointer-events-none"
      allow="autoplay; fullscreen"
      loading="lazy"
      title=""
      aria-hidden="true"
    />
  )
}
