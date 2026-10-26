import { useEffect, useState } from 'react';

import { SEARCH_DEBOUNCE_MS } from '@/constants/config';

/** Mengembalikan `value` setelah nilainya tidak lagi berubah selama `delayMs` (misalnya, input pencarian → parameter kueri). */
export function useDebounce<T>(value: T, delayMs: number = SEARCH_DEBOUNCE_MS): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => setDebouncedValue(value), delayMs);
    return () => window.clearTimeout(timeoutId);
  }, [value, delayMs]);

  return debouncedValue;
}
