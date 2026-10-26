import { Button } from '@/components/ui/Button';
import { USERS_PAGE } from '@/data/users';
import { cn } from '@/lib/cn';

type UsersFooterNoteProps = {
  shown: number;
  total: number;
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  /** Disables paging while the next page is loading. */
  isFetching: boolean;
  className?: string;
};

/** "Menampilkan x dari y pengguna" note + prev/next pagination (only when there is more than one page). */
export function UsersFooterNote({
  shown,
  total,
  page,
  totalPages,
  onPageChange,
  isFetching,
  className,
}: UsersFooterNoteProps) {
  return (
    <div
      className={cn(
        'text-muted mt-6 flex flex-col gap-3 text-sm md:flex-row md:items-center md:justify-between',
        className,
      )}
    >
      <p>{USERS_PAGE.footnote(shown, total)}</p>

      {totalPages > 1 && (
        <nav aria-label={USERS_PAGE.pagination.label} className="flex items-center gap-3">
          <Button
            variant="secondary"
            size="sm"
            disabled={page <= 1 || isFetching}
            onClick={() => onPageChange(page - 1)}
          >
            {USERS_PAGE.pagination.prev}
          </Button>
          <span className="whitespace-nowrap">{USERS_PAGE.pagination.page(page, totalPages)}</span>
          <Button
            variant="secondary"
            size="sm"
            disabled={page >= totalPages || isFetching}
            onClick={() => onPageChange(page + 1)}
          >
            {USERS_PAGE.pagination.next}
          </Button>
        </nav>
      )}
    </div>
  );
}
