import { Product, TestimonialQuote, LifestyleOutfit, PressQuote, UGCStyleCheck, InstagramPost, FitQuizQuestion } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'heavyweight-boxy-tee',
    name: 'Heavyweight Boxy Tee',
    tagline: '280 GSM Organic Carded Cotton',
    category: 'tops',
    price: 1499,
    rating: 4.9,
    reviewCount: 312,
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80',
    badge: 'NEW',
    badgeType: 'new',
    colors: [
      { name: 'Raw Chalk', hex: '#EBE7DF' },
      { name: 'Onyx Black', hex: '#1C1C1A' },
      { name: 'Muted Clay', hex: '#A35843' },
      { name: 'Sage Gray', hex: '#7A847A' }
    ],
    sizes: [
      { size: 'XS', label: 'XS — Boxy 38"', price: 1499, inStock: true },
      { size: 'S', label: 'S — Boxy 40"', price: 1499, inStock: true },
      { size: 'M', label: 'M — Boxy 42"', price: 1499, inStock: true },
      { size: 'L', label: 'L — Boxy 44"', price: 1499, inStock: true },
      { size: 'XL', label: 'XL — Boxy 47"', price: 1499, inStock: true }
    ],
    fabricDetails: '100% GOTS-certified organic cotton, 280 GSM heavyweight jersey. Pre-shrunk with enzyme wash for an ultra-clean drape.',
    fit: 'Relaxed, drop-shoulder silhouette with a structured collar that never sags.',
    description: 'Engineered for daily rotation. Our signature 280 GSM heavyweight tee holds its architectural shape wash after wash. Finished with blind hem stitch details and twin-needle reinforcement.',
    details: [
      'Heavyweight 280 GSM custom knit',
      'High 1.25" bound ribbed collar',
      'Twin-needle drop shoulder seam',
      'Pre-washed to eliminate post-laundering shrinkage',
      'Engineered for daily rotation'
    ],
    isBestseller: true,
    isNew: true,
    unisex: true
  },
  {
    id: 'wide-leg-pleated-trouser',
    name: 'Wide-Leg Pleated Trouser',
    tagline: 'Japanese Washed Cotton Twill',
    category: 'bottoms',
    price: 2999,
    rating: 4.8,
    reviewCount: 184,
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800&q=80',
    badge: 'CORE ESSENTIAL',
    badgeType: 'core',
    colors: [
      { name: 'Charcoal Slub', hex: '#2A2A28' },
      { name: 'Sand Taupe', hex: '#C5BCB1' },
      { name: 'Dark Olive', hex: '#3E423A' }
    ],
    sizes: [
      { size: '28', label: '28 / 30L', price: 2999, inStock: true },
      { size: '30', label: '30 / 31L', price: 2999, inStock: true },
      { size: '32', label: '32 / 32L', price: 2999, inStock: true },
      { size: '34', label: '34 / 32L', price: 2999, inStock: true },
      { size: '36', label: '36 / 32L', price: 2999, inStock: false }
    ],
    fabricDetails: '100% Japanese compact long-staple cotton twill, 310 GSM. High-density weave with a peach-skin matte touch.',
    fit: 'High-rise, relaxed through the thigh with gentle forward pleats falling into a fluid, straight wide leg.',
    description: 'The definitive pant for movement. Cut with double forward pleats and an internal elasticized waistband tab, providing tailored polish with the effortless comfort of loungewear.',
    details: [
      'Double reverse front pleats',
      'Concealed horn button closure with YKK zip fly',
      'Dual rear jet pockets with security button',
      'Deep trouser side pockets reinforced at stress points',
      'Subtle break over sneakers and loafers'
    ],
    isBestseller: true,
    isNew: false,
    unisex: true
  },
  {
    id: 'heavyweight-loopback-hoodie',
    name: 'Loopback Pullover Hoodie',
    tagline: '480 GSM French Terry Fleece',
    category: 'tops',
    price: 3299,
    rating: 4.9,
    reviewCount: 420,
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=80',
    badge: 'BEST SELLER',
    badgeType: 'bestseller',
    colors: [
      { name: 'Oatmeal Heather', hex: '#DCD6CB' },
      { name: 'Matte Ink', hex: '#161616' },
      { name: 'Terracotta Earth', hex: '#A35843' }
    ],
    sizes: [
      { size: 'S', label: 'S — Chest 42"', price: 3299, inStock: true },
      { size: 'M', label: 'M — Chest 45"', price: 3299, inStock: true },
      { size: 'L', label: 'L — Chest 48"', price: 3299, inStock: true },
      { size: 'XL', label: 'XL — Chest 51"', price: 3299, inStock: true }
    ],
    fabricDetails: '480 GSM dense loopback French terry. Zero drawstrings for a clean, architectural neckline.',
    fit: 'Subtly oversized body with structured drop shoulders and snug 3" ribbed waistband that sits naturally on the hips.',
    description: 'An uncompromising hoodie engineered without graphics or drawstrings. Features a double-layer crossover hood that stands on its own and high-gauge ribbing designed to hold tension.',
    details: [
      '480 GSM heavy loopback French terry',
      'Structured double-ply crossover hood (no drawstrings)',
      'Side rib panels for freedom of lateral movement',
      'Flatlock seam construction throughout',
      'Subtle tonal Banzook hem embroidery'
    ],
    isBestseller: true,
    isNew: false,
    unisex: true
  },
  {
    id: 'minimalist-wool-bomber',
    name: 'Minimalist Wool Bomber',
    tagline: '700 GSM Recycled Melton Wool',
    category: 'outerwear',
    price: 5999,
    originalPrice: 6999,
    rating: 5.0,
    reviewCount: 96,
    image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=800&q=80',
    badge: 'NEW',
    badgeType: 'new',
    colors: [
      { name: 'Espresso Melange', hex: '#262220' },
      { name: 'Onyx Navy', hex: '#1A202C' }
    ],
    sizes: [
      { size: 'S', label: 'S (36-38)', price: 5999, inStock: true },
      { size: 'M', label: 'M (39-41)', price: 5999, inStock: true },
      { size: 'L', label: 'L (42-44)', price: 5999, inStock: true },
      { size: 'XL', label: 'XL (45-47)', price: 5999, inStock: false }
    ],
    fabricDetails: '70% post-consumer recycled Melton wool, 30% organic nylon for abrasion resistance. Lined with smooth cupro-cotton twill.',
    fit: 'Modern boxy fit with slightly shortened body length designed for balanced layering over oversized hoodies and knitwear.',
    description: 'Subverting the traditional aviator jacket with clean minimalist lines. Clean collarless neckband, concealed two-way matte metal zipper, and interior storm pockets.',
    details: [
      '700 GSM thermal Melton wool blend',
      'Two-way matte black YKK Excella zipper',
      'Fully lined in breathable Japanese cupro',
      'Hidden magnetic closure side welt pockets',
      'Internal zippered passport security pocket'
    ],
    isBestseller: false,
    isNew: true,
    unisex: true
  },
  {
    id: 'relaxed-japanese-twill-pant',
    name: 'Relaxed Twill Pant',
    tagline: 'Garment-Dyed 9oz Cotton Twill',
    category: 'bottoms',
    price: 2799,
    rating: 4.8,
    reviewCount: 220,
    image: 'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=800&q=80',
    badge: 'BEST SELLER',
    badgeType: 'bestseller',
    colors: [
      { name: 'Bone White', hex: '#EDE8DF' },
      { name: 'Washed Black', hex: '#222220' },
      { name: 'Sediment Brown', hex: '#635348' }
    ],
    sizes: [
      { size: 'S (30)', label: 'S (Waist 30")', price: 2799, inStock: true },
      { size: 'M (32)', label: 'M (Waist 32")', price: 2799, inStock: true },
      { size: 'L (34)', label: 'L (Waist 34")', price: 2799, inStock: true },
      { size: 'XL (36)', label: 'XL (Waist 36")', price: 2799, inStock: true }
    ],
    fabricDetails: '100% long-staple cotton, vintage stone-washed for softened texture and authentic drape.',
    fit: 'Straight leg with a gentle taper, mid-rise with interior drawstring elastic combo.',
    description: 'Everyday utility meets refined tailoring. Cut from durable 9oz twill with an easy-pull waistband and reinforced knee articulators.',
    details: [
      'Garment-dyed for subtle color depth',
      'Dual utility welt side pockets',
      'Interior herringbone cotton drawstring',
      'Reinforced bar-tacking on stress seams'
    ],
    isBestseller: true,
    isNew: false,
    unisex: true
  },
  {
    id: 'technical-oversized-mac',
    name: 'Technical Oversized Mac Coat',
    tagline: 'Water-Repellent 3-Layer Shell',
    category: 'outerwear',
    price: 6499,
    rating: 4.9,
    reviewCount: 78,
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
    badge: 'NEW',
    badgeType: 'new',
    colors: [
      { name: 'Slate Moss', hex: '#4A524A' },
      { name: 'Onyx', hex: '#141414' }
    ],
    sizes: [
      { size: 'S', label: 'S (Unisex 36-39)', price: 6499, inStock: true },
      { size: 'M', label: 'M (Unisex 40-43)', price: 6499, inStock: true },
      { size: 'L', label: 'L (Unisex 44-47)', price: 6499, inStock: true }
    ],
    fabricDetails: '100% recycled nylon with non-fluorinated DWR waterproof coating. Breathable microporous back membrane.',
    fit: 'Generous A-line silhouette with articulated raglan sleeves for easy layering over blazers and heavy sweaters.',
    description: 'The modern commute overcoat. Lightweight weather protection crafted with storm flaps, concealed placket buttons, and taped interior seams.',
    details: [
      '10,000mm waterproof / 8,000g breathability',
      'Concealed front button storm placket',
      'Rear vent with magnetic stay',
      'Large internal storage pocket for tablet or notebook'
    ],
    isBestseller: false,
    isNew: true,
    unisex: true
  },
  {
    id: 'oversized-poplin-overshirt',
    name: 'Structured Poplin Overshirt',
    tagline: '200 GSM High-Density Cotton',
    category: 'tops',
    price: 2499,
    rating: 4.8,
    reviewCount: 145,
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80',
    badge: 'CORE ESSENTIAL',
    badgeType: 'core',
    colors: [
      { name: 'Optical White', hex: '#F7F7F7' },
      { name: 'Washed Charcoal', hex: '#2C2D30' },
      { name: 'Desert Sand', hex: '#D2C8BA' }
    ],
    sizes: [
      { size: 'S', label: 'S — Boxy 42"', price: 2499, inStock: true },
      { size: 'M', label: 'M — Boxy 45"', price: 2499, inStock: true },
      { size: 'L', label: 'L — Boxy 48"', price: 2499, inStock: true },
      { size: 'XL', label: 'XL — Boxy 51"', price: 2499, inStock: true }
    ],
    fabricDetails: 'Compact 2-ply high-count cotton poplin with a crisp, matte hand-feel.',
    fit: 'Square-cut silhouette with straight hem and dropped armholes. Worn open over tees or buttoned solo.',
    description: 'An elevated overshirt bridging casual tailoring and effortless daily wear. Minimalist chest patch pocket and genuine bio-resin buttons.',
    details: [
      'Square cut with side seam slits for movement',
      'Clean point collar with hidden neck stays',
      'Twin oversized patch pockets',
      'Bio-resin matte buttons'
    ],
    isBestseller: false,
    isNew: false,
    unisex: true
  },
  {
    id: 'heavyweight-ribbed-beanie',
    name: 'Heavy Ribbed Merino Beanie',
    tagline: '100% Extra-Fine Merino Wool',
    category: 'accessories',
    price: 999,
    rating: 4.9,
    reviewCount: 380,
    image: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&w=800&q=80',
    badge: 'BEST SELLER',
    badgeType: 'bestseller',
    colors: [
      { name: 'Oatmeal', hex: '#DFD8CC' },
      { name: 'Onyx', hex: '#111111' },
      { name: 'Muted Clay', hex: '#A35843' }
    ],
    sizes: [
      { size: 'O/S', label: 'One Size (Universal Stretch)', price: 999, inStock: true }
    ],
    fabricDetails: '100% non-mulesed extrafine merino wool, 7-gauge fisherman rib.',
    fit: 'Structured crown that can be worn cuffed or slightly slouchy.',
    description: 'Ultra-soft, non-itch merino wool engineered to regulate temperature year-round. Zero pill guarantee.',
    details: [
      '7-gauge heavy fisherman rib knit',
      'Fold-over 2.5" adjustable brim',
      'Naturally antibacterial and moisture-wicking'
    ],
    isBestseller: true,
    isNew: false,
    unisex: true
  },
  {
    id: 'organic-canvas-daily-tote',
    name: 'Architectural Canvas Tote',
    tagline: '16oz Heavyweight Cotton Duck',
    category: 'accessories',
    price: 1499,
    rating: 4.9,
    reviewCount: 160,
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
    badge: 'CORE',
    badgeType: 'core',
    colors: [
      { name: 'Natural Ecru', hex: '#EAE5D9' },
      { name: 'Washed Black', hex: '#212120' }
    ],
    sizes: [
      { size: 'O/S', label: '24L Capacity (Fits 16" Laptop)', price: 1499, inStock: true }
    ],
    fabricDetails: '16oz unbleached organic cotton duck canvas with reinforced stress bar-tacks.',
    fit: 'Structured standing base with dual length handles for hand carry or shoulder drape.',
    description: 'A heavy-duty everyday carry built with internal water bottle sleeves and a zipped valuables pocket.',
    details: [
      'Dual-length strap system (hand & shoulder carry)',
      'Interior padded 16" laptop sleeve',
      'Solid brass D-ring for keys',
      'Flat reinforced base that stands upright'
    ],
    isBestseller: false,
    isNew: true,
    unisex: true
  },
  {
    id: 'core-uniform-bundle',
    name: 'The Core Uniform Set (3-Piece)',
    tagline: 'Boxy Tee + Twill Pant + Loopback Hoodie',
    category: 'bundles',
    price: 6499,
    originalPrice: 7597,
    rating: 5.0,
    reviewCount: 215,
    image: 'https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&w=800&q=80',
    badge: 'SAVE ₹1,098',
    badgeType: 'limited',
    colors: [
      { name: 'Monochrome Set', hex: '#1F1F1E' },
      { name: 'Earth Neutral Set', hex: '#D7D0C5' }
    ],
    sizes: [
      { size: 'S Set', label: 'All Pieces Size S', price: 6499, inStock: true },
      { size: 'M Set', label: 'All Pieces Size M', price: 6499, inStock: true },
      { size: 'L Set', label: 'All Pieces Size L', price: 6499, inStock: true },
      { size: 'XL Set', label: 'All Pieces Size XL', price: 6499, inStock: true }
    ],
    fabricDetails: 'Complete 3-piece capsule crafted from 100% GOTS organic cotton & Japanese twill.',
    fit: 'Curated cohesive oversized fit designed to pair seamlessly.',
    description: 'The foundational wardrobe system. Includes the Heavyweight Boxy Tee, Relaxed Twill Pant, and Loopback Pullover Hoodie at a bundle price.',
    details: [
      'Includes 1x Heavyweight Boxy Tee (₹1,499 value)',
      'Includes 1x Relaxed Twill Pant (₹2,799 value)',
      'Includes 1x Loopback Hoodie (₹3,299 value)',
      'Packed in recycled organic cotton dust bag'
    ],
    isBestseller: true,
    isNew: false,
    unisex: true
  },
  {
    id: 'essentials-3-pack',
    name: 'Essentials 3-Pack',
    tagline: '3 Heavyweight Tees, Mixed Colors',
    category: 'bundles',
    price: 3799,
    originalPrice: 4497,
    rating: 4.9,
    reviewCount: 412,
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?auto=format&fit=crop&w=800&q=80',
    badge: 'SAVE 15%',
    badgeType: 'limited',
    colors: [{ name: 'Mixed Basics', hex: '#666666' }],
    sizes: [
      { size: 'S', label: 'Size S (All)', price: 3799, inStock: true },
      { size: 'M', label: 'Size M (All)', price: 3799, inStock: true },
      { size: 'L', label: 'Size L (All)', price: 3799, inStock: true }
    ],
    fabricDetails: '3x 280 GSM organic cotton tees.',
    fit: 'Boxy drop-shoulder silhouette.',
    description: 'Stock up on your daily uniform. Includes one black, one white, and one grey tee.',
    details: ['3x Heavyweight Tees', '15% automatic bulk discount'],
    isBestseller: true,
    isNew: false,
    unisex: true
  },
  {
    id: 'team-hoodie-set',
    name: 'Team Hoodie Set',
    tagline: '5x 480 GSM French Terry Hoodies',
    category: 'bundles',
    price: 13999,
    originalPrice: 16495,
    rating: 5.0,
    reviewCount: 28,
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
    badge: 'TEAM PACK',
    badgeType: 'core',
    colors: [{ name: 'Bulk Mix', hex: '#222222' }],
    sizes: [{ size: 'Mixed', label: 'Mixed Sizes (Specify at Checkout)', price: 13999, inStock: true }],
    fabricDetails: '5x Heavyweight loopback hoodies.',
    fit: 'Oversized structured fit.',
    description: 'Outfit your team or crew. Five hoodies at a wholesale-tier discount.',
    details: ['5x Pullover Hoodies', 'Bulk order pricing applied'],
    isBestseller: false,
    isNew: true,
    unisex: true
  },
  {
    id: 'basics-bundle-duo',
    name: 'Basics Bundle Duo',
    tagline: 'Tee + Twill Pant',
    category: 'bundles',
    price: 3799,
    originalPrice: 4298,
    rating: 4.8,
    reviewCount: 156,
    image: 'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=800&q=80',
    badge: 'CORE DUO',
    badgeType: 'bestseller',
    colors: [{ name: 'Neutral', hex: '#EDE8DF' }],
    sizes: [{ size: 'M/32', label: 'Top M / Bottom 32', price: 3799, inStock: true }],
    fabricDetails: 'Organic cotton top, Japanese twill bottom.',
    fit: 'Relaxed all around.',
    description: 'The two foundational pieces you need to start building your wardrobe.',
    details: ['1x Tee, 1x Pant', 'Save 15%'],
    isBestseller: true,
    isNew: false,
    unisex: true
  },
  {
    id: 'layering-set',
    name: 'Layering Set',
    tagline: 'Tee + Overshirt + Jacket',
    category: 'bundles',
    price: 8499,
    originalPrice: 9997,
    rating: 5.0,
    reviewCount: 45,
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
    badge: 'SAVE 15%',
    badgeType: 'limited',
    colors: [{ name: 'Mixed', hex: '#333' }],
    sizes: [{ size: 'M', label: 'Size M (All)', price: 8499, inStock: true }],
    fabricDetails: 'Varied weights for complete seasonal layering.',
    fit: 'Engineered to fit perfectly over each other.',
    description: 'The complete upper-body system. Three layers designed to work individually or stacked.',
    details: ['3 cohesive pieces', 'Discounted set pricing'],
    isBestseller: false,
    isNew: true,
    unisex: true
  },
  {
    id: 'mini-wardrobe-starter',
    name: 'Mini Wardrobe Starter Kit',
    tagline: '5 Core Items',
    category: 'bundles',
    price: 11999,
    originalPrice: 13795,
    rating: 4.9,
    reviewCount: 89,
    image: 'https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&w=800&q=80',
    badge: 'BEST VALUE',
    badgeType: 'core',
    colors: [{ name: 'Capsule Colors', hex: '#EBE7DF' }],
    sizes: [{ size: 'Custom', label: 'Select Sizes (In Cart)', price: 11999, inStock: true }],
    fabricDetails: 'Complete wardrobe rotation.',
    fit: 'Standard Banzook relaxed fits.',
    description: 'Everything you need for a 5-day rotation. 2 tees, 1 pant, 1 hoodie, 1 overshirt.',
    details: ['5 full-size pieces', 'Total wardrobe reset'],
    isBestseller: true,
    isNew: false,
    unisex: true
  },
  {
    id: 'group-order-pack',
    name: 'Group Order Pack',
    tagline: '10+ Units, Max Discount',
    category: 'bundles',
    price: 22999,
    originalPrice: 28999,
    rating: 5.0,
    reviewCount: 12,
    image: 'https://images.unsplash.com/photo-1576566036402-2d8c01a4bc58?auto=format&fit=crop&w=800&q=80',
    badge: 'WHOLESALE',
    badgeType: 'new',
    colors: [{ name: 'Assorted', hex: '#111111' }],
    sizes: [{ size: 'Mixed', label: 'Provide Breakdown via Email', price: 22999, inStock: true }],
    fabricDetails: 'Assorted heavy cottons.',
    fit: 'Universal block.',
    description: 'Stocking up for a retreat, crew, or staff? Get our deepest per-unit discount.',
    details: ['10 item minimum', 'Dedicated account manager'],
    isBestseller: false,
    isNew: true,
    unisex: true
  },
  {
    id: 'core-basics-ritual',
    name: 'Core Basics Ritual',
    tagline: '2 Tees + 1 Tote',
    category: 'bundles',
    price: 3899,
    originalPrice: 4497,
    rating: 4.7,
    reviewCount: 230,
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
    colors: [{ name: 'Mixed', hex: '#635348' }],
    sizes: [{ size: 'L', label: 'Tees (L)', price: 3899, inStock: true }],
    fabricDetails: 'Canvas + Cotton.',
    fit: 'Standard',
    description: 'The weekend farmers market uniform. Heavy canvas tote and two reliable tees.',
    details: ['2x Tees', '1x 16oz Canvas Tote'],
    isBestseller: true,
    isNew: false,
    unisex: true
  },
  {
    id: 'build-ur-own',
    name: 'Build Ur Own Bundle',
    tagline: 'Pick Any 3 Items',
    category: 'bundles',
    price: 0,
    originalPrice: 0,
    rating: 5.0,
    reviewCount: 999,
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=80',
    badge: '20% OFF',
    badgeType: 'limited',
    colors: [{ name: 'Custom', hex: '#F7F7F7' }],
    sizes: [{ size: 'Any', label: 'Custom', price: 0, inStock: true }],
    fabricDetails: 'Your choice.',
    fit: 'Your choice.',
    description: 'Select any 3 full-priced items and automatically receive 20% off at checkout.',
    details: ['3 item minimum', 'Automatic cart discount'],
    isBestseller: true,
    isNew: false,
    unisex: true
  },
  {
    id: 'best-sellers-sample',
    name: 'Best Sellers Sample Pack',
    tagline: 'Top 4 Items + 20% Off',
    category: 'bundles',
    price: 9999,
    originalPrice: 12296,
    rating: 4.9,
    reviewCount: 340,
    image: 'https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&w=800&q=80',
    badge: 'POPULAR',
    badgeType: 'bestseller',
    colors: [{ name: 'Core Colors', hex: '#161616' }],
    sizes: [{ size: 'M', label: 'M (All)', price: 9999, inStock: true }],
    fabricDetails: 'Our four most reviewed fabrics.',
    fit: 'Signature block fits.',
    description: 'New to Banzook? Get our 4 highest-rated items at a special introductory discount.',
    details: ['4 iconic items', 'Save over ₹2,200'],
    isBestseller: true,
    isNew: false,
    unisex: true
  }
];

