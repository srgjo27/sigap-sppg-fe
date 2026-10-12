// TEMPLATE: pola komponen dengan varian (salinan src/components/ui/Button.tsx). Ganti nama sesuai komponen baru.
import type { ButtonHTMLAttributes } from 'react';

import { cn } from '@/lib/cn';

const variants = {
  primary: 'bg-brand-700 text-white hover:bg-brand-900',
  secondary: 'bg-surface text-ink border border-line hover:bg-canvas',
  ghost: 'text-brand-700 hover:bg-brand-50',
  danger: 'bg-danger text-white hover:opacity-90',
} as const;

const sizes = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-11 px-5',
  lg: 'h-12 px-6 text-lg',
} as const;

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
};

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg font-medium transition-colors',
        'focus-visible:ring-brand-800 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
        'disabled:pointer-events-none disabled:opacity-50 motion-reduce:transition-none',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}
