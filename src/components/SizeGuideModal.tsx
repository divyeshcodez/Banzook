import React, { useState } from 'react';
import { X, Ruler, Check } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose }) => {
  const [unit, setUnit] = useState<'in' | 'cm'>('in');
  const [activeTab, setActiveTab] = useState<'tops' | 'bottoms' | 'outerwear'>('tops');

  if (!isOpen) return null;

  const topsData = [
    { size: 'XS', chestIn: '38-40"', chestCm: '96-101 cm', lengthIn: '26.5"', lengthCm: '67 cm', shoulderIn: '19.5"', shoulderCm: '49 cm' },
    { size: 'S', chestIn: '40-42"', chestCm: '101-106 cm', lengthIn: '27.5"', lengthCm: '70 cm', shoulderIn: '20.5"', shoulderCm: '52 cm' },
    { size: 'M', chestIn: '42-44"', chestCm: '106-112 cm', lengthIn: '28.5"', lengthCm: '72 cm', shoulderIn: '21.5"', shoulderCm: '54 cm' },
    { size: 'L', chestIn: '44-47"', chestCm: '112-119 cm', lengthIn: '29.5"', lengthCm: '75 cm', shoulderIn: '22.5"', shoulderCm: '57 cm' },
    { size: 'XL', chestIn: '47-50"', chestCm: '119-127 cm', lengthIn: '30.5"', lengthCm: '77 cm', shoulderIn: '23.5"', shoulderCm: '60 cm' }
  ];

  const bottomsData = [
    { size: '28', waistIn: '28-29"', waistCm: '71-74 cm', inseamIn: '30"', inseamCm: '76 cm', openingIn: '18.5"', openingCm: '47 cm' },
    { size: '30', waistIn: '30-31"', waistCm: '76-79 cm', inseamIn: '31"', inseamCm: '79 cm', openingIn: '19.0"', openingCm: '48 cm' },
    { size: '32', waistIn: '32-33"', waistCm: '81-84 cm', inseamIn: '32"', inseamCm: '81 cm', openingIn: '19.5"', openingCm: '49 cm' },
    { size: '34', waistIn: '34-35"', waistCm: '86-89 cm', inseamIn: '32"', inseamCm: '81 cm', openingIn: '20.0"', openingCm: '51 cm' },
    { size: '36', waistIn: '36-37"', waistCm: '91-94 cm', inseamIn: '32"', inseamCm: '81 cm', openingIn: '20.5"', openingCm: '52 cm' }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs font-mono-banzook">
      <div className="relative w-full max-w-2xl bg-[#F5F4F1] rounded-[20px] border border-[#111111] overflow-hidden shadow-2xl">
        
        {/* HEADER */}
        <div className="p-4 bg-white border-b border-[#111111] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Ruler className="w-4 h-4 text-[#A35843]" />
            <span className="font-bold text-xs uppercase tracking-widest text-[#111111]">
              UNISEX SIZE &amp; MEASUREMENT MATRIX
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full border border-[#111111] hover:bg-[#F5F4F1] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4 text-[#111111]" />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          
          {/* TAB & UNIT SWITCHER */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-neutral-300 pb-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('tops')}
                className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase transition-colors cursor-pointer border ${
                  activeTab === 'tops'
                    ? 'bg-[#111111] text-white border-[#111111]'
                    : 'bg-white text-[#111111] border-neutral-300'
                }`}
              >
                TOPS &amp; HOODIES
              </button>
              <button
                onClick={() => setActiveTab('bottoms')}
                className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase transition-colors cursor-pointer border ${
                  activeTab === 'bottoms'
                    ? 'bg-[#111111] text-white border-[#111111]'
                    : 'bg-white text-[#111111] border-neutral-300'
                }`}
              >
                BOTTOMS &amp; TWILL
              </button>
            </div>

            <div className="flex items-center bg-white rounded-full border border-[#111111] p-0.5 text-xs">
              <button
                onClick={() => setUnit('in')}
                className={`px-3 py-1 rounded-full cursor-pointer transition-colors ${
                  unit === 'in' ? 'bg-[#111111] text-white' : 'text-[#666660]'
                }`}
              >
                INCHES
              </button>
              <button
                onClick={() => setUnit('cm')}
                className={`px-3 py-1 rounded-full cursor-pointer transition-colors ${
                  unit === 'cm' ? 'bg-[#111111] text-white' : 'text-[#666660]'
                }`}
              >
                CENTIMETERS
              </button>
            </div>
          </div>

          {/* TABLE */}
          <div className="bg-white rounded-2xl border border-[#111111] overflow-hidden">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#EBE7DF] border-b border-[#111111] text-[11px] font-bold text-[#111111]">
                  <th className="p-3">LABEL</th>
                  <th className="p-3">{activeTab === 'tops' ? 'CHEST (CIRCUMFERENCE)' : 'NATURAL WAIST'}</th>
                  <th className="p-3">{activeTab === 'tops' ? 'BODY LENGTH' : 'INSEAM'}</th>
                  <th className="p-3">{activeTab === 'tops' ? 'DROP SHOULDER' : 'LEG OPENING'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {activeTab === 'tops'
                  ? topsData.map((row) => (
                      <tr key={row.size} className="hover:bg-[#F5F4F1]">
                        <td className="p-3 font-bold text-[#111111]">{row.size}</td>
                        <td className="p-3 text-[#666660]">{unit === 'in' ? row.chestIn : row.chestCm}</td>
                        <td className="p-3 text-[#666660]">{unit === 'in' ? row.lengthIn : row.lengthCm}</td>
                        <td className="p-3 text-[#666660]">{unit === 'in' ? row.shoulderIn : row.shoulderCm}</td>
                      </tr>
                    ))
                  : bottomsData.map((row) => (
                      <tr key={row.size} className="hover:bg-[#F5F4F1]">
                        <td className="p-3 font-bold text-[#111111]">{row.size}</td>
                        <td className="p-3 text-[#666660]">{unit === 'in' ? row.waistIn : row.waistCm}</td>
                        <td className="p-3 text-[#666660]">{unit === 'in' ? row.inseamIn : row.inseamCm}</td>
                        <td className="p-3 text-[#666660]">{unit === 'in' ? row.openingIn : row.openingCm}</td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>

          {/* FIT ADVICE */}
          <div className="bg-[#EBE7DF] p-4 rounded-xl text-xs space-y-1">
            <div className="font-bold text-[#111111] uppercase">HOW TO CHOOSE YOUR FIT:</div>
            <p className="text-[#666660] font-sans">
              Banzook garments are patterned with a relaxed, architectural drop. We recommend taking your standard size for the intended relaxed fit, or sizing down one size for a more tailored, traditional silhouette. All cotton pieces are pre-shrunk in Los Angeles.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
