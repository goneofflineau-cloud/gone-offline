'use client'

// Full Vimeo player used inside the lightbox.
export default function VimeoPlayer({ vimeoId }: { vimeoId: string }) {
  const src = `https://player.vimeo.com/video/${vimeoId}?autoplay=1&title=0&byline=0&portrait=0`

  return (
    <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
      <iframe
        src={src}
        className="absolute inset-0 w-full h-full"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        title="Video player"
      />
    </div>
  )
}
