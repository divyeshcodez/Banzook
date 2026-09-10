import React, { useState } from 'react';
import { User, Package, Award, Sparkles, X, Check, ArrowRight } from 'lucide-react';
import { PillButton } from './PillButton';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AccountModal: React.FC<AccountModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'orders' | 'rewards' | 'profile'>('orders');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs font-mono-banzook">
      <div className="relative w-full max-w-xl bg-[#F5F4F1] rounded-[20px] border border-[#111111] overflow-hidden shadow-2xl">
        
        {/* HEADER */}
        <div className="p-4 bg-white border-b border-[#111111] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-[#111111]" />
            <span className="font-bold text-xs uppercase tracking-widest text-[#111111]">
              MEMBER PORTAL · BANZOOK REGISTRY
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full border border-[#111111] hover:bg-[#F5F4F1] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4 text-[#111111]" />
          </button>
        </div>

        {/* TABS */}
        <div className="bg-[#EBE7DF] px-6 py-3 border-b border-neutral-300 flex items-center gap-4 text-xs font-bold">
          <button
            onClick={() => setActiveTab('orders')}
            className={`cursor-pointer transition-colors ${
              activeTab === 'orders' ? 'text-[#111111] underline underline-offset-4' : 'text-[#666660]'
            }`}
          >
            RECENT DISPATCHES
          </button>
          <button
            onClick={() => setActiveTab('rewards')}
            className={`cursor-pointer transition-colors ${
              activeTab === 'rewards' ? 'text-[#111111] underline underline-offset-4' : 'text-[#666660]'
            }`}
          >
            ARCHIVE REWARDS
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`cursor-pointer transition-colors ${
              activeTab === 'profile' ? 'text-[#111111] underline underline-offset-4' : 'text-[#666660]'
            }`}
          >
            SETTINGS
          </button>
        </div>

        {/* TAB CONTENTS */}
        <div className="p-6 sm:p-8 space-y-4">
          {activeTab === 'orders' && (
            <div className="space-y-3">
              <div className="bg-white p-4 rounded-2xl border border-[#111111] space-y-3">
                <div className="flex items-center justify-between text-xs border-b border-neutral-200 pb-2">
                  <div>
                    <span className="font-bold text-[#111111]">ORDER #BZ-88219</span>
                    <span className="text-[#666660] block text-[10px]">Placed Aug 14, 2026</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                    DELIVERED
                  </span>
                </div>

                <div className="flex items-center gap-3 text-xs text-[#111111]">
                  <div className="w-10 h-10 rounded-lg bg-[#F5F4F1] border border-neutral-300 flex items-center justify-center font-bold">
                    1x
                  </div>
                  <div>
                    <div className="font-bold">Heavyweight Boxy Tee (Raw Chalk, L)</div>
                    <div className="text-[11px] text-[#666660]">$58.00 · UPS Ground Tracking #1Z9999</div>
                  </div>
                </div>
              </div>

            </div>
          )}

          {activeTab === 'rewards' && (
            <div className="space-y-4">
              <div className="bg-white p-5 rounded-2xl border border-[#111111] text-center space-y-2">
                <Sparkles className="w-6 h-6 text-[#A35843] mx-auto" />
                <h4 className="font-display font-bold text-lg text-[#111111]">
                  180 Points Available
                </h4>
                <p className="text-xs text-[#666660] font-sans">
                  You are $70 away from your next $25 Archive Credit.
                </p>
                <div className="w-full h-2 bg-neutral-200 rounded-full overflow-hidden mt-3">
                  <div className="h-full bg-[#111111] w-[70%]" />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="bg-white p-5 rounded-2xl border border-[#111111] space-y-3 text-xs">
              <div>
                <span className="text-[#666660] uppercase text-[10px] block">MEMBER NAME:</span>
                <span className="font-bold text-[#111111]">Julian Mercer</span>
              </div>
              <div>
                <span className="text-[#666660] uppercase text-[10px] block">EMAIL:</span>
                <span className="font-bold text-[#111111]">julian.mercer@studio.com</span>
              </div>
              <div>
                <span className="text-[#666660] uppercase text-[10px] block">DEFAULT FIT PREFERENCE:</span>
                <span className="font-bold text-[#111111]">Tops: Size L (Boxy) · Bottoms: Size 32</span>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
