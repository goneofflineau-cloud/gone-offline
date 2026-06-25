import { FeaturedProject } from '@/lib/types'

export const featuredProjects: FeaturedProject[] = [
  {
    id: 'ha-giang-loop-project',
    title: 'Ha Giang Loop',
    year: 2023,
    heroImage: '/images/projects/ha-giang-hero.jpg',
    description:
      'A week on a motorbike through the winding mountain passes of northern Vietnam — rice terraces, karst peaks, and villages untouched by time.',
    mediaType: 'video',
    vimeoId: 'PLACEHOLDER_VIMEO_ID',
    gallery: [
      '/images/projects/ha-giang-1.jpg',
      '/images/projects/ha-giang-2.jpg',
      '/images/projects/ha-giang-3.jpg',
    ],
    shotOn: 'Sony A7IV · DJI Mavic 3',
  },
  {
    id: 'dolomites-project',
    title: 'Italian Dolomites',
    year: 2023,
    heroImage: '/images/projects/dolomites-hero.jpg',
    description:
      'Hiking through one of the most dramatic mountain ranges in Europe — sheer rock faces, alpine meadows, and skies that stop you mid-step.',
    mediaType: 'photo',
    gallery: [
      '/images/projects/dolomites-1.jpg',
      '/images/projects/dolomites-2.jpg',
      '/images/projects/dolomites-3.jpg',
    ],
    shotOn: 'Sony A7IV',
  },
  {
    id: 'banff-project',
    title: 'Banff Winter',
    year: 2023,
    heroImage: '/images/projects/banff-hero.jpg',
    description:
      'Five days in the Canadian Rockies — snowboarding, frozen lakes, and the kind of cold that makes everything feel more alive.',
    mediaType: 'video',
    vimeoId: 'PLACEHOLDER_VIMEO_ID',
    gallery: [
      '/images/projects/banff-1.jpg',
      '/images/projects/banff-2.jpg',
    ],
    shotOn: 'Sony A7IV · DJI Mavic 3',
  },
]
