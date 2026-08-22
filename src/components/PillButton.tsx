import React from 'react';
import { ArrowRight } from 'lucide-react';

interface PillButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'black' | 'outline' | 'clay' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  withArrow?: boolean;
  children: React.ReactNode;
}

export const PillButton: React.FC<PillButtonProps> = ({
  variant = 'black',
  size = 'md',
  withArrow = false,
  children,
  className = '',
  ...props
}) => {
  const sizeStyles = {
    sm: 'px-4 py-1.5 text-xs',
    md: 'px-6 py-2.5 text-xs',
    lg: 'px-8 py-3.5 text-sm'
  };

  const variantStyles = {
    black: 'bg-[#111111] text-white border border-[#111111] hover:bg-neutral-800',
    outline: 'bg-white text-[#111111] border border-[#111111] hover:bg-[#111111] hover:text-white',
    clay: 'bg-[#A35843] text-white border border-[#A35843] hover:bg-[#8D4A37]',
    ghost: 'bg-transparent text-[#111111] hover:text-[#A35843]'
  };

  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-full font-mono-banzook font-medium tracking-wide uppercase transition-colors duration-150 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      <span>{children}</span>
      {withArrow && <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />}
    </button>
  );
};
