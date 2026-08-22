import React, { useState } from 'react';
import { PillButton } from './PillButton';
import { Mail, Check, Copy, Sparkles, ArrowRight } from 'lucide-react';

interface EmailSignupProps {
  onCouponClaimed?: (code: string) => void;
}

export const EmailSignup: React.FC<EmailSignupProps> = ({ onCouponClaimed }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubmitted(true);
    onCouponClaimed?.('BANZOOK15');
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText('BANZOOK15');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="bg-white rounded-[20px] border border-[#111111] p-8 sm:p-14 text-center max-w-3xl mx-auto space-y-6">
        
        <div className="space-y-2">
          <span className="text-[11px] font-mono-banzook text-[#A35843] uppercase tracking-widest font-semibold">
            PRIVATE ACCESS &amp; ARCHIVE NOTES
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#111111] tracking-tight">
            Get 15% off your first order.
          </h2>
          <p className="text-xs sm:text-sm text-[#666660] max-w-md mx-auto leading-relaxed">
            Join the Banzook registry for early access to limited textile drops, size restock alerts, and 15% off your foundational order.
          </p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-3">
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ENTER YOUR EMAIL ADDRESS..."
                className="w-full px-4 py-3 rounded-full border border-[#111111] bg-[#F5F4F1] text-xs font-mono-banzook text-[#111111] focus:bg-white focus:outline-none placeholder:text-neutral-400"
              />
              <PillButton
                type="submit"
                variant="black"
                size="md"
                className="w-full sm:w-auto shrink-0"
              >
                Claim 15%
              </PillButton>
            </div>
            <p className="text-[10px] font-mono-banzook text-[#666660]">
              Zero spam. Unsubscribe anytime in one click.
            </p>
          </form>
        ) : (
          <div className="bg-[#F5F4F1] p-5 rounded-2xl border border-[#111111] max-w-md mx-auto space-y-3">
            <div className="flex items-center justify-center gap-1.5 text-xs font-mono-banzook font-bold text-[#111111]">
              <Check className="w-4 h-4 text-emerald-700" />
              <span>15% DISCOUNT CODE ACTIVATED!</span>
            </div>
            
            <div className="flex items-center justify-between bg-white px-4 py-2.5 rounded-xl border border-neutral-300 font-mono-banzook text-xs">
              <span className="font-bold tracking-widest text-[#111111]">BANZOOK15</span>
              <button
                onClick={handleCopyCode}
                className="inline-flex items-center gap-1 text-[11px] font-bold text-[#A35843] hover:text-[#111111] cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'COPIED' : 'COPY'}</span>
              </button>
            </div>
            <p className="text-[11px] text-[#666660] font-mono-banzook">
              Automatically applied to your shopping bag.
            </p>
          </div>
        )}

      </div>
    </section>
  );
};
