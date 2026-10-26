import type { InputHTMLAttributes, ReactNode, Ref } from 'react';

import { cn } from '@/lib/cn';

const sizes = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-12 px-4 text-base',
} as const;

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & {
  ref?: Ref<HTMLInputElement>;
  size?: keyof typeof sizes;
  /** Shows the error style and sets `aria-invalid`. Pass `aria-describedby` for the error message. */
  invalid?: boolean;
  /**
   * Decorative element rendered inside the field on the left (e.g. a search icon).
   * It ignores pointer events so clicks reach the input; mark icons `aria-hidden`.
   */
  startAdornment?: ReactNode;
  /** Element rendered inside the field on the right (e.g. a "Tampilkan" password toggle). */
  endAdornment?: ReactNode;
  /** Class for the wrapper `div`; only used when an adornment is provided. */
  wrapperClassName?: string;
};

export function Input({
  ref,
  size = 'md',
  invalid = false,
  startAdornment,
  endAdornment,
  wrapperClassName,
  className,
  ...props
}: InputProps) {
  const hasStart = startAdornment != null;
  const hasEnd = endAdornment != null;

  const input = (
    <input
      ref={ref}
      aria-invalid={invalid || undefined}
      className={cn(
        'bg-surface text-ink placeholder:text-muted-2 w-full rounded-lg border transition-colors motion-reduce:transition-none',
        'focus:ring-focus focus:ring-2 focus:outline-none',
        'disabled:bg-canvas disabled:text-muted-2 read-only:bg-canvas disabled:cursor-not-allowed',
        invalid ? 'border-danger focus:border-danger' : 'border-line-input focus:border-brand-700',
        sizes[size],
        hasStart && 'pl-11',
        hasEnd && 'pr-28',
        className,
      )}
      {...props}
    />
  );

  if (!hasStart && !hasEnd) return input;

  return (
    <div className={cn('relative', wrapperClassName)}>
      {hasStart && (
        <div className="text-muted pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
          {startAdornment}
        </div>
      )}
      {input}
      {hasEnd && (
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">{endAdornment}</div>
      )}
    </div>
  );
}
