import React from 'react';
import { INSTAGRAM_POSTS } from '../data/storeData';
import { Instagram, ArrowUpRight } from 'lucide-react';

export const InstagramGrid: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#111111]">
        <div className="flex items-center gap-2">
          <Instagram className="w-4 h-4 text-[#111111]" />
          <span className="text-xs font-mono-banzook font-bold tracking-widest text-[#111111] uppercase">
            @BANZOOK.LA · IN CONVERSATION
          </span>
        </div>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs font-mono-banzook uppercase text-[#111111] hover:text-[#A35843] transition-colors"
        >
          <span>Follow Us</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* HORIZONTAL GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {INSTAGRAM_POSTS.map((post) => (
          <div
            key={post.id}
            className="group relative aspect-square bg-[#F5F4F1] rounded-[16px] border border-[#111111] overflow-hidden cursor-pointer"
          >
            <img
              src={post.image}
              alt={post.caption}
              className="w-full h-full object-cover object-center transition-opacity duration-200 group-hover:opacity-90"
            />
            
            <div className="absolute inset-0 bg-[#111111]/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3.5 text-white text-[11px] font-mono-banzook">
              <span className="font-bold">{post.handle}</span>
              <div>
                <p className="line-clamp-2 text-[10px] text-neutral-300 font-sans">
                  {post.caption}
                </p>
                <span className="text-[#F5F4F1] font-bold mt-1 block text-[9px] uppercase">
                  Tag: {post.productTagged}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};
