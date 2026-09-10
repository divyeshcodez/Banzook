import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onNavigateCategory: (cat: string) => void;
  onOpenSizeGuide: () => void;
  onOpenQuiz: () => void;
  onNavigate?: (route: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ 
  onNavigateCategory, 
  onOpenSizeGuide,
  onOpenQuiz,
  onNavigate
}) => {
  return (
    <footer className="w-full bg-[#F5F4F1] border-t border-[#111111] py-16">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          
          {/* SHOP COLUMN */}
          <div className="flex flex-col gap-4">
            <h4 className="font-mono-banzook font-bold text-xs uppercase tracking-widest text-[#111111]">SHOP</h4>
            <div className="flex flex-col gap-2 font-mono-banzook text-[11px] uppercase text-[#666660]">
              <button onClick={() => onNavigate?.('bulk-orders')} className="text-left hover:text-[#1D3557] transition-colors">BUILD UR OWN BUNDLE</button>
              <button onClick={() => onNavigate?.('bulk-orders')} className="text-left hover:text-[#1D3557] transition-colors">BULK ORDERS</button>
              <button onClick={() => { onNavigate?.('home'); onNavigateCategory('new'); }} className="text-left hover:text-[#1D3557] transition-colors">NEW ARRIVALS</button>
              <button onClick={() => { onNavigate?.('home'); onNavigateCategory('sale'); }} className="text-left hover:text-[#1D3557] transition-colors">SALE</button>
            </div>
          </div>

          {/* HELP COLUMN */}
          <div className="flex flex-col gap-4">
            <h4 className="font-mono-banzook font-bold text-xs uppercase tracking-widest text-[#111111]">HELP</h4>
            <div className="flex flex-col gap-2 font-mono-banzook text-[11px] uppercase text-[#666660]">
              <button onClick={() => onNavigate?.('faq')} className="text-left hover:text-[#1D3557] transition-colors">FAQ</button>
              <button onClick={() => onNavigate?.('returns')} className="text-left hover:text-[#1D3557] transition-colors">RETURNS</button>
              <button onClick={() => onNavigate?.('shipping')} className="text-left hover:text-[#1D3557] transition-colors">SHIPPING</button>
              <button onClick={onOpenSizeGuide} className="text-left hover:text-[#1D3557] transition-colors">SIZE GUIDE</button>
            </div>
          </div>

          {/* LEARN COLUMN */}
          <div className="flex flex-col gap-4">
            <h4 className="font-mono-banzook font-bold text-xs uppercase tracking-widest text-[#111111]">LEARN</h4>
            <div className="flex flex-col gap-2 font-mono-banzook text-[11px] uppercase text-[#666660]">
              <button onClick={() => onNavigate?.('about')} className="text-left hover:text-[#1D3557] transition-colors">ABOUT</button>
              <button onClick={onOpenQuiz} className="text-left hover:text-[#1D3557] transition-colors">FIT GUIDE</button>
              <button onClick={() => onNavigate?.('policies')} className="text-left hover:text-[#1D3557] transition-colors">TRY BEFORE YOU BUY</button>
              <button onClick={() => onNavigate?.('care-guide')} className="text-left hover:text-[#1D3557] transition-colors">CARE GUIDE</button>
            </div>
          </div>

          {/* CONNECT COLUMN */}
          <div className="flex flex-col gap-4">
            <h4 className="font-mono-banzook font-bold text-xs uppercase tracking-widest text-[#111111]">CONNECT</h4>
            <div className="flex flex-col gap-2 font-mono-banzook text-[11px] uppercase text-[#666660]">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-[#1D3557] transition-colors">
                <span>INSTAGRAM</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-[#1D3557] transition-colors">
                <span>FACEBOOK</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-[#1D3557] transition-colors">
                <span>TIKTOK</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </div>

        </div>

        {/* BOTTOM BRANDING */}
        <div className="pt-8 border-t border-[#111111] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col items-center md:items-start cursor-pointer" onClick={() => onNavigate?.('home')}>
            <span className="font-display font-extrabold text-3xl tracking-[-0.04em] text-[#111111] leading-none uppercase select-none">
              BANZOOK
            </span>
          </div>
          <p className="font-mono-banzook text-[10px] text-[#666660] uppercase">
            © {new Date().getFullYear()} BANZOOK LA. ALL RIGHTS RESERVED.
          </p>
        </div>

      </div>
    </footer>
  );
};
