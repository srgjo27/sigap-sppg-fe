import { LOCALE, TIME_ZONE } from '@/constants/config';

const dateFormatter = new Intl.DateTimeFormat(LOCALE, {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: TIME_ZONE,
});

const timeFormatter = new Intl.DateTimeFormat(LOCALE, {
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23',
  timeZone: TIME_ZONE,
});

const numberFormatter = new Intl.NumberFormat(LOCALE);

function toDate(value: string | Date): Date {
  return value instanceof Date ? value : new Date(value);
}

/** Formats a date. Example: `formatDate('2026-10-02')` → "2 Oktober 2026" */
export function formatDate(value: string | Date): string {
  return dateFormatter.format(toDate(value));
}

/** Formats a date with time. Example: `formatDateTime('2026-10-12T13:14:14+07:00')` → "12 Oktober 2026, 13.14" */
export function formatDateTime(value: string | Date): string {
  const date = toDate(value);
  return `${dateFormatter.format(date)}, ${timeFormatter.format(date)}`;
}

/** Formats a number with thousand separators. Example: `formatNumber(12500)` → "12.500" */
export function formatNumber(value: number): string {
  return numberFormatter.format(value);
}

const shortDateTimeFormatter = new Intl.DateTimeFormat(LOCALE, {
  day: 'numeric',
  month: 'short',
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23',
  timeZone: TIME_ZONE,
});

/** Formats a short date with time, without year. Example: `formatShortDateTime('2026-10-10T19:12:00+07:00')` → "10 Okt, 19.12" */
export function formatShortDateTime(value: string | Date): string {
  const parts = shortDateTimeFormatter.formatToParts(toDate(value));
  const get = (type: Intl.DateTimeFormatPartTypes): string =>
    parts.find((part) => part.type === type)?.value ?? '';
  return `${get('day')} ${get('month')}, ${get('hour')}.${get('minute')}`;
}