export const CATEGORIES_DATA = [
  {
    id: 'tops',
    title: 'TOPS',
    subtitle: 'Heavyweight tees, knitwear & overshirts',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80',
    count: '8 styles'
  },
  {
    id: 'bottoms',
    title: 'BOTTOMS',
    subtitle: 'Tailored pleats, relaxed twill & sweatpants',
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=600&q=80',
    count: '6 styles'
  },
  {
    id: 'outerwear',
    title: 'OUTERWEAR',
    subtitle: 'Wool bombers, mac coats & liners',
    image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=600&q=80',
    count: '5 styles'
  },
  {
    id: 'accessories',
    title: 'ACCESSORIES',
    subtitle: 'Heavy canvas bags, beanies & caps',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80',
    count: '4 styles'
  }
];

export const TESTIMONIAL_QUOTES: TestimonialQuote[] = [
  {
    id: 'quote-1',
    quote: 'The collar on the Boxy Tee has survived twenty washes without buckling. This is what clothing used to feel like before fast fashion took over.',
    author: 'Julian Mercer',
    location: 'Brooklyn, NY',
    verified: true,
    itemPurchased: 'Heavyweight Boxy Tee',
    rating: 5
  },
  {
    id: 'quote-2',
    quote: 'The drape of the Wide-Leg Pleated Trouser is astonishing. Sharp enough for client presentations, comfortable enough for an 8-hour flight.',
    author: 'Elena Vance',
    location: 'San Francisco, CA',
    verified: true,
    itemPurchased: 'Wide-Leg Pleated Trouser',
    rating: 5
  },
  {
    id: 'quote-3',
    quote: 'Zero logos, zero gimmicks. Just perfect weight, clean lines, and silhouettes that make you look put together with zero effort.',
    author: 'Marcus Chen',
    location: 'London, UK',
    verified: true,
    itemPurchased: 'The Core Uniform Set',
    rating: 5
  }
];

