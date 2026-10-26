import { Check } from 'lucide-react';

import { cn } from '@/lib/cn';

/** Class sets per surface the logo sits on: `dark` = `side-bg`, `light` = `canvas`/`surface`. */
const tones = {
  dark: {
    mark: 'bg-brand-500',
    name: 'text-white',
    tagline: 'text-side-muted',
  },
  light: {
    mark: 'bg-brand-700',
    name: 'text-ink',
    tagline: 'text-muted',
  },
} as const;

/** Measured: `md` = login screens (40px mark), `sm` = app sidebar (32px mark). */
const sizes = {
  sm: { mark: 'size-8', icon: 'size-5', name: 'text-base', tagline: 'text-xs' },
  md: { mark: 'size-10', icon: 'size-6', name: 'text-lg', tagline: 'text-sm' },
} as const;

type LogoProps = {
  /** Surface the logo is placed on. */
  tone: keyof typeof tones;
  /** `md` (default) for auth screens, `sm` for the app sidebar. */
  size?: keyof typeof sizes;
  /** App name, e.g. "SIGAP-SPPG". Also used as the accessible label when `showText` is false. */
  name: string;
  /** Secondary line, e.g. the app tagline (login) or the kitchen name (sidebar). */
  tagline?: string;
  /** When false, renders only the mark (labelled with `name`). */
  showText?: boolean;
  className?: string;
};

export function Logo({ tone, size = 'md', name, tagline, showText = true, className }: LogoProps) {
  const toneClasses = tones[tone];
  const sizeClasses = sizes[size];

  const mark = (
    <span
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-lg text-white',
        sizeClasses.mark,
        toneClasses.mark,
      )}
    >
      <Check aria-hidden="true" className={sizeClasses.icon} strokeWidth={3} />
    </span>
  );

  if (!showText) {
    return (
      <div role="img" aria-label={name} className={cn('inline-flex', className)}>
        {mark}
      </div>
    );
  }

  return (
    <div className={cn('flex items-center gap-3', className)}>
      {mark}
      <div className="min-w-0">
        <p className={cn('leading-tight font-bold', sizeClasses.name, toneClasses.name)}>{name}</p>
        {tagline && <p className={cn(sizeClasses.tagline, toneClasses.tagline)}>{tagline}</p>}
      </div>
    </div>
  );
}
