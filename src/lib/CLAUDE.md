# Aturan Khusus: src/lib/

Berisi konfigurasi dan wrapper library pihak ketiga. Satu file per library. Tanpa logika fitur.

## axios.ts
- Satu instance `api` dengan `baseURL` dari `env.API_URL` dan `timeout` dari `REQUEST_TIMEOUT`.
- Request interceptor: menambahkan header `Authorization: Bearer <token>` bila token ada di localStorage (`STORAGE_KEYS.AUTH_TOKEN`).
- Response interceptor: mengubah semua error menjadi `ApiError { status, message, details? }`
  dengan pesan Bahasa Indonesia berdasarkan status (lihat `getErrorMessage`).
- Ini SATU-SATUNYA file yang boleh `import axios`.

## queryClient.ts
- `QueryClient` dengan default `staleTime`, `gcTime`, `retry` dari `@/constants/queryConfig`.
- Tidak retry untuk error 4xx.

## cn.ts
- Helper gabung class Tailwind (`clsx` + `tailwind-merge`). Tidak perlu diubah.

## Menambah file baru di sini
Hanya untuk library yang butuh konfigurasi terpusat (misal i18n, analytics). Sebutkan alasannya.
