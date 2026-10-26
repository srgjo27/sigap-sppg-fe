// TEMPLATE: simplified variant pattern based on src/components/ui/Button.tsx. Rename for the new component.
import type { ButtonHTMLAttributes, Ref } from 'react';

import { cn } from '@/lib/cn';

const variants = {
  primary: 'bg-brand-700 text-white hover:bg-brand-900 disabled:bg-disabled',
  secondary: 'bg-surface text-ink border border-line-input hover:bg-canvas disabled:text-muted-2',
  ghost: 'text-brand-700 hover:bg-brand-50 disabled:text-muted-2',
  link: 'h-8 px-1 text-sm font-semibold text-brand-700 hover:text-brand-900 disabled:text-muted-2',
  danger: 'bg-danger text-white hover:opacity-90 disabled:bg-disabled',
} as const;

const sizes = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-12 px-5 text-base',
  lg: 'h-14 px-6 text-lg',
} as const;

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  // React 19: ref is a regular prop, no forwardRef.
  ref?: Ref<HTMLButtonElement>;
  variant?: keyof typeof variants;
  /** Ignored for the `link` variant, which renders as inline text. */
  size?: keyof typeof sizes;
};

export function Button({
  ref,
  variant = 'primary',
  size = 'md',
  className,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      ref={ref}
      type={type}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors motion-reduce:transition-none',
        'focus-visible:ring-brand-700 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
        'disabled:pointer-events-none',
        variant !== 'link' && sizes[size],
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
