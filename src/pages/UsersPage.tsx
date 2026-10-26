import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import type { UserRole } from '@/api/auth/types';
import { useUsersQuery } from '@/api/users/queries';
import type { UserListParams } from '@/api/users/types';
import { Container } from '@/components/layout/Container';
import { UsersFilters } from '@/components/sections/users/UsersFilters';
import { UsersHeader } from '@/components/sections/users/UsersHeader';
import { UsersTable } from '@/components/sections/users/UsersTable';
import { USER_ROLE_FILTERS, USERS_PAGE } from '@/data/users';
import { useDebounce } from '@/hooks/useDebounce';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

const TITLE_ID = 'users-title';

/** Nama parameter pencarian URL (status filter yang dapat dibagikan/diperbarui). */
const PARAM_KEYS = {
  search: 'q',
  role: 'peran',
  page: 'halaman',
} as const;

function parseRole(value: string | null): UserRole | null {
  return USER_ROLE_FILTERS.find((role) => role === value) ?? null;
}

function parsePage(value: string | null): number {
  const page = Number(value);
  return Number.isInteger(page) && page >= 1 ? page : 1;
}

export default function UsersPage() {
  useDocumentTitle(USERS_PAGE.title);

  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get(PARAM_KEYS.search) ?? '';
  const role = parseRole(searchParams.get(PARAM_KEYS.role));
  const page = parsePage(searchParams.get(PARAM_KEYS.page));
  const debouncedSearch = useDebounce(search);

  const usersParams = useMemo<UserListParams>(
    () => ({
      search: debouncedSearch.trim() || undefined,
      roles: role ? [role] : undefined,
      page,
    }),
    [debouncedSearch, role, page],
  );

  // Kuncinya sama dengan kueri UsersTable, sehingga React Query menggabungkannya menjadi satu permintaan.
  const { data, isPlaceholderData } = useUsersQuery(usersParams);
  const total = isPlaceholderData ? undefined : data?.meta.total;

  /** Menulis satu parameter (nilai kosong akan menghapusnya); perubahan filter akan mengatur ulang halaman ke 1. */
  const updateParams = (key: string, value: string | null, resetPage: boolean) => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (value) next.set(key, value);
        else next.delete(key);
        if (resetPage) next.delete(PARAM_KEYS.page);
        return next;
      },
      // Mengetik di kolom pencarian seharusnya tidak membanjiri riwayat pencarian.
      { replace: key === PARAM_KEYS.search },
    );
  };

  return (
    <Container as="section" aria-labelledby={TITLE_ID}>
      <UsersHeader titleId={TITLE_ID} />
      <UsersFilters
        className="mt-6"
        search={search}
        onSearchChange={(value) => updateParams(PARAM_KEYS.search, value, true)}
        role={role}
        onRoleChange={(nextRole) => updateParams(PARAM_KEYS.role, nextRole, true)}
        total={total}
      />
      <UsersTable
        className="mt-6"
        params={usersParams}
        onPageChange={(nextPage) =>
          updateParams(PARAM_KEYS.page, nextPage > 1 ? String(nextPage) : null, false)
        }
        onResetFilters={() => setSearchParams({})}
      />
    </Container>
  );
}
