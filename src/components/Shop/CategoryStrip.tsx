import React from 'react';

const CATEGORY_IMAGES = [
  { id: 1, src: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=600&q=80', shape: 'pill' },
  { id: 2, src: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80', shape: 'rounded-rect' },
  { id: 3, src: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?auto=format&fit=crop&w=600&q=80', shape: 'oval' },
  { id: 4, src: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80', shape: 'rounded-rect' },
  { id: 5, src: 'https://images.unsplash.com/photo-1434389670869-c449c25225d3?auto=format&fit=crop&w=600&q=80', shape: 'pill' },
];

export const CategoryStrip: React.FC = () => {
  return (
    <div className="w-full border-b border-[#111111] bg-[#F5F4F1] px-4 py-8">
      <div className="max-w-screen-2xl mx-auto flex items-center justify-between gap-4 overflow-x-auto no-scrollbar">
        {CATEGORY_IMAGES.map((img) => {
          let borderRadiusClass = 'rounded-[20px]';
          if (img.shape === 'pill') borderRadiusClass = 'rounded-full';
          if (img.shape === 'oval') borderRadiusClass = 'rounded-[100%]';

          return (
            <div 
              key={img.id} 
              className={`flex-shrink-0 w-48 h-64 sm:w-56 sm:h-72 md:w-64 md:h-80 overflow-hidden border border-[#111111] ${borderRadiusClass}`}
            >
              <img 
                src={img.src} 
                alt="" 
                className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-300"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
