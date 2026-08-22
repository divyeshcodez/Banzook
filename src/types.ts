export type ProductCategory = 'tops' | 'bottoms' | 'outerwear' | 'accessories' | 'bundles';

export interface ProductColor {
  name: string;
  hex: string;
  image?: string;
}

export interface ProductSize {
  size: string;
  label: string;
  price: number;
  inStock: boolean;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: ProductCategory;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  hoverImage?: string;
  badge?: string;
  badgeType?: 'new' | 'bestseller' | 'core' | 'limited';
  colors: ProductColor[];
  sizes: ProductSize[];
  fabricDetails: string;
  fit: string;
  description: string;
  details: string[];
  isBestseller?: boolean;
  isNew?: boolean;
  unisex: boolean;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  size: string;
  color: string;
  price: number;
  image: string;
  quantity: number;
  fabricSummary?: string;
  badge?: string;
}

export interface TestimonialQuote {
  id: string;
  quote: string;
  author: string;
  location: string;
  verified: boolean;
  itemPurchased: string;
  rating: number;
}

export interface LifestyleOutfit {
  id: string;
  contextTag: string; // e.g. "FOR WORK", "FOR WEEKENDS", "FOR TRAVEL"
  title: string;
  tagline: string;
  description: string;
  image: string;
  keyPieces: Array<{
    name: string;
    price: number;
    productId: string;
  }>;
  modelDetails: string;
}

export interface PressQuote {
  id: string;
  quote: string;
  outlet: string;
  authorOrDate: string;
}

export interface UGCStyleCheck {
  id: string;
  creator: string;
  handle: string;
  image: string;
  caption: string;
  taggedProductId: string;
  taggedProductName: string;
  taggedProductPrice: number;
  taggedProductImage: string;
  stats: string; // e.g. "5'10\" • Size L"
  fitVerdict: string; // e.g. "True to size, perfectly boxy"
}

export interface InstagramPost {
  id: string;
  handle: string;
  image: string;
  caption: string;
  productTagged: string;
}

export interface FitQuizQuestion {
  id: number;
  question: string;
  subtitle: string;
  options: Array<{
    label: string;
    desc: string;
    recommendedProductId: string;
  }>;
}

