import type { HTMLAttributes } from 'react';

import { cn } from '@/lib/cn';

/** Background and text color per status. The dot inherits the text color via `bg-current`. */
const variants = {
  success: 'bg-brand-50 text-brand-800',
  warning: 'bg-warning-50 text-warning-800',
  danger: 'bg-danger-50 text-danger-800',
  neutral: 'bg-neutral-50 text-neutral-800',
} as const;

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: keyof typeof variants;
  /** Show the decorative leading dot. */
  dot?: boolean;
  className?: string;
};

/**
 * Status pill (e.g. "Aktif", "Nonaktif"). The text label carries the meaning;
 * color and dot are decorative, so status never relies on color alone.
 */
export function Badge({
  variant = 'neutral',
  dot = true,
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex h-6 items-center gap-1.5 rounded-full px-2.5 text-sm font-semibold whitespace-nowrap',
        variants[variant],
        className,
      )}
      {...props}
    >
      {dot && <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-current" />}
      {children}
    </span>
  );
}
