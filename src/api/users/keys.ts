import type { UserListParams } from './types';

/** Query key factory. Never write user query keys manually elsewhere. */
export const userKeys = {
  all: ['users'] as const,
  lists: () => [...userKeys.all, 'list'] as const,
  list: (params: UserListParams) => [...userKeys.lists(), params] as const,
  // No `detail` yet: users have no id and there is no detail endpoint.
};
