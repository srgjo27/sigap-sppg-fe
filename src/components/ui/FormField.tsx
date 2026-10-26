import { useId, type ReactNode } from 'react';

import { cn } from '@/lib/cn';

import { Label } from './Label';

/** Props FormField hands to its control (e.g. `Input`, `PasswordInput`). Spread them onto the control. */
export type FormFieldControlProps = {
  id: string;
  invalid: boolean;
  disabled?: boolean;
  'aria-describedby'?: string;
};

type FormFieldProps = {
  label: ReactNode;
  /** Id for the control; falls back to a generated id from `useId()`. */
  id?: string;
  /** When set, the control is marked invalid and this message is rendered below it. */
  error?: string;
  /** Helper text below the control; hidden while `error` is shown. */
  hint?: string;
  /** Appends "(opsional)" to the label. */
  optional?: boolean;
  /** Disables the label style and is forwarded to the control. */
  disabled?: boolean;
  /** Class for the wrapper `div`. Vertical spacing between fields belongs to the parent (e.g. `space-y-5`). */
  className?: string;
  children: (control: FormFieldControlProps) => ReactNode;
};

export function FormField({
  label,
  id,
  error,
  hint,
  optional = false,
  disabled,
  className,
  children,
}: FormFieldProps) {
  const generatedId = useId();
  const controlId = id ?? generatedId;
  const errorId = `${controlId}-error`;
  const hintId = `${controlId}-hint`;

  const hasError = Boolean(error);
  const showHint = !hasError && Boolean(hint);
  const describedBy = hasError ? errorId : showHint ? hintId : undefined;

  return (
    <div className={cn(className)}>
      <Label htmlFor={controlId} optional={optional} disabled={disabled}>
        {label}
      </Label>
      {children({
        id: controlId,
        invalid: hasError,
        disabled,
        'aria-describedby': describedBy,
      })}
      {hasError && (
        <p id={errorId} className="text-danger mt-1 text-sm">
          {error}
        </p>
      )}
      {showHint && (
        <p id={hintId} className="text-muted mt-1 text-sm">
          {hint}
        </p>
      )}
    </div>
  );
}
