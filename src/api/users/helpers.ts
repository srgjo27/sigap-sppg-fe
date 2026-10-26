import { PAGE_SIZE } from '@/constants/config';

import type {
  PaginatedResponseDto,
  User,
  UserDto,
  UserList,
  UserListParams,
  UserListQueryDto,
} from './types';

// NOTE: the API exposes no `id` for users; `email` is the unique key
// (use it for React `key` props and future detail/update lookups).

/** Maps an API user DTO to the UI `User` model. */
export function toUser(dto: UserDto): User {
  return {
    name: dto.nama,
    email: dto.email,
    role: dto.peran,
    placement: dto.penempatan,
    isActive: dto.status,
    lastLoginAt: dto.log_terakhir,
  };
}

/** Maps a paginated API response to the UI `UserList` model. */
export function toUserList(res: PaginatedResponseDto<UserDto>): UserList {
  const { page, per_page, total } = res.meta;
  return {
    items: res.data.map(toUser),
    meta: {
      page,
      perPage: per_page,
      total,
    },
  };
}

/** Maps UI list params to the `GET /v1/users` query string; empty filters are left out. */
export function toUserListQuery(params: UserListParams): UserListQueryDto {
  const { page = 1, perPage = PAGE_SIZE, search, roles, isActive, sort } = params;
  const q = search?.trim();

  return {
    page,
    per_page: perPage,
    q: q ? q : undefined,
    peran: roles && roles.length > 0 ? roles.join(',') : undefined,
    aktif: isActive,
    sort,
  };
}
