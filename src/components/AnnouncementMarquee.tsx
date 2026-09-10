import React from 'react';

interface AnnouncementMarqueeProps {
  onPromoClick?: (tag: string) => void;
}

export const AnnouncementMarquee: React.FC<AnnouncementMarqueeProps> = ({ onPromoClick }) => {
  const items = [
    'WORLDWIDE DISPATCH · TRACKED EXPRESS COURIER',
    'ALL SALES FINAL · NO RETURNS OR EXCHANGES',
    'NEW DROP EVERY MONTH',
    'DRESSED FOR THE WAY YOU MOVE',
    '100% GOTS ORGANIC COTTON & JAPANESE TWILL',
    'Speak in prints'
  ];

  return (
    <aside aria-label="Store Announcements" className="w-full bg-[#111111] text-[#F5F4F1] py-2 overflow-hidden border-b border-[#111111] text-[11px] font-mono-banzook tracking-wider uppercase select-none">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...Array(4)].map((_, repeatIdx) => (
          <div key={repeatIdx} className="flex items-center gap-8 px-4">
            {items.map((item, idx) => (
              <span
                key={idx}
                onClick={() => onPromoClick?.(item)}
                className="inline-flex items-center gap-8 cursor-pointer hover:text-[#A35843] transition-colors"
              >
                <span>{item}</span>
                <span className="text-neutral-500">•</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </aside>
  );
};
