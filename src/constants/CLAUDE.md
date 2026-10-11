# Aturan Khusus: src/constants/ dan src/config/

## constants/
Nilai tetap yang tidak berubah saat runtime.
| File | Isi |
|---|---|
| `routes.ts` | `ROUTES` - semua path aplikasi (fungsi untuk path dinamis) |
| `config.ts` | `APP_NAME`, `LOCALE`, `CURRENCY`, `REQUEST_TIMEOUT`, `PAGE_SIZE`, `STORAGE_KEYS` |
| `queryConfig.ts` | `STALE_TIME`, `GC_TIME`, `RETRY_COUNT` |

Konvensi:
- UPPER_SNAKE_CASE; objek memakai `as const`.
- Durasi dalam milidetik dengan nama berakhiran `_MS` atau komentar satuan.
- `ROUTES` dipakai di router, Navbar, dan semua `<Link>`. Tidak ada path string manual.
- Konstanta yang hanya dipakai satu komponen boleh tetap di file komponen itu.
- Teks/konten marketing BUKAN konstanta → `src/data/`.

## config/env.ts
- SATU-SATUNYA tempat membaca `import.meta.env`.
- Variabel wajib divalidasi saat start; jika kosong, lempar error yang jelas.
- Semua variabel berawalan `VITE_` dan dicatat di `.env.example` serta tabel env di `docs/architecture.md`.
- Semua `VITE_*` terlihat publik di browser: JANGAN menaruh secret/API key privat.
- Tipe variabel ditambahkan di `src/vite-env.d.ts` (`ImportMetaEnv`).
