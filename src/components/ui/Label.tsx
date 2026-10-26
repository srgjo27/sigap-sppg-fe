import type { LabelHTMLAttributes, Ref } from 'react';

import { cn } from '@/lib/cn';

type LabelProps = Omit<LabelHTMLAttributes<HTMLLabelElement>, 'htmlFor'> & {
  ref?: Ref<HTMLLabelElement>;
  /** Required so every label is tied to a form control. */
  htmlFor: string;
  /** Uses the muted "locked" text color; pair with a disabled control. */
  disabled?: boolean;
  /** Appends a muted "(opsional)" suffix after the label text. */
  optional?: boolean;
};

export function Label({
  ref,
  htmlFor,
  disabled = false,
  optional = false,
  className,
  children,
  ...props
}: LabelProps) {
  return (
    <label
      ref={ref}
      htmlFor={htmlFor}
      className={cn(
        'mb-2 block text-sm font-medium',
        disabled ? 'text-muted-2' : 'text-ink',
        className,
      )}
      {...props}
    >
      {children}
      {optional && <span className="text-muted font-normal"> (opsional)</span>}
    </label>
  );
}
