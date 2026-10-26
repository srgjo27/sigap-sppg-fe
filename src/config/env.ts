// Satu-satunya tempat membaca import.meta.env. Lihat src/constants/CLAUDE.md.

function required(name: keyof ImportMetaEnv): string {
  const value = import.meta.env[name];
  if (!value) {
    throw new Error(
      `Environment variable ${name} belum diisi. Cek file .env.local (contoh: .env.example).`,
    );
  }
  return value;
}

export const env = {
  API_URL: required('VITE_API_URL'),
  APP_ENV: import.meta.env.VITE_APP_ENV ?? 'development',
  IS_DEV: import.meta.env.DEV,
} as const;
