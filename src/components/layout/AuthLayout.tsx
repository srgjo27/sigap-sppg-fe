import type { HTMLAttributes, ReactNode } from 'react';

import { cn } from '@/lib/cn';

type AuthLayoutProps = HTMLAttributes<HTMLDivElement> & {
  /**
   * Desktop left panel content (logo, tagline, steps, note). Rendered only on `lg` and up.
   * The slot sits in a full-height flex column; give its root `flex flex-1 flex-col justify-between`
   * so the logo stays at the top, the tagline + steps are vertically centered and the note sits
   * at the bottom.
   */
  aside: ReactNode;
  /** Accessible name of the left panel landmark. */
  asideLabel?: string;
  /** Mobile-only top content (e.g. light `Logo`). Hidden on `lg` and up. */
  header: ReactNode;
  /** Form block (H1, description, form). The layout itself never renders an `h1`. */
  children: ReactNode;
  /**
   * Content below the form (e.g. "Lupa password?" with a `Divider`). Pinned to the bottom of the
   * viewport on mobile; follows the form directly on desktop, so it owns its top spacing.
   */
  footer?: ReactNode;
  className?: string;
};

/** Login/auth shell: single column on mobile, 50/50 split with a dark info panel on desktop. */
export function AuthLayout({
  aside,
  asideLabel = 'Informasi aplikasi',
  header,
  children,
  footer,
  className,
  ...props
}: AuthLayoutProps) {
  return (
    <div className={cn('min-h-dvh bg-canvas lg:grid lg:grid-cols-2', className)} {...props}>
      <aside
        aria-label={asideLabel}
        className="hidden bg-side-bg px-14 py-12 lg:flex lg:min-h-dvh lg:flex-col"
      >
        <div className="flex flex-1 flex-col">{aside}</div>
      </aside>

      <main className="flex min-h-dvh flex-col px-6 pt-8 pb-6 lg:items-center lg:justify-center lg:px-14 lg:py-12">
        <div className="mx-auto w-full max-w-md lg:hidden">{header}</div>

        <div className="mx-auto flex w-full max-w-md flex-1 flex-col lg:flex-none">
          <div className="flex flex-1 flex-col justify-center lg:flex-none">{children}</div>
          {footer}
        </div>
      </main>
    </div>
  );
}
