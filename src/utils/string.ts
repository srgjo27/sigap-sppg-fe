import { LOCALE } from '@/constants/config';

/**
 * Initials from the first and last word of a name. Example: `getInitials('Muhammad Rizky Fajar')` → "MF"
 * A single word yields one letter (`'Budi'` → "B"); a blank name yields "".
 */
export function getInitials(name: string, maxLetters: number = 2): string {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0 || maxLetters <= 0) return '';

  const first = Array.from(words[0])[0] ?? '';
  const last = words.length > 1 ? (Array.from(words[words.length - 1])[0] ?? '') : '';

  return Array.from(`${first}${last}`.toLocaleUpperCase(LOCALE)).slice(0, maxLetters).join('');
}
