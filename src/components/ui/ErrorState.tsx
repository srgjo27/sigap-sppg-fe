import type { HTMLAttributes, ReactNode } from 'react';
import { CircleAlert } from 'lucide-react';

import { cn } from '@/lib/cn';

import { Button } from './Button';

type ErrorStateProps = Omit<HTMLAttributes<HTMLDivElement>, 'title'> & {
  /** Short headline, e.g. "Gagal memuat pengguna". */
  title: ReactNode;
  /** Error detail, usually `error.message` (already localized by the axios interceptor). */
  message?: ReactNode;
  /** Called by the retry button, usually the query's `refetch`. The button is hidden without it. */
  onRetry?: () => void;
  /** Label of the retry button, e.g. "Coba lagi". */
  retryLabel?: string;
  /** Disables the retry button, e.g. while refetching. */
  isRetrying?: boolean;
  /** Element used for the title. Use `h2`/`h3` only for standalone, page-level usage. */
  titleAs?: 'p' | 'h2' | 'h3';
  className?: string;
};

/**
 * Flat "failed to load" message rendered inside an existing container (e.g. a table card).
 * Announced immediately via `role="alert"`.
 */
export function ErrorState({
  title,
  message,
  onRetry,
  retryLabel,
  isRetrying = false,
  titleAs: Title = 'p',
  className,
  ...props
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className={cn('flex flex-col items-center px-6 py-12 text-center', className)}
      {...props}
    >
      <div className="bg-danger-50 flex size-12 items-center justify-center rounded-full">
        <CircleAlert aria-hidden="true" className="text-danger size-6" />
      </div>
      <Title className="text-ink mt-4 text-base font-semibold">{title}</Title>
      {message && <p className="text-muted mt-1 max-w-sm text-sm leading-relaxed">{message}</p>}
      {onRetry && retryLabel && (
        <Button
          variant="secondary"
          size="sm"
          onClick={onRetry}
          disabled={isRetrying}
          className="mt-6"
        >
          {retryLabel}
        </Button>
      )}
    </div>
  );
}
