import type { ButtonHTMLAttributes, ReactNode, Ref } from 'react';
import { Loader2 } from 'lucide-react';

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
  ref?: Ref<HTMLButtonElement>;
  variant?: keyof typeof variants;
  /** Ignored for the `link` variant, which renders as inline text. */
  size?: keyof typeof sizes;
  fullWidth?: boolean;
  isLoading?: boolean;
  /** Replaces children while `isLoading` is true (e.g. "Memproses..."). */
  loadingText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
};

export function Button({
  ref,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  isLoading = false,
  loadingText,
  leftIcon,
  rightIcon,
  disabled,
  className,
  type = 'button',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || isLoading}
      aria-busy={isLoading || undefined}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors motion-reduce:transition-none',
        'focus-visible:ring-brand-700 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
        'disabled:pointer-events-none',
        variant !== 'link' && sizes[size],
        variants[variant],
        fullWidth && 'w-full',
        className,
      )}
      {...props}
    >
      {isLoading ? (
        <Loader2 aria-hidden="true" className="size-5 animate-spin motion-reduce:animate-none" />
      ) : (
        leftIcon
      )}
      {isLoading && loadingText ? loadingText : children}
      {!isLoading && rightIcon}
    </button>
  );
}
