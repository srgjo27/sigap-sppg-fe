import type { HTMLAttributes } from 'react';

import { cn } from '@/lib/cn';
import { getInitials } from '@/utils/string';

/** Class sets per surface: `light` = table on `surface`, `dark` = sidebar user card on `side-bg`. */
const tones = {
  light: 'bg-avatar text-ink-2',
  dark: 'bg-side-active text-white',
} as const;

type AvatarProps = HTMLAttributes<HTMLSpanElement> & {
  /** Full name; the initials are derived from it. */
  name: string;
  /** Surface the avatar is placed on. */
  tone?: keyof typeof tones;
  /**
   * Hidden from assistive tech by default because the full name is shown next to it.
   * Set to false when the avatar stands alone so it is announced as `name`.
   */
  decorative?: boolean;
  className?: string;
};

/** Initials circle (36px), e.g. in the users table and the sidebar user card. */
export function Avatar({
  name,
  tone = 'light',
  decorative = true,
  className,
  ...props
}: AvatarProps) {
  const a11yProps = decorative
    ? { 'aria-hidden': true as const }
    : { role: 'img', 'aria-label': name };

  return (
    <span
      className={cn(
        'inline-flex size-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold select-none',
        tones[tone],
        className,
      )}
      {...a11yProps}
      {...props}
    >
      {getInitials(name)}
    </span>
  );
}
