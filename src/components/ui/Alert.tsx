import type { HTMLAttributes, ReactNode } from 'react';
import { CircleAlert, CircleCheck, Info } from 'lucide-react';

import { cn } from '@/lib/cn';

/** Class sets, icon, and default ARIA role per message type. */
const variants = {
  danger: {
    container: 'border-danger bg-surface text-ink',
    icon: 'text-danger',
    title: 'text-danger',
    Icon: CircleAlert,
    role: 'alert',
  },
  success: {
    container: 'border-brand-500 bg-brand-50 text-ink',
    icon: 'text-brand-700',
    title: 'text-brand-800',
    Icon: CircleCheck,
    role: 'status',
  },
  info: {
    container: 'border-line-input bg-surface text-ink',
    icon: 'text-muted',
    title: 'text-ink',
    Icon: Info,
    role: 'status',
  },
} as const;

type AlertProps = Omit<HTMLAttributes<HTMLDivElement>, 'title'> & {
  variant?: keyof typeof variants;
  /** Optional bold heading above the description. */
  title?: ReactNode;
  className?: string;
};

/**
 * Inline, form-level message (e.g. failed login). `danger` uses `role="alert"`,
 * `success`/`info` use `role="status"`; pass `role` to override.
 */
export function Alert({
  variant = 'danger',
  title,
  className,
  children,
  role,
  ...props
}: AlertProps) {
  const { container, icon, title: titleClass, Icon, role: defaultRole } = variants[variant];

  return (
    <div
      role={role ?? defaultRole}
      className={cn('flex gap-3 rounded-lg border p-4 text-sm', container, className)}
      {...props}
    >
      <Icon aria-hidden="true" className={cn('mt-0.5 size-5 shrink-0', icon)} />
      <div className="min-w-0 flex-1">
        {title && <p className={cn('font-semibold', titleClass)}>{title}</p>}
        {children && <div className={cn('text-ink-2 text-sm', title && 'mt-1')}>{children}</div>}
      </div>
    </div>
  );
}
