import React, { useState } from 'react';
import { CartItem } from '../types';
import { PillButton } from './PillButton';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Tag, Sparkles, Truck } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
  appliedPromoCode: string;
  onApplyPromoCode: (code: string) => boolean;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  appliedPromoCode,
  onApplyPromoCode
}) => {
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  if (!isOpen) return null;

  const rawSubtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountRate = appliedPromoCode === 'BANZOOK15' ? 0.15 : 0;
  const discountAmount = rawSubtotal * discountRate;
  const finalSubtotal = rawSubtotal - discountAmount;
  const shippingFee = items.length === 0 ? 0 : 99;
  const grandTotal = finalSubtotal + shippingFee;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    setPromoSuccess('');
    const clean = promoInput.trim().toUpperCase();
    if (onApplyPromoCode(clean)) {
      setPromoSuccess(`Code ${clean} applied (-15%)`);
      setPromoInput('');
    } else {
      setPromoError('Invalid code. Try BANZOOK15');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-mono-banzook">
      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-md bg-[#F5F4F1] border-l border-[#111111] shadow-2xl flex flex-col justify-between">
          
          {/* DRAWER HEADER */}
          <div className="p-5 bg-white border-b border-[#111111] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-lg text-[#111111] tracking-tight uppercase">
                SHOPPING BAG ({items.reduce((acc, i) => acc + i.quantity, 0)})
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full border border-[#111111] hover:bg-[#F5F4F1] transition-colors cursor-pointer"
              aria-label="Close cart"
            >
              <X className="w-4 h-4 text-[#111111]" />
            </button>
          </div>

          {/* ITEMS LIST (SCROLLABLE) */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <p className="font-display font-bold text-lg text-[#111111]">
                  Your bag is currently empty.
                </p>
                <p className="text-xs text-[#666660] max-w-xs mx-auto">
                  Explore our core essentials in 280–480 GSM organic cottons.
                </p>
                <PillButton
                  variant="black"
                  size="sm"
                  onClick={onClose}
                >
                  Start Shopping
                </PillButton>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-4 rounded-2xl border border-[#111111] flex gap-4 items-start"
                >
                  {/* IMAGE */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-18 h-22 object-cover rounded-xl border border-neutral-200 bg-[#F5F4F1]"
                  />

                  {/* INFO */}
                  <div className="flex-1 min-w-0 space-y-1.5">
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="font-display font-bold text-sm text-[#111111] truncate">
                        {item.name}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-neutral-400 hover:text-red-600 transition-colors p-0.5 cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-[11px] text-[#666660]">
                      Size: <strong className="text-[#111111]">{item.size}</strong> · Color: {item.color}
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      {/* Quantity buttons */}
                      <div className="flex items-center border border-[#111111] rounded-full bg-[#F5F4F1] px-2 py-0.5 gap-2">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="text-[#111111] hover:text-[#A35843] cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-[#111111] w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="text-[#111111] hover:text-[#A35843] cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-xs font-bold text-[#111111]">
                        ₹{Math.round(item.price * item.quantity).toLocaleString('en-IN')}
                      </div>
                    </div>

                  </div>
                </div>
              ))
            )}
          </div>

          {/* DRAWER FOOTER / CHECKOUT */}
          {items.length > 0 && (
            <div className="p-5 bg-white border-t border-[#111111] space-y-4">
              
              {/* PROMO CODE INPUT */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  placeholder="PROMO (e.g. BANZOOK15)"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  className="flex-1 px-3 py-1.5 rounded-full border border-neutral-300 text-[11px] uppercase focus:border-[#111111] focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-full border border-[#111111] bg-[#F5F4F1] text-[11px] font-bold text-[#111111] hover:bg-[#111111] hover:text-white transition-colors cursor-pointer"
                >
                  APPLY
                </button>
              </form>

              {promoSuccess && (
                <div className="text-[11px] text-emerald-700 font-bold">{promoSuccess}</div>
              )}
              {promoError && (
                <div className="text-[11px] text-red-600">{promoError}</div>
              )}

              {/* CALCULATION ROWS */}
              <div className="space-y-1 text-xs border-t border-neutral-200 pt-3">
                <div className="flex justify-between text-[#666660]">
                  <span>Subtotal</span>
                  <span>₹{Math.round(rawSubtotal).toLocaleString('en-IN')}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>Discount ({appliedPromoCode})</span>
                    <span>-₹{Math.round(discountAmount).toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#666660]">
                  <span>Standard Express Shipping</span>
                  <span>₹{shippingFee.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#111111] pt-2 border-t border-neutral-200">
                  <span>Estimated Total</span>
                  <span>₹{Math.round(grandTotal).toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* CHECKOUT BUTTON */}
              <button
                onClick={onCheckout}
                className="w-full py-3 rounded-full bg-[#111111] text-white hover:bg-neutral-800 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <span>CHECKOUT · ₹{Math.round(grandTotal).toLocaleString('en-IN')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <p className="text-[10px] text-center text-[#666660] flex items-center justify-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                All Sales Final. No Returns or Exchanges.
              </p>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
