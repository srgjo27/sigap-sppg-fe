import { Search } from 'lucide-react';

import type { UserRole } from '@/api/auth/types';
import { FilterChip } from '@/components/ui/FilterChip';
import { Input } from '@/components/ui/Input';
import { ROLE_LABELS } from '@/data/navigation';
import { USER_ROLE_FILTERS, USERS_PAGE } from '@/data/users';
import { cn } from '@/lib/cn';

type UsersFiltersProps = {
  search: string;
  onSearchChange: (value: string) => void;
  role: UserRole | null;
  onRoleChange: (role: UserRole | null) => void;
  /** Total users, shown on the "Semua" chip only while no filter is active. */
  total?: number;
  className?: string;
};

/** Search field + single-select role chips. Controlled; state lives in the page URL. */
export function UsersFilters({
  search,
  onSearchChange,
  role,
  onRoleChange,
  total,
  className,
}: UsersFiltersProps) {
  const isUnfiltered = role === null && search.trim() === '';

  return (
    <div className={cn(className)}>
      <Input
        type="search"
        aria-label={USERS_PAGE.searchLabel}
        placeholder={USERS_PAGE.searchPlaceholder}
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        startAdornment={<Search className="size-4" aria-hidden="true" />}
        wrapperClassName="w-full max-w-sm"
        className="h-11"
      />

      <div role="group" aria-label={USERS_PAGE.filterLabel} className="mt-3 flex flex-wrap gap-3">
        <FilterChip
          selected={role === null}
          count={isUnfiltered ? total : undefined}
          onClick={() => onRoleChange(null)}
        >
          {USERS_PAGE.allRoles}
        </FilterChip>
        {USER_ROLE_FILTERS.map((filterRole) => (
          <FilterChip
            key={filterRole}
            selected={role === filterRole}
            onClick={() => onRoleChange(filterRole)}
          >
            {ROLE_LABELS[filterRole]}
          </FilterChip>
        ))}
      </div>
    </div>
  );
}
