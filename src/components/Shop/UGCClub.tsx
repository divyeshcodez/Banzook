import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const UGC_POSTS = [
  { id: 1, handle: '@sarahstyle', src: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=400&q=80' },
  { id: 2, handle: '@marcus.fits', src: 'https://images.unsplash.com/photo-1550614000-4b95d466f22e?auto=format&fit=crop&w=400&q=80' },
  { id: 3, handle: '@jessiewears', src: 'https://images.unsplash.com/photo-1485230405346-71acb9518d9c?auto=format&fit=crop&w=400&q=80' },
  { id: 4, handle: '@minimal.man', src: 'https://images.unsplash.com/photo-1506152983158-b4a74a01c721?auto=format&fit=crop&w=400&q=80' },
  { id: 5, handle: '@elle.looks', src: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=400&q=80' },
  { id: 6, handle: '@tyler.core', src: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=400&q=80' },
];

export const UGCClub: React.FC = () => {
  return (
    <section className="w-full bg-[#F5F4F1] py-16 border-b border-[#111111]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-display font-extrabold text-[#111111] text-3xl sm:text-4xl italic tracking-tight">
            Join the Banzook club
          </h2>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 rounded-full border border-[#111111] flex items-center justify-center hover:bg-[#111111] hover:text-white transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 rounded-full border border-[#111111] flex items-center justify-center hover:bg-[#111111] hover:text-white transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Tiles */}
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-6 snap-x snap-mandatory">
          {UGC_POSTS.map((post) => (
            <div 
              key={post.id} 
              className="group relative flex-shrink-0 w-64 h-80 rounded-[16px] border border-[#111111] overflow-hidden snap-start cursor-pointer"
            >
              <img 
                src={post.src} 
                alt={post.handle} 
                className="w-full h-full object-cover transition-opacity group-hover:opacity-90"
              />
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2">
                <div className="bg-white/90 backdrop-blur-sm border border-[#111111] rounded-full px-3 py-1.5 shadow-sm">
                  <span className="font-mono-banzook text-[10px] font-bold text-[#111111] whitespace-nowrap">
                    {post.handle}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
