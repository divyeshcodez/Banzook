export interface Drop {
  id: string;
  slug: string;
  number: string;
  name: string;
  description: string;
  status: 'available' | 'coming-soon' | 'archived';
  statusLabel: string;
  heroImage: string;
  storyTitle: string;
  storyParagraphs: string[];
  galleryImages: string[];
  featuredProductIds: string[];
  releaseDate: string;
}

export const DROPS: Drop[] = [
  {
    id: 'drop-001',
    slug: 'drop-001-built-different',
    number: '001',
    name: 'BUILT DIFFERENT',
    description: 'A manifestation of identity, movement, and structured confidence. Created for those who refuse to blend in, featuring custom high-density prints and heavy organic silhouettes.',
    status: 'available',
    statusLabel: 'AVAILABLE NOW',
    heroImage: '/images/hero_campaign.png',
    storyTitle: 'IDENTITY. MOVEMENT. CONFIDENCE.',
    storyParagraphs: [
      'DROP 001 is about the moment you stop trying to fit in. It is a visual dialogue between comfort and heavy structure, designed to reclaim space.',
      'Constructed with meticulous attention to fabric weight and cut, every piece serves as a medium of self-expression in an over-standardized world.'
    ],
    galleryImages: [
      '/images/product_tee.png',
      '/images/rebel_bg.png',
      '/images/outsider_bg.png'
    ],
    featuredProductIds: ['prod-13', 'prod-14', 'prod-15', 'prod-16', 'prod-17'],
    releaseDate: 'RELEASED 07.2026'
  },
  {
    id: 'drop-002',
    slug: 'drop-002-future-shift',
    number: '002',
    name: 'FUTURE SHIFT',
    description: 'A study on adaptive utility, technical textiles, and modular garment construction. Evolving the streetwear lexicon for the next horizon.',
    status: 'coming-soon',
    statusLabel: 'COMING SOON',
    heroImage: '/images/creator_bg.png',
    storyTitle: 'ADAPTIVE RESISTANCE.',
    storyParagraphs: [
      'An exploration into water-repellent weaves, adjustable modular compartments, and dynamic pocket configurations designed for urban utility.',
      'A silent protest against static design. Built to move, adapt, and protect.'
    ],
    galleryImages: [
      '/images/outsider_bg.png',
      '/images/editorial_mumbai.png',
      '/images/community_grid.png'
    ],
    featuredProductIds: [],
    releaseDate: 'FALL 2026'
  },
  {
    id: 'drop-000',
    slug: 'drop-000-proto',
    number: '000',
    name: 'THE ARCHETYPE',
    description: 'The foundation capsule that started the movement. Minimalist branding combined with raw edges and signature orange detailing.',
    status: 'archived',
    statusLabel: 'ARCHIVED',
    heroImage: '/images/rebel_bg.png',
    storyTitle: 'THE ORIGIN CODE.',
    storyParagraphs: [
      'Before the drops, there was the baseline. A raw, unedited concept focused entirely on silhouette proportion and textural raw edges.',
      'Strictly limited, never to be reproduced. The blueprint of BANZOOK.'
    ],
    galleryImages: [
      '/images/community_grid.png',
      '/images/product_tee.png',
      '/images/creator_bg.png'
    ],
    featuredProductIds: [],
    releaseDate: 'RELEASED 03.2026'
  }
];
