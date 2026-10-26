import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

type PageHeaderProps = {
  /** Rendered as the page's only `<h1>`. */
  title: ReactNode;
  description?: ReactNode;
  /** Right-aligned actions on `md` and up (e.g. a primary "Tambah" button). */
  actions?: ReactNode;
  /** Id of the `<h1>`, for `aria-labelledby` on the surrounding section. */
  titleId?: string;
  className?: string;
};

/** Page title block of app pages: H1 + description on the left, actions on the right. */
export function PageHeader({ title, description, actions, titleId, className }: PageHeaderProps) {
  return (
    <header
      className={cn('flex flex-col gap-4 md:flex-row md:items-start md:justify-between', className)}
    >
      <div className="min-w-0">
        <h1 id={titleId} className="text-ink text-3xl font-bold tracking-tight">
          {title}
        </h1>
        {description && <p className="text-muted mt-1 text-base">{description}</p>}
      </div>
      {actions && <div className="shrink-0">{actions}</div>}
    </header>
  );
}
