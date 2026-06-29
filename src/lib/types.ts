export type MediaType = 'photo' | 'video'
export type Category = 'travel' | 'hotel'

export interface MediaItem {
  id: string
  title: string
  category: Category
  mediaType: MediaType
  year: number
  imageUrl: string       // always required — thumbnail or hero still
  vimeoId?: string       // video items only
  description?: string
  featured: boolean      // include on homepage grid
  client?: string
  aspectRatio?: 'landscape' | 'portrait' | 'square'  // drives grid tile sizing
}

export interface FeaturedProject {
  id: string             // URL slug
  title: string
  client?: string
  clientUrl?: string
  clients?: { name: string; url: string }[]  // multiple collaborators
  year: number
  heroImage: string
  description: string
  mediaType: MediaType
  vimeoId?: string
  gallery: string[]      // ordered list of image paths for case-study page
  shotOn?: string        // displayed only as footer credit on case-study page
  instagramEmbeds?: string[]  // post/reel URLs — triggers embed layout
}
