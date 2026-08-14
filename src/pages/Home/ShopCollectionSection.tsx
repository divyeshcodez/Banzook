import React, { useState } from 'react';
import { Heart } from 'lucide-react';

const PRODUCTS = [
  {
    id: 1,
    title: 'BROKEN SYSTEM OVERSIZED TEE',
    material: '240 GSM Premium Cotton',
    price: '1,499',
    weight: '240 GSM',
    image: '/images/model_brokensystem.png',
    sizes: ['S', 'M', 'L', 'XL', 'XXL']
  },
  {
    id: 2,
    title: 'NO SMOKING GRAPHIC TEE',
    material: '220 GSM Pure Cotton',
    price: '1,299',
    weight: '220 GSM',
    image: '/images/model_nosmoking_front.jpg',
    sizes: ['S', 'M', 'L', 'XL', 'XXL']
  },
  {
    id: 3,
    title: 'KINDMIND HEAVYWEIGHT TEE',
    material: '280 GSM French Terry',
    price: '1,799',
    weight: '280 GSM',
    image: '/images/model_kindmind.png',
    sizes: ['S', 'M', 'L', 'XL', 'XXL']
  }
];

export const ShopCollectionSection: React.FC = () => {
  const [selectedSizes, setSelectedSizes] = useState<Record<number, string>>({
    1: 'L',
    2: 'M',
    3: 'L'
  });

  const handleSizeSelect = (productId: number, size: string) => {
    setSelectedSizes(prev => ({ ...prev, [productId]: size }));
  };

  return (
    <section id="shop-collection" className="bg-[#111111] text-white mt-10 md:mt-[60px] lg:mt-20 pt-24 md:pt-32 lg:pt-40 pb-24 md:pb-32 w-full relative overflow-hidden flex flex-col items-center">
      
      <div className="w-full max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        
        {/* Header Area */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-20 gap-8">
          <div className="max-w-2xl text-left">
            <div className="flex items-center gap-2 text-[#FF4D1A] text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase mb-5">
              CURATED. LIMITED. EXCLUSIVE.
            </div>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-condensed font-black tracking-tighter uppercase text-white leading-none">
              SHOP <span className="text-[#FF4D1A]">COLLECTION.</span>
            </h2>
          </div>
          
          {/* View All */}
          <div className="flex items-center pb-2">
            <button className="group flex items-center gap-3 text-white hover:text-[#FF4D1A] transition-colors duration-300">
               <span className="font-bold tracking-widest text-xs uppercase transition-colors">VIEW ALL</span>
               <span className="transition-transform group-hover:translate-x-1">→</span>
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full">
          {PRODUCTS.map((product) => (
            <div 
               key={product.id} 
               id={`product-${product.id}`}
               className="bg-[#161616] rounded-2xl p-5 border border-[#2A2A27] flex flex-col group transition-colors w-full"
            >
               
               {/* Image Area */}
               <div className="relative rounded-xl overflow-hidden mb-6 bg-[#0B0B0C] shrink-0" style={{ aspectRatio: '4/5' }}>
                  <img 
                    src={product.image} 
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 border border-white/5 rounded-xl pointer-events-none z-10" />
                  
                  {/* Weight Label */}
                  <div className="absolute top-3 left-3 bg-[#F4F0E8] text-black text-[9px] font-bold px-2 py-1 tracking-widest uppercase rounded shadow-sm z-20">
                     {product.weight}
                  </div>

                  {/* Wishlist Icon */}
                  <button className="absolute bottom-3 right-3 text-white/50 hover:text-white transition-colors z-20 w-8 h-8 flex items-center justify-center bg-black/20 backdrop-blur rounded-full">
                    <Heart size={16} />
                  </button>
               </div>

               {/* Product Details */}
               <div className="flex flex-col flex-1 text-left w-full">
                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-black font-condensed uppercase tracking-normal leading-snug mb-2 group-hover:text-[#FF4D1A] transition-colors line-clamp-2">
                     {product.title}
                  </h3>
                  
                  {/* Price & Material */}
                  <div className="flex items-center gap-3 mb-6">
                     <span className="text-white font-mono font-bold text-lg tracking-wide">₹{product.price}</span>
                     <span className="text-gray-500 text-[10px] font-mono uppercase tracking-[0.15em]">{product.material}</span>
                  </div>

                  {/* Size Selector & Add to Bag */}
                  <div className="mt-auto w-full flex flex-col gap-4">
                     
                     {/* Size Selector */}
                     <div className="flex gap-2 w-full">
                        {product.sizes.map(size => (
                           <button
                             key={size}
                             onClick={() => handleSizeSelect(product.id, size)}
                             className={`flex-1 h-[36px] text-[10px] font-bold transition-all border uppercase tracking-wider flex items-center justify-center rounded-md ${
                               selectedSizes[product.id] === size
                                 ? 'bg-white text-black border-white'
                                 : 'bg-transparent text-gray-400 border-[#2A2A27] hover:border-gray-400 hover:text-white'
                             }`}
                           >
                             {size}
                           </button>
                        ))}
                     </div>

                     {/* Premium Add to Bag Button */}
                     <button 
                       className="w-full py-3.5 bg-[#FF4D1A] text-black font-bold text-[10px] tracking-[0.2em] uppercase flex items-center justify-center gap-2 hover:bg-[#e04316] transition-colors rounded-md"
                     >
                        ADD TO BAG
                     </button>
                  </div>
               </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
