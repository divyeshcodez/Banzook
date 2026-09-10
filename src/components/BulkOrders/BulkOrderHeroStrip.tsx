import React from 'react';

export const BulkOrderHeroStrip: React.FC = () => {
  const images = [
    { src: 'https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&w=800&q=80', shape: 'pill' },
    { src: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?auto=format&fit=crop&w=800&q=80', shape: 'rect' },
    { src: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80', shape: 'pill' },
    { src: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=800&q=80', shape: 'rect' },
    { src: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=800&q=80', shape: 'pill' },
  ];

  return (
    <div className="w-full border-b border-[#111111] overflow-hidden bg-[#F5F4F1] pt-8 pb-8">
      <div className="flex w-full gap-4 px-4 sm:px-6 lg:px-8 max-w-[2000px] mx-auto">
        {images.map((img, i) => (
          <div key={i} className="flex-1 min-w-0">
            <img 
              src={img.src} 
              alt="Bulk use case" 
              className={`w-full h-full object-cover aspect-[4/5] ${
                img.shape === 'pill' ? 'rounded-full' : 'rounded-[20px]'
              }`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
