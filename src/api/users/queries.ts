import { keepPreviousData, useQuery } from '@tanstack/react-query';

import type { ApiError } from '@/lib/axios';

import { userKeys } from './keys';
import { getUsers } from './service';
import type { UserList, UserListParams } from './types';

/** Paginated user list. staleTime/retry come from the queryClient defaults. */
export function useUsersQuery(params: UserListParams = {}) {
  return useQuery<UserList, ApiError>({
    queryKey: userKeys.list(params),
    queryFn: () => getUsers(params),
    // Keep the previous page visible while the next page loads (smooth pagination, no skeleton flash).
    placeholderData: keepPreviousData,
  });
}
