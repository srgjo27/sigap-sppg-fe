import type { UserRole } from '@/api/auth/types';

// GET /users, response { data: UserDto[]; meta: PaginationMetaDto }.

/** User as returned by the API (snake_case / Indonesian field names). */
export type UserDto = {
  nama: string;
  email: string;
  peran: UserRole;
  penempatan: string | null;
  status: boolean;
  log_terakhir: string | null;
};

/** Pagination metadata as returned by the API. */
export type PaginationMetaDto = {
  page: number;
  per_page: number;
  total: number;
};

/** Generic paginated list envelope returned by the API. */
export type PaginatedResponseDto<T> = {
  data: T[];
  meta: PaginationMetaDto;
};

/** User model consumed by the UI. */
export type User = {
  name: string;
  email: string;
  role: UserRole;
  placement: string | null;
  isActive: boolean;
  /** ISO 8601 timestamp of the last login, or null if the user never signed in. */
  lastLoginAt: string | null;
};

/** Pagination metadata consumed by the UI. */
export type PaginationMeta = {
  page: number;
  perPage: number;
  total: number;
};

export type UserList = {
  items: User[];
  meta: PaginationMeta;
};

/** Filters, sort, and pagination for the user list (UI-facing names). */
export type UserListParams = {
  page?: number;
  perPage?: number;
  /** Free-text search (name, email, ...). Sent as `q`. */
  search?: string;
  /** Sent as comma-separated `peran`, e.g. `kepala_sppg,akuntan`. */
  roles?: UserRole[];
  /** Sent as `aktif`. Undefined = all users. */
  isActive?: boolean;
  sort?: string;
};

/** Query string as sent to `GET /v1/users`. Undefined keys are omitted by axios. */
export type UserListQueryDto = {
  page: number;
  per_page: number;
  q?: string;
  peran?: string;
  aktif?: boolean;
  sort?: string;
};
