import type { HTMLAttributes, ReactNode } from 'react';

import { cn } from '@/lib/cn';

type EmptyStateProps = Omit<HTMLAttributes<HTMLDivElement>, 'title'> & {
  /** Short headline, e.g. "Pengguna tidak ditemukan". */
  title: ReactNode;
  /** Optional supporting text below the title. */
  description?: ReactNode;
  /**
   * Optional lucide icon element, already sized by the consumer,
   * e.g. `<Users className="size-6" aria-hidden="true" />`. Color is inherited (`text-muted`).
   */
  icon?: ReactNode;
  /** Optional CTA, e.g. a `Button` (routing stays in the consumer). */
  action?: ReactNode;
  /** Element used for the title. Use `h2`/`h3` only for standalone, page-level usage. */
  titleAs?: 'p' | 'h2' | 'h3';
  className?: string;
};

/**
 * Flat "no data" message rendered inside an existing container (e.g. a table card),
 * so it draws no card or border of its own. Static content without a role; if it
 * appears after a filter change, wrap the results area in a polite live region
 * (`aria-live="polite"`) in the consumer.
 */
export function EmptyState({
  title,
  description,
  icon,
  action,
  titleAs: Title = 'p',
  className,
  ...props
}: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center px-6 py-12 text-center', className)} {...props}>
      {icon && (
        <div
          aria-hidden="true"
          className="bg-canvas text-muted flex size-12 items-center justify-center rounded-full"
        >
          {icon}
        </div>
      )}
      <Title className={cn('text-ink text-base font-semibold', icon && 'mt-4')}>{title}</Title>
      {description && (
        <p className="text-muted mt-1 max-w-sm text-sm leading-relaxed">{description}</p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
