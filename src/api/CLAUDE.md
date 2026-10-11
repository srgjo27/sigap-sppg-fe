# Aturan Khusus: src/api/ (axios + React Query)

Berlaku saat bekerja di folder ini. Untuk langkah lengkap: skill `create-api`. Contoh acuan: `products/`.

## Alur
`@/lib/axios` (instance `api`) → `service.ts` → `queries.ts` / `mutations.ts` → komponen

## Struktur per domain: `src/api/<domain>/`
| File | Isi |
|---|---|
| `types.ts` | Tipe respons/payload API (DTO) dan model UI bila berbeda |
| `keys.ts` | Query key factory: `xxxKeys.all`, `.lists()`, `.list(params)`, `.details()`, `.detail(id)` |
| `service.ts` | Fungsi async per endpoint. `const ENDPOINT = '/xxx'` di atas file. Return data bertipe. |
| `queries.ts` | `useXxxQuery`, `useXxxDetailQuery` |
| `mutations.ts` | `useCreateXxxMutation`, dll. `onSuccess` → `invalidateQueries` |
| `helpers.ts` | Transformasi/kalkulasi khusus domain ini (opsional) |

## Aturan
- Request HTTP hanya lewat `api` dari `@/lib/axios`. Jangan import `axios` di sini.
- Service tidak memakai try/catch untuk mengubah pesan; interceptor sudah menghasilkan `ApiError`.
- Service return `data`, bukan `AxiosResponse`.
- Query key tidak pernah ditulis manual; selalu dari factory `keys.ts`.
- Nilai default (staleTime, retry) dari `@/constants/queryConfig`; override per query hanya bila perlu, beri komentar alasannya.
- Fungsi yang generik (format, tanggal) → `src/utils/`, bukan `helpers.ts`.
- Hasil query tidak disalin ke Redux atau `useState`.
