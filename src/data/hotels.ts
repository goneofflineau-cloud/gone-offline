import { hotelItems } from './media'

export interface HotelProperty {
  id: string    // URL slug
  name: string  // matches title field in hotelItems
}

// Ordered list of properties — controls index page grid order
export const hotelProperties: HotelProperty[] = [
  { id: 'jiva-ninh-binh', name: 'JIVA Hoa Lu Retreat' },
  { id: 'somewhere-lombok', name: 'Somewhere Lombok' },
  { id: 'ritz-carlton-kyoto', name: 'Ritz-Carlton Kyoto' },
  { id: 'carrajung-estate', name: 'Carrajung Estate' },
  { id: 'velari-villa-tuscany', name: 'Velari Villa Tuscany' },
  { id: 'camina-suite-and-spa', name: 'Camina Suite and Spa' },
  { id: 'dorsett-gold-coast', name: 'Dorsett Gold Coast' },
  { id: 'queenscliff-hotel', name: 'Queenscliff Hotel' },
  { id: 'into-the-wild', name: 'Into the Wild' },
  { id: 'peppers-marysville', name: 'Peppers Marysville' },
  { id: 'five-acres-phillip-island', name: 'Five Acres Phillip Island' },
  { id: 'hilltop-at-bright', name: 'Hilltop at Bright' },
  { id: 'mantra-lorne', name: 'Mantra Lorne' },
]

// All images for a given property, in curated order
export function getPropertyImages(name: string) {
  return hotelItems.filter((item) => item.title === name)
}

// Cover image = first image for that property in the curated list
export function getCoverImage(name: string) {
  return getPropertyImages(name)[0]
}
