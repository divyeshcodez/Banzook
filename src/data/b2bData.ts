export interface B2BCategory {
  id: string;
  name: string;
  description: string;
  moq: number;
  availableGsm: number[];
  availableColors: { name: string; hex: string }[];
  availableCustomizations: string[];
}

export const b2bColors = [
  { name: 'Black', hex: '#000000' },
  { name: 'White', hex: '#FFFFFF' },
  { name: 'Off White', hex: '#FAF9F6' },
  { name: 'Beige', hex: '#F5F5DC' },
  { name: 'Cream', hex: '#FFFDD0' },
  { name: 'Grey', hex: '#808080' },
  { name: 'Charcoal', hex: '#36454F' },
  { name: 'Navy Blue', hex: '#000080' },
  { name: 'Royal Blue', hex: '#4169E1' },
  { name: 'Sky Blue', hex: '#87CEEB' },
  { name: 'Red', hex: '#FF0000' },
  { name: 'Maroon', hex: '#800000' },
  { name: 'Green', hex: '#008000' },
  { name: 'Olive', hex: '#808000' },
  { name: 'Brown', hex: '#964B00' },
  { name: 'Yellow', hex: '#FFFF00' },
  { name: 'Orange', hex: '#FFA500' },
];

export const b2bCustomizations = [
  'No Printing',
  'Screen Printing',
  'DTF Printing',
  'Embroidery',
  'Custom Printing',
  'Other'
];

export const b2bCategories: B2BCategory[] = [
  {
    id: 'oversized-tshirt',
    name: 'Oversized T-Shirts',
    description: 'Premium drop-shoulder oversized fit.',
    moq: 50,
    availableGsm: [200, 220, 240, 260],
    availableColors: b2bColors,
    availableCustomizations: b2bCustomizations,
  },
  {
    id: 'round-neck-tshirt',
    name: 'Round Neck T-Shirts',
    description: 'Classic regular fit crew neck t-shirts.',
    moq: 50,
    availableGsm: [180, 200, 220, 240, 260],
    availableColors: b2bColors,
    availableCustomizations: b2bCustomizations,
  },
  {
    id: 'polo-tshirt',
    name: 'Polo T-Shirts',
    description: 'Professional collared polo shirts.',
    moq: 30,
    availableGsm: [220, 240, 260],
    availableColors: b2bColors,
    availableCustomizations: b2bCustomizations,
  },
  {
    id: 'hoodie',
    name: 'Hoodies',
    description: 'Heavyweight premium fleece hoodies.',
    moq: 30,
    availableGsm: [280, 300, 320, 350],
    availableColors: b2bColors,
    availableCustomizations: b2bCustomizations,
  },
  {
    id: 'sweatshirt',
    name: 'Sweatshirts',
    description: 'Cozy crewneck winter sweatshirts.',
    moq: 30,
    availableGsm: [280, 300, 320, 350],
    availableColors: b2bColors,
    availableCustomizations: b2bCustomizations,
  },
  {
    id: 'regular-fit-tshirt',
    name: 'Regular Fit T-Shirts',
    description: 'Standard comfortable everyday fit.',
    moq: 50,
    availableGsm: [180, 200, 220],
    availableColors: b2bColors,
    availableCustomizations: b2bCustomizations,
  },
  {
    id: 'dri-fit-tshirt',
    name: 'Dri-Fit T-Shirts',
    description: 'Moisture-wicking activewear.',
    moq: 50,
    availableGsm: [160, 180],
    availableColors: b2bColors,
    availableCustomizations: b2bCustomizations,
  },
  {
    id: 'jacket',
    name: 'Jackets',
    description: 'Premium custom jackets and windbreakers.',
    moq: 30,
    availableGsm: [300, 350],
    availableColors: b2bColors,
    availableCustomizations: b2bCustomizations,
  },
  {
    id: 'custom-apparel',
    name: 'Custom Apparel',
    description: 'Fully custom cut-and-sew manufacturing.',
    moq: 100,
    availableGsm: [180, 200, 220, 240, 260, 280, 300, 320, 350],
    availableColors: b2bColors,
    availableCustomizations: b2bCustomizations,
  },
  {
    id: 'other',
    name: 'Other / Request Custom',
    description: 'Have a unique requirement? Let us know.',
    moq: 50,
    availableGsm: [180, 200, 220, 240, 260, 280, 300, 320, 350],
    availableColors: b2bColors,
    availableCustomizations: b2bCustomizations,
  }
];
