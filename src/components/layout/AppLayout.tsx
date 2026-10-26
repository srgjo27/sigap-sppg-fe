import type { HTMLAttributes, ReactNode } from 'react';
import { Outlet } from 'react-router-dom';

import { cn } from '@/lib/cn';

const MAIN_CONTENT_ID = 'main-content';

type AppLayoutProps = HTMLAttributes<HTMLDivElement> & {
  /**
   * Desktop sidebar content, rendered only on `lg` and up. The slot owns its inner padding and
   * must contain the `<nav aria-label>` landmark.
   */
  sidebar: ReactNode;
  /** Optional top bar rendered above the main content below `lg` (no mobile design yet). */
  mobileHeader?: ReactNode;
  /** Page content. Defaults to `<Outlet />` so the layout can be used as a route element. */
  children?: ReactNode;
  /** Visible label of the skip link shown on keyboard focus. */
  skipLinkLabel?: string;
  className?: string;
};

/** Signed-in app shell: fixed-width sticky sidebar on desktop and a scrollable content column. */
export function AppLayout({
  sidebar,
  mobileHeader,
  children,
  skipLinkLabel = 'Lewati ke konten',
  className,
  ...props
}: AppLayoutProps) {
  return (
    <div className={cn('min-h-dvh bg-canvas lg:flex', className)} {...props}>
      <a
        href={`#${MAIN_CONTENT_ID}`}
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-surface focus:px-4 focus:py-2 focus:text-ink focus:ring-2 focus:ring-brand-700 focus:outline-none"
      >
        {skipLinkLabel}
      </a>

      {/*
        Plain <div> on purpose (not <aside>/<nav>): the sidebar slot renders its own <nav>
        landmark, so wrapping it in another landmark would create duplicates.
      */}
      <div className="hidden bg-side-bg lg:sticky lg:top-0 lg:flex lg:h-dvh lg:w-60 lg:shrink-0 lg:flex-col lg:overflow-y-auto">
        {sidebar}
      </div>

      {mobileHeader ? <div className="lg:hidden">{mobileHeader}</div> : null}

      {/* min-w-0 lets wide content (tables) scroll inside instead of stretching the page. */}
      <main
        id={MAIN_CONTENT_ID}
        tabIndex={-1}
        className="min-w-0 flex-1 px-6 pt-8 pb-10 focus:outline-none lg:px-10 lg:pt-10"
      >
        {children ?? <Outlet />}
      </main>
    </div>
  );
}
