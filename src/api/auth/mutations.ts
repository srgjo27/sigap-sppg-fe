import { useMutation, useQueryClient } from '@tanstack/react-query';

import { STORAGE_KEYS } from '@/constants/config';
import type { ApiError } from '@/lib/axios';

import { authKeys } from './keys';
import { login, logout } from './service';
import type { LoginPayload, LoginResponse } from './types';

/**
 * Sign in with email & password. Stores the token on success.
 * Navigation is the caller's responsibility (pass `onSuccess` to `mutate`).
 */
export function useLoginMutation() {
  const queryClient = useQueryClient();

  return useMutation<LoginResponse, ApiError, LoginPayload>({
    mutationFn: login,
    // Never auto-retry credentials: a failed login must surface immediately to the user.
    retry: false,
    onSuccess: (data) => {
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, data.access_token);
      localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, data.refresh_token);
      queryClient.invalidateQueries({ queryKey: authKeys.all });
    },
  });
}

/**
 * Sign out locally: removes the token and clears all cached server data.
 * Navigation is the caller's responsibility (pass `onSuccess` to `mutate`).
 */
export function useLogoutMutation() {
  const queryClient = useQueryClient();

  return useMutation<void, ApiError, void>({
    mutationFn: logout,
    onSuccess: () => {
      localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
      queryClient.clear();
    },
  });
}