export const LIFESTYLE_OUTFITS: LifestyleOutfit[] = [
  {
    id: 'for-work',
    contextTag: 'FOR WORK',
    title: 'Tailored ease without corporate stiffness.',
    tagline: 'Refined drape designed for creative workspaces and hybrid days.',
    description: 'Pairing our high-density Structured Poplin Overshirt with the Wide-Leg Pleated Trouser creates clean geometry that reads sharp while offering complete movement flexibility.',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80',
    keyPieces: [
      { name: 'Structured Poplin Overshirt', price: 2499, productId: 'oversized-poplin-overshirt' },
      { name: 'Wide-Leg Pleated Trouser', price: 2999, productId: 'wide-leg-pleated-trouser' },
      { name: 'Architectural Canvas Tote', price: 1499, productId: 'organic-canvas-daily-tote' }
    ],
    modelDetails: 'Model is 6\'1" wearing Size M tops and Size 32 bottoms.'
  },
  {
    id: 'for-weekends',
    contextTag: 'FOR WEEKENDS',
    title: 'The weight of quality on resting days.',
    tagline: '480 GSM thermal comfort with zero slouch.',
    description: 'Built for morning coffee walks, gallery visits, and long afternoons. Our 480 GSM Loopback Hoodie combined with the Relaxed Twill Pant creates a structured silhouette that never looks sloppy.',
    image: 'https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&w=1200&q=80',
    keyPieces: [
      { name: 'Loopback Pullover Hoodie', price: 3299, productId: 'heavyweight-loopback-hoodie' },
      { name: 'Relaxed Twill Pant', price: 2799, productId: 'relaxed-japanese-twill-pant' },
      { name: 'Heavy Ribbed Merino Beanie', price: 999, productId: 'heavyweight-ribbed-beanie' }
    ],
    modelDetails: 'Model is 5\'10" wearing Size L in all pieces.'
  },
  {
    id: 'for-travel',
    contextTag: 'FOR TRAVEL',
    title: 'Pack less. Wear everywhere.',
    tagline: 'Wrinkle-resistant heavyweight textiles engineered for transit.',
    description: 'From airport security lines to unpredictable cabin temperatures, layer the Minimalist Wool Bomber over the Heavyweight Boxy Tee for effortless transit versatility.',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80',
    keyPieces: [
      { name: 'Minimalist Wool Bomber', price: 5999, productId: 'minimalist-wool-bomber' },
      { name: 'Heavyweight Boxy Tee', price: 1499, productId: 'heavyweight-boxy-tee' },
      { name: 'Architectural Canvas Tote', price: 1499, productId: 'organic-canvas-daily-tote' }
    ],
    modelDetails: 'Model is 5\'11" wearing Size S tops and Size 30 bottoms.'
  }
];

