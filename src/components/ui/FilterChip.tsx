import type { ButtonHTMLAttributes } from 'react';

import { cn } from '@/lib/cn';
import { formatNumber } from '@/utils/format';

type FilterChipProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'aria-pressed'> & {
  /** Whether the filter is active; exposed as `aria-pressed`. */
  selected: boolean;
  /** Optional item count shown after the label, e.g. "Semua 9". */
  count?: number;
  className?: string;
};

/** Toggle pill for list filters. Group several chips in a `role="group"` with an `aria-label`. */
export function FilterChip({ selected, count, className, children, ...props }: FilterChipProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      className={cn(
        'inline-flex h-9 items-center gap-1.5 rounded-full px-4 text-sm font-semibold whitespace-nowrap transition-colors motion-reduce:transition-none',
        'focus-visible:ring-brand-700 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
        'disabled:text-muted-2 disabled:pointer-events-none',
        selected
          ? 'bg-ink text-white'
          : 'border-line-input bg-surface text-ink hover:bg-canvas border',
        className,
      )}
      {...props}
    >
      {children}
      {count !== undefined && <span>{formatNumber(count)}</span>}
    </button>
  );
}
