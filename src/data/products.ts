export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  images: string[];
  category: 'Tees' | 'Hoodies' | 'Outerwear' | 'Accessories';
  collection: string;
  sizes: string[];
  availability: 'in-stock' | 'sold-out';
  isNew: boolean;
  isLimited: boolean;
  description: string;
  brand: string;
  condition: 'New' | 'Refurbished' | 'Used';
  deals?: string[];
  discount?: number; // e.g. 10 for 10% off
  flags?: string[];
  reviewStars: number;
}

export const PRODUCTS: Product[] = [
  {
    id: 'prod-13',
    name: 'BANZOOK x HOT WHEELS "CHALLENGE ACCEPTED" TEE',
    slug: 'banzook-hot-wheels-tee',
    price: 1499,
    images: ['/images/tshirts/tshirt_hotwheels.jpg', '/images/model_hotwheels.jpg'],
    category: 'Tees',
    collection: 'Drop 001',
    sizes: ['S', 'M', 'L', 'XL'],
    availability: 'in-stock',
    isNew: true,
    isLimited: true,
    description: 'Custom raglan boxy-fit tee featuring the iconic Hot Wheels flame branding on the chest, paired with a high-density vintage racing sports car graphic across the back.',
    brand: 'BANZOOK Originals',
    condition: 'New',
    reviewStars: 5,
    discount: 15,
    flags: ['Eligible for Pay On Delivery']
  },
  {
    id: 'prod-15',
    name: 'BANZOOK "KIND TO YOUR MIND" TEE',
    slug: 'banzook-kind-to-your-mind-tee',
    price: 1299,
    images: ['/images/tshirts/tshirt_kindmind.jpg', '/images/model_kindmind.png'],
    category: 'Tees',
    collection: 'Drop 001',
    sizes: ['S', 'M', 'L', 'XL'],
    availability: 'in-stock',
    isNew: true,
    isLimited: false,
    description: 'Drop-shoulder boxy fit tee in clean white cotton, featuring a soft pink watercolor heart graphic reading "be kind to your mind." on front chest and enlarged on the back.',
    brand: 'BANZOOK Code',
    condition: 'Refurbished',
    reviewStars: 4,
    deals: ['Today\'s Deals'],
    discount: 30
  },
  {
    id: 'prod-16',
    name: 'BANZOOK "LEGENDS NEVER DIE" MOTOR TEE',
    slug: 'banzook-legends-never-die-tee',
    price: 1499,
    images: ['/images/tshirts/tshirt_legends.jpg', '/images/model_legends.png'],
    category: 'Tees',
    collection: 'Drop 001',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    availability: 'in-stock',
    isNew: true,
    isLimited: true,
    description: 'Vintage washed cream tee featuring Speedway Motor Club flags on front, and a classic retro muscle car sunset illustration reading "LEGENDS NEVER DIE - Born To Drive" on the back.',
    brand: 'BANZOOK Originals',
    condition: 'New',
    reviewStars: 3,
    discount: 0,
    flags: ['Eligible for Pay On Delivery']
  },
  {
    id: 'prod-17',
    name: 'BANZOOK "BROKEN SYSTEM" REBEL TEE',
    slug: 'banzook-broken-system-tee',
    price: 1399,
    images: ['/images/tshirts/tshirt_brokensystem.jpg', '/images/model_brokensystem.png'],
    category: 'Tees',
    collection: 'Drop 001',
    sizes: ['S', 'M', 'L', 'XL'],
    availability: 'in-stock',
    isNew: true,
    isLimited: true,
    description: 'Anarchist theme graphic tee in vintage black. Features "REBEL YOUTH" chest print and a detailed distressed classic statue print overlaid with an anarchy symbol on the back.',
    brand: 'B-Series',
    condition: 'Used',
    reviewStars: 4,
    discount: 60
  },
  {
    id: 'prod-18',
    name: 'BANZOOK HEAVYWEIGHT "VOID" HOODIE',
    slug: 'banzook-void-hoodie',
    price: 3499,
    images: ['/images/tshirts/tshirt_legends.jpg', '/images/model_legends.png'],
    category: 'Hoodies',
    collection: 'Drop 002',
    sizes: ['M', 'L', 'XL'],
    availability: 'in-stock',
    isNew: true,
    isLimited: false,
    description: '450GSM organic cotton hoodie. Features an oversized fit with dropped shoulders and a minimal tonal embroidered logo on the chest.',
    brand: 'BANZOOK Originals',
    condition: 'New',
    reviewStars: 5,
    deals: ['All Discounts'],
    flags: ['Eligible for Pay On Delivery']
  },
  {
    id: 'prod-19',
    name: 'BANZOOK TACTICAL UTILITY VEST',
    slug: 'banzook-tactical-vest',
    price: 4999,
    images: ['/images/tshirts/tshirt_hotwheels.jpg', '/images/model_hotwheels.jpg'],
    category: 'Outerwear',
    collection: 'Archive',
    sizes: ['L', 'XL'],
    availability: 'sold-out',
    isNew: false,
    isLimited: true,
    description: 'Military-inspired utility vest with 3D cargo pockets, matte black hardware, and a durable ripstop nylon construction.',
    brand: 'BANZOOK Code',
    condition: 'New',
    reviewStars: 2,
    discount: 40
  },
  {
    id: 'prod-20',
    name: 'BANZOOK "CODE" SNAPBACK CAP',
    slug: 'banzook-code-snapback',
    price: 999,
    images: ['/images/tshirts/tshirt_kindmind.jpg', '/images/model_kindmind.png'],
    category: 'Accessories',
    collection: 'Essentials',
    sizes: ['OS'],
    availability: 'in-stock',
    isNew: true,
    isLimited: false,
    description: 'Classic 6-panel snapback cap featuring the Banzook "CODE" rubber patch logo on the front and an adjustable strap.',
    brand: 'BANZOOK Code',
    condition: 'Refurbished',
    reviewStars: 5,
    flags: ['Eligible for Pay On Delivery']
  }
];

