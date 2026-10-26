import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Gabungkan class Tailwind dan selesaikan konflik. Contoh: cn('p-2', isActive && 'p-4') → 'p-4' */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