export const PRESS_QUOTES: PressQuote[] = [
  {
    id: 'press-1',
    quote: '"Banzook proves that minimalism isn’t boring — it’s the ultimate form of everyday luxury when fabrics are this dense and cuts are this precise."',
    outlet: 'GQ',
    authorOrDate: 'Spring Style Guide'
  },
  {
    id: 'press-2',
    quote: '"The anti-hype clothing brand that quietly mastered the drop-shoulder tee and wide-leg trouser for a new generation of design purists."',
    outlet: 'HIGHSNOBIETY',
    authorOrDate: 'Label Spotlight'
  },
  {
    id: 'press-3',
    quote: '"A masterclass in quiet confidence. Quality-over-noise apparel with zero synthetic shortcuts."',
    outlet: 'KINFOLK',
    authorOrDate: 'Wardrobe Essentials'
  },
  {
    id: 'press-4',
    quote: '"Banzook’s 480 GSM hoodie feels like armor against fast fashion. Worth every single rupee."',
    outlet: 'HYPEBEAST',
    authorOrDate: 'Uniform Review'
  }
];

export const UGC_STYLE_CHECKS: UGCStyleCheck[] = [
  {
    id: 'ugc-1',
    creator: 'Devon K.',
    handle: '@devonk_arch',
    image: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=600&q=80',
    caption: 'True to size, so comfortable. The collar on this 280 GSM tee does not budge even after continuous cycles.',
    taggedProductId: 'heavyweight-boxy-tee',
    taggedProductName: 'Heavyweight Boxy Tee in Raw Chalk',
    taggedProductPrice: 1499,
    taggedProductImage: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=300&q=80',
    stats: '6\'0" • Wears Size L',
    fitVerdict: 'Boxy drop-shoulder cut, perfectly balanced'
  },
  {
    id: 'ugc-2',
    creator: 'Mina Sato',
    handle: '@minasato_studio',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    caption: 'The pleats hold their razor crease effortlessly. Wore them straight from the studio to dinner with zero wrinkling.',
    taggedProductId: 'wide-leg-pleated-trouser',
    taggedProductName: 'Wide-Leg Pleated Trouser in Sand Taupe',
    taggedProductPrice: 2999,
    taggedProductImage: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=300&q=80',
    stats: '5\'8" • Wears Size 30',
    fitVerdict: 'High-rise with clean fluid break'
  },
  {
    id: 'ugc-3',
    creator: 'Aaron Cole',
    handle: '@aaron.monochrome',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    caption: 'No strings, no logos. The crossover hood stands erect and the French terry weight is substantial.',
    taggedProductId: 'heavyweight-loopback-hoodie',
    taggedProductName: 'Loopback Pullover Hoodie in Matte Ink',
    taggedProductPrice: 3299,
    taggedProductImage: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=300&q=80',
    stats: '6\'2" • Wears Size XL',
    fitVerdict: 'Subtly oversized with snug waistband'
  },
  {
    id: 'ugc-4',
    creator: 'Clara Berg',
    handle: '@claraberg.edit',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
    caption: 'Heavyweight Melton wool that keeps its shape even in freezing wind. The cupro lining is silky smooth.',
    taggedProductId: 'minimalist-wool-bomber',
    taggedProductName: 'Minimalist Wool Bomber in Espresso',
    taggedProductPrice: 5999,
    taggedProductImage: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=300&q=80',
    stats: '5\'9" • Wears Size M',
    fitVerdict: 'Structured boxy fit, great for layering'
  }
];

