import { api } from '@/lib/axios';

import { toUserList, toUserListQuery } from './helpers';
import type { PaginatedResponseDto, UserDto, UserList, UserListParams } from './types';

const ENDPOINT = '/v1/users';

/**
 * GET /v1/users with filters, sort, and pagination (bearer token added by the axios interceptor).
 * Example query: `?q=pengawas&per_page=10&page=1` or `?peran=kepala_sppg,akuntan&aktif=true&sort=nama`.
 */
export async function getUsers(params: UserListParams = {}): Promise<UserList> {
  const { data } = await api.get<PaginatedResponseDto<UserDto>>(ENDPOINT, {
    params: toUserListQuery(params),
  });
  return toUserList(data);
}
