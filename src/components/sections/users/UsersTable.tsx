import { SearchX } from 'lucide-react';

import { useUsersQuery } from '@/api/users/queries';
import type { User, UserListParams } from '@/api/users/types';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { DataTable, type DataTableColumn } from '@/components/ui/DataTable';
import { EmptyState } from '@/components/ui/EmptyState';
import { ErrorState } from '@/components/ui/ErrorState';
import { ROLE_LABELS } from '@/data/navigation';
import { USERS_PAGE } from '@/data/users';
import { cn } from '@/lib/cn';
import { formatShortDateTime } from '@/utils/format';

import { UsersFooterNote } from './UsersFooterNote';
import { UsersTableSkeleton } from './UsersTableSkeleton';

const { columns: COLUMN_LABELS } = USERS_PAGE;

const USER_COLUMNS: DataTableColumn<User>[] = [
  {
    key: 'user',
    header: COLUMN_LABELS.user,
    cell: (user) => (
      <div className="flex items-center gap-3">
        <Avatar name={user.name} />
        <div className="min-w-0">
          <p className="text-ink font-semibold">{user.name}</p>
          <p className="text-muted max-w-48 truncate text-sm" title={user.email}>
            {user.email}
          </p>
        </div>
      </div>
    ),
  },
  {
    key: 'role',
    header: COLUMN_LABELS.role,
    cell: (user) => ROLE_LABELS[user.role],
  },
  {
    key: 'placement',
    header: COLUMN_LABELS.placement,
    cell: (user) => user.placement ?? USERS_PAGE.noPlacement,
  },
  {
    key: 'status',
    header: COLUMN_LABELS.status,
    // API only exposes an active flag; "Belum ganti password"/"Terkunci" need extra fields.
    cell: (user) =>
      user.isActive ? (
        <Badge variant="success">{USERS_PAGE.status.active}</Badge>
      ) : (
        <Badge variant="neutral">{USERS_PAGE.status.inactive}</Badge>
      ),
  },
  {
    key: 'lastLogin',
    header: COLUMN_LABELS.lastLogin,
    className: 'text-muted',
    cell: (user) =>
      user.lastLoginAt ? formatShortDateTime(user.lastLoginAt) : USERS_PAGE.neverLoggedIn,
  },
  {
    key: 'actions',
    header: <span className="sr-only">{COLUMN_LABELS.actions}</span>,
    className: 'text-right',
    // Disabled until an update endpoint and form design exist.
    cell: (user) => (
      <Button
        variant="link"
        disabled
        title={USERS_PAGE.comingSoon}
        aria-label={`${USERS_PAGE.edit} ${user.name}`}
      >
        {USERS_PAGE.edit}
      </Button>
    ),
  },
];

type UsersTableProps = {
  /** Query params built by the page from the URL (search already debounced). */
  params: UserListParams;
  onPageChange: (page: number) => void;
  onResetFilters: () => void;
  className?: string;
};

/** Daftar pengguna dengan status sedang dimuat, terjadi kesalahan, dan kosong, diikuti oleh catatan kaki + paginasi. */
export function UsersTable({ params, onPageChange, onResetFilters, className }: UsersTableProps) {
  const { data, error, isPending, isError, isFetching, refetch } = useUsersQuery(params);
  const hasFilters = Boolean(params.search?.trim()) || Boolean(params.roles?.length);

  const renderContent = () => {
    if (isPending) return <UsersTableSkeleton />;

    if (isError) {
      return (
        <div className="border-line bg-surface rounded-2xl border">
          <ErrorState
            title={USERS_PAGE.error.title}
            message={error.message}
            onRetry={() => void refetch()}
            retryLabel={USERS_PAGE.error.retry}
            isRetrying={isFetching}
          />
        </div>
      );
    }

    if (data.items.length === 0) {
      return (
        <div className="border-line bg-surface rounded-2xl border">
          <EmptyState
            icon={<SearchX className="size-6" aria-hidden="true" />}
            title={USERS_PAGE.empty.title}
            description={USERS_PAGE.empty.description}
            action={
              hasFilters ? (
                <Button variant="secondary" size="sm" onClick={onResetFilters}>
                  {USERS_PAGE.empty.reset}
                </Button>
              ) : undefined
            }
          />
        </div>
      );
    }

    const { page, perPage, total } = data.meta;
    // `meta` has no totalPages; derive it (min 1).
    const totalPages = Math.max(1, Math.ceil(total / Math.max(1, perPage)));

    return (
      <>
        <DataTable
          columns={USER_COLUMNS}
          rows={data.items}
          getRowKey={(user) => user.email}
          caption={USERS_PAGE.tableCaption}
        />
        <UsersFooterNote
          shown={data.items.length}
          total={total}
          page={page}
          totalPages={totalPages}
          onPageChange={onPageChange}
          isFetching={isFetching}
        />
      </>
    );
  };

  return (
    <div aria-live="polite" aria-busy={isFetching} className={cn(className)}>
      {renderContent()}
    </div>
  );
}
