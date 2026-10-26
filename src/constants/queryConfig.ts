/** Data dianggap segar selama 1 menit (ms) */
export const STALE_TIME_MS = 60_000;

/** Cache yang tidak dipakai dihapus setelah 5 menit (ms) */
export const GC_TIME_MS = 5 * 60_000;

/** Jumlah percobaan ulang untuk error jaringan / 5xx */
export const RETRY_COUNT = 2;
