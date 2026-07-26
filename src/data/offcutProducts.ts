export interface OffcutProduct {
  id: string;
  name: string;
  batchNumber: string;
  gsm: string;
  price: number;
  unitsLeft: number;
  totalUnits: number;
  fabricOrigin: string;
  staticImage: string;
  hoverVideo: string; // Placeholder or secondary video loop
  composition: string;
  description: string;
}

export const OFFCUT_PRODUCTS: OffcutProduct[] = [
  {
    id: 'offcut-01',
    name: 'SURPLUS FRENCH TERRY OVERSIZED HOODIE',
    batchNumber: 'BATCH 001 // RUN #42',
    gsm: '380 GSM',
    price: 135,
    unitsLeft: 4,
    totalUnits: 25,
    fabricOrigin: 'MILAN MILLS SURPLUS',
    staticImage: '/images/banzook_model_cinematic_hero.png',
    hoverVideo: 'https://assets.mixkit.co/videos/preview/mixkit-fashion-model-posing-in-a-black-jacket-40916-large.mp4',
    composition: '100% Unbleached Organic Cotton Offcuts',
    description: 'Constructed from heavy Milanese mills surplus french terry. Drop-shoulder cut with double-stitched raw hem lines. Each garment features a unique seam pattern from salvaged fabric edges.'
  },
  {
    id: 'offcut-02',
    name: 'RAW EDGE PATCHWORK UTILITY TEE',
    batchNumber: 'BATCH 002 // RUN #18',
    gsm: '320 GSM',
    price: 95,
    unitsLeft: 2,
    totalUnits: 20,
    fabricOrigin: 'TOKYO DEADSTOCK DENIM & TWILL',
    staticImage: '/images/model_nosmoking_pose.jpg',
    hoverVideo: 'https://assets.mixkit.co/videos/preview/mixkit-young-man-wearing-streetwear-walking-outdoors-42211-large.mp4',
    composition: '80% Salvaged Ring-Spun Cotton / 20% Twill Offcuts',
    description: 'Boxy-fit boxy silhouette stitched from Tokyo garment factory cutoffs. Industrial contrast thread-red bartack reinforcements on stress points.'
  },
  {
    id: 'offcut-03',
    name: 'ASYS-METRIC HEAVY COTTON OVERLAY SHIRT',
    batchNumber: 'BATCH 003 // RUN #09',
    gsm: '350 GSM',
    price: 120,
    unitsLeft: 6,
    totalUnits: 30,
    fabricOrigin: 'PORTUGUESE KNIT CUTOFFS',
    staticImage: '/images/banzook_model_centerpiece.png',
    hoverVideo: 'https://assets.mixkit.co/videos/preview/mixkit-man-posing-in-a-fashion-photoshoot-42177-large.mp4',
    composition: '95% Heavy Ribbed Cotton / 5% Elastane Offcuts',
    description: 'Salvaged from Portuguese knitwear production remnants. Features an asymmetrical hem, high mock collar, and serialized laser-etched batch stamp.'
  },
  {
    id: 'offcut-04',
    name: 'TACTICAL PANELLED STREET JACKET',
    batchNumber: 'BATCH 004 // RUN #31',
    gsm: '420 GSM',
    price: 185,
    unitsLeft: 1,
    totalUnits: 15,
    fabricOrigin: 'MUMBAI TECHNICAL CANVAS SURPLUS',
    staticImage: '/images/banzook_model_cinematic_zoom.png',
    hoverVideo: 'https://assets.mixkit.co/videos/preview/mixkit-model-posing-in-a-studio-41131-large.mp4',
    composition: '100% Water-Resistant Duck Canvas & Fleece',
    description: 'Ultra-heavy weight outerwear assembled from 14 distinct remnant panels. Waterproof seam taping and custom military-grade thread-red zipper tabs.'
  }
];
