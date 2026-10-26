import { STORAGE_KEYS } from '@/constants/config';

/** True when an access token is stored (set by `useLoginMutation`, removed on logout or 401). */
export function hasAuthToken(): boolean {
  return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN) !== null;
}
