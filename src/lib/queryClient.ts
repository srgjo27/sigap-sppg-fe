import { QueryClient } from '@tanstack/react-query';

import { GC_TIME_MS, RETRY_COUNT, STALE_TIME_MS } from '@/constants/queryConfig';
import { isApiError } from '@/lib/axios';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: STALE_TIME_MS,
      gcTime: GC_TIME_MS,
      refetchOnWindowFocus: false,
      retry: (failureCount, error) => {
        // Error 4xx (data tidak ada, tidak berizin) tidak akan berhasil walau diulang.
        if (isApiError(error) && error.status >= 400 && error.status < 500) return false;
        return failureCount < RETRY_COUNT;
      },
    },
  },
});

// Semua error di React Query bertipe ApiError (hasil interceptor axios).
declare module '@tanstack/react-query' {
  interface Register {
    defaultError: import('@/lib/axios').ApiError;
  }
}
