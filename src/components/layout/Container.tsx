import type { HTMLAttributes, ReactNode } from 'react';

import { cn } from '@/lib/cn';

const sizes = {
  /** Full width of the main column. Matches the designed pages (tables span between gutters). */
  full: 'w-full',
  /**
   * Centered, readable width for future form/detail pages (e.g. "Tambah pengguna").
   * Not designed yet; revisit once those screens exist.
   */
  narrow: 'mx-auto w-full max-w-3xl',
} as const;

type ContainerProps = HTMLAttributes<HTMLElement> & {
  /** Width constraint. Defaults to `full`. */
  size?: keyof typeof sizes;
  /** Rendered element. Defaults to `div`. */
  as?: 'div' | 'section' | 'article';
  children: ReactNode;
  className?: string;
};

/**
 * Constrains and centers page content inside the main column. Adds no padding or background:
 * `AppLayout` already owns the page gutters, so padding here would double them.
 */
export function Container({
  size = 'full',
  as: Component = 'div',
  children,
  className,
  ...props
}: ContainerProps) {
  return (
    // min-w-0 keeps wide content (tables) scrollable inside instead of stretching the column.
    <Component className={cn('min-w-0', sizes[size], className)} {...props}>
      {children}
    </Component>
  );
}
