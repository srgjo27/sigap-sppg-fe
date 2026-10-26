export const APP_NAME = 'Sigap SPPG';

/** Lokal & format default */
export const LOCALE = 'id-ID';
export const CURRENCY = 'IDR';
export const TIME_ZONE = 'Asia/Jakarta';

/** Batas waktu request HTTP (ms) */
export const REQUEST_TIMEOUT_MS = 15_000;

/** Jumlah item per halaman untuk daftar */
export const PAGE_SIZE = 12;

/** Key localStorage. Jangan menulis string key langsung di kode lain. */
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'mw.auth-token',
  REFRESH_TOKEN: 'mw.refresh-token',
  THEME: 'mw.theme',
} as const;

/** Jeda debounce input pencarian (ms) */
export const SEARCH_DEBOUNCE_MS = 300;
