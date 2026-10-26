const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Checks a basic email shape. Example: `isValidEmail('nama@sigap-sppg.local')` → true */
export function isValidEmail(value: string): boolean {
  return EMAIL_PATTERN.test(value);
}
