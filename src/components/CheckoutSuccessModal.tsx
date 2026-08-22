import React from 'react';
import { Check, Package, RotateCcw, ArrowRight, ShieldCheck } from 'lucide-react';
import { PillButton } from './PillButton';

interface CheckoutSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderNumber: string;
}

export const CheckoutSuccessModal: React.FC<CheckoutSuccessModalProps> = ({
  isOpen,
  onClose,
  orderNumber
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs font-mono-banzook">
      <div className="relative w-full max-w-md bg-[#F5F4F1] rounded-[20px] border border-[#111111] overflow-hidden shadow-2xl p-8 text-center space-y-6">
        
        <div className="w-14 h-14 rounded-full bg-emerald-700 text-white flex items-center justify-center mx-auto">
          <Check className="w-8 h-8 stroke-[2.5]" />
        </div>

        <div className="space-y-2">
          <span className="text-[11px] font-bold text-[#A35843] uppercase tracking-widest">
            ORDER CONFIRMED
          </span>
          <h3 className="font-display font-bold text-2xl text-[#111111] tracking-tight">
            Thank you for your order.
          </h3>
          <p className="text-xs text-[#666660] font-sans">
            We are preparing your garments at our Los Angeles facility. Confirmation and tracking details have been sent to your email.
          </p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#111111] space-y-2 text-xs text-left">
          <div className="flex justify-between">
            <span className="text-[#666660]">ORDER IDENTIFIER:</span>
            <span className="font-bold text-[#111111]">{orderNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#666660]">ESTIMATED DISPATCH:</span>
            <span className="font-bold text-[#111111]">1–2 Business Days</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#666660]">CARRIER:</span>
            <span className="font-bold text-[#111111]">UPS Carbon Neutral</span>
          </div>
        </div>

        <div className="bg-[#EBE7DF] p-3 rounded-xl text-[11px] text-[#666660] flex items-center justify-center gap-1.5">
          <RotateCcw className="w-3.5 h-3.5 text-[#111111]" />
          <span>30-Day Free In-Home Trial &amp; Free Exchanges Included</span>
        </div>

        <PillButton
          variant="black"
          size="md"
          onClick={onClose}
          className="w-full"
        >
          Continue Browsing
        </PillButton>

      </div>
    </div>
  );
};
