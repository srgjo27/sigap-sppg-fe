import type { HTMLAttributes } from 'react';

import { cn } from '@/lib/cn';

/** Line color per surface the divider sits on: `light` = `canvas`/`surface`, `dark` = `side-bg`. */
const tones = {
  light: 'bg-line-soft-2',
  dark: 'bg-side-active',
} as const;

type DividerProps = HTMLAttributes<HTMLHRElement> & {
  /** Surface the divider is placed on. */
  tone?: keyof typeof tones;
  className?: string;
};

/** Horizontal separator. Spacing around it is set by the consumer via `className` (e.g. `my-6`). */
export function Divider({ tone = 'light', className, ...props }: DividerProps) {
  return <hr className={cn('h-0.5 w-full border-0', tones[tone], className)} {...props} />;
}