export const INSTAGRAM_POSTS: InstagramPost[] = [
  {
    id: 'ig-1',
    handle: '@banzook.in',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=500&q=80',
    caption: 'Drop 04 — Heavyweight Carded Cottons & Washed Twill.',
    productTagged: 'Heavyweight Boxy Tee'
  },
  {
    id: 'ig-2',
    handle: '@banzook.in',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=500&q=80',
    caption: 'Zero clutter. Quality over noise. Dressed for the way you move.',
    productTagged: 'Wide-Leg Pleated Trouser'
  },
  {
    id: 'ig-3',
    handle: '@banzook.in',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=500&q=80',
    caption: '700 GSM Melton wool. Built for longevity, engineered without logos.',
    productTagged: 'Minimalist Wool Bomber'
  },
  {
    id: 'ig-4',
    handle: '@banzook.in',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=500&q=80',
    caption: 'The everyday uniform. 3 pieces that rotate indefinitely.',
    productTagged: 'The Core Uniform Set'
  },
  {
    id: 'ig-5',
    handle: '@banzook.in',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=500&q=80',
    caption: 'Studio fitting sessions. Raw chalk and charcoal slub tones.',
    productTagged: 'Relaxed Twill Pant'
  }
];

export const FIT_QUIZ_QUESTIONS: FitQuizQuestion[] = [
  {
    id: 1,
    stepNumber: '01',
    category: 'SILHOUETTE IDENTITY',
    question: "What's your signature everyday proportion?",
    subtitle: 'Calibrating drape physics, shoulder drop, and hem geometry for your daily rotation.',
    options: [
      {
        label: 'Boxy & Dropped',
        desc: 'Heavyweight drop-shoulder cut with generous chest room and clean structured drape.',
        recommendedProductId: 'heavyweight-boxy-tee',
        badge: '🔥 STREET CORE',
        metric: 'Drape: 9.8/10 Structured'
      },
      {
        label: 'Architectural Wide-Leg',
        desc: 'Deep double pleats, fluid drape, and clean puddle stack at the sneaker break.',
        recommendedProductId: 'wide-leg-pleated-trouser',
        badge: '📐 EDITORIAL',
        metric: 'Flow: 9.4/10 Japanese Twill'
      },
      {
        label: 'Substantial 480 GSM Fleece',
        desc: 'Ultra-dense loopback cotton with crossover hood that never collapses or droops.',
        recommendedProductId: 'heavyweight-loopback-hoodie',
        badge: '☁️ 480 GSM HEFT',
        metric: 'Weight: 10/10 Cozy Armor'
      },
      {
        label: 'Curated 3-Piece Uniform',
        desc: 'Full monochromatic rotation: heavyweight tee, pleat trouser & layering overshirt.',
        recommendedProductId: 'core-uniform-bundle',
        badge: '⚡ FULL ROTATION',
        metric: 'Value: -20% Bundle Match'
      }
    ]
  },
  {
    id: 2,
    stepNumber: '02',
    category: 'PROPORTION CALIBRATION',
    question: 'How do you like garments to sit on your frame?',
    subtitle: 'We tune collar tension, sleeve length, and torso drape to eliminate cling completely.',
    options: [
      {
        label: 'Cropped Boxy',
        desc: 'Sits cleanly above the waistline to elongate leg lines and enhance proportions.',
        recommendedProductId: 'heavyweight-boxy-tee',
        badge: '✨ HIGH-RISE PAIR',
        metric: 'Zero Cling Guarantee'
      },
      {
        label: 'Relaxed Tailored',
        desc: 'Sharp shoulders, structured chest, and effortless fluid taper through the body.',
        recommendedProductId: 'oversized-poplin-overshirt',
        badge: '👔 CLEAN MINIMAL',
        metric: 'Desk-to-Dinner Ready'
      },
      {
        label: 'Substantial Oversized Drape',
        desc: 'Generous drape with structured body that holds its geometry all day long.',
        recommendedProductId: 'heavyweight-loopback-hoodie',
        badge: '🛡️ ARMOR STRUCTURE',
        metric: '100% Organic Ring-Spun'
      },
      {
        label: 'Floor-Sweeping Wide Flow',
        desc: 'Voluminous straight cut that stacks effortlessly over your sneaker rotation.',
        recommendedProductId: 'wide-leg-pleated-trouser',
        badge: '👟 SNEAKER STACK',
        metric: 'Wrinkle-Resistant Weave'
      }
    ]
  },
  {
    id: 3,
    stepNumber: '03',
    category: 'AESTHETIC & CONTEXT',
    question: 'Where is this piece putting in the most work?',
    subtitle: 'Matching breathability, thermal comfort, and durability to your daily routine.',
    options: [
      {
        label: 'Creative Studio & Tech Minimalist',
        desc: 'Sharp enough for meetings, relaxed enough for 12-hour design sprints.',
        recommendedProductId: 'oversized-poplin-overshirt',
        badge: '💻 FOUNDER / CREATIVE',
        metric: '120s Compact Poplin'
      },
      {
        label: 'Transit, Coffee Runs & Street Life',
        desc: 'Ultra-durable, weather-ready, and engineered for spontaneous city exploration.',
        recommendedProductId: 'technical-oversized-mac',
        badge: '🚇 COMMUTE PROOF',
        metric: 'Weather-Shield Shell'
      },
      {
        label: 'Late Night Studios & Slow Weekends',
        desc: 'Low-stimulation, heavyweight comfort that feels like a premium weighted blanket.',
        recommendedProductId: 'heavyweight-loopback-hoodie',
        badge: '🌙 UNWIND MODE',
        metric: 'Cloud Terry Interior'
      },
      {
        label: 'Gallery Nights & Seasonal Layering',
        desc: 'Dense Melton wool structured piece that makes every minimal fit look expensive.',
        recommendedProductId: 'minimalist-wool-bomber',
        badge: '🍸 NIGHT ROTATION',
        metric: '700 GSM Heritage Wool'
      }
    ]
  },
  {
    id: 4,
    stepNumber: '04',
    category: 'TEXTILE & TOUCH STANDARD',
    question: 'What textile sensation do you demand against your skin?',
    subtitle: 'Zero polyester. Only premium ring-spun organic cottons, Japanese twills, and natural wools.',
    options: [
      {
        label: '280+ GSM Crisp Organic Cotton',
        desc: 'Substantial hand feel, anti-sweat thickness, engineered high-retention rib collar.',
        recommendedProductId: 'heavyweight-boxy-tee',
        badge: '🏆 FLAGSHIP FABRIC',
        metric: '280 GSM Organic'
      },
      {
        label: 'Peach-Skin Draped Japanese Twill',
        desc: 'Micro-sanded finish with fluid weighted drape that glides with every stride.',
        recommendedProductId: 'wide-leg-pleated-trouser',
        badge: '🇯🇵 OSAKA WEAVE',
        metric: 'Sanded Twill Finish'
      },
      {
        label: '480 GSM Loopback French Terry',
        desc: 'Custom-knit dense loops, pre-shrunk, heavyweight fleece built for decades.',
        recommendedProductId: 'heavyweight-loopback-hoodie',
        badge: '🧶 HEAVYWEIGHT TERRY',
        metric: '480 GSM Custom Knit'
      },
      {
        label: 'All-In-One Uniform System',
        desc: 'Get the complete synchronized capsule in our signature raw chalk & charcoal palette.',
        recommendedProductId: 'core-uniform-bundle',
        badge: '📦 COMPLETE KIT',
        metric: 'Save ₹1,098 Instantly'
      }
    ]
  }
];
