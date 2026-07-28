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
    description: 'Custom raglan boxy-fit tee featuring the iconic Hot Wheels flame branding on the chest, paired with a high-density vintage racing sports car graphic across the back.'
  },
  {
    id: 'prod-14',
    name: 'BANZOOK "NO SMOKING" TEE',
    slug: 'banzook-no-smoking-tee',
    price: 1299,
    images: [
      '/images/tshirts/tshirt_nosmoking.jpg',
      '/images/model_nosmoking_front.jpg',
      '/images/model_nosmoking_back.jpg',
      '/images/model_nosmoking_split.jpg'
    ],
    category: 'Tees',
    collection: 'Drop 001',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    availability: 'in-stock',
    isNew: true,
    isLimited: false,
    description: 'Ultra-heavyweight 300GSM organic cotton tee promoting healthy living. Silkscreened blue slogan "KILL YOUR BAD HABITS, NOT YOURSELF" on front and bold "NO SMOKING, BREATHE FREELY" design on back.'
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
    description: 'Drop-shoulder boxy fit tee in clean white cotton, featuring a soft pink watercolor heart graphic reading "be kind to your mind." on front chest and enlarged on the back.'
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
    description: 'Vintage washed cream tee featuring Speedway Motor Club flags on front, and a classic retro muscle car sunset illustration reading "LEGENDS NEVER DIE - Born To Drive" on the back.'
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
    description: 'Anarchist theme graphic tee in vintage black. Features "REBEL YOUTH" chest print and a detailed distressed classic statue print overlaid with an anarchy symbol on the back.'
  }
];

