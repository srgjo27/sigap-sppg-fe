# Aturan Khusus: src/utils/

## Definisi
Fungsi MURNI dan GENERIK: input sama → output sama, tanpa side effect, tanpa React,
tanpa akses store/API/localStorage. Bisa dipindah ke proyek lain tanpa perubahan.

## File per kategori
| File | Isi |
|---|---|
| `format.ts` | `formatCurrency`, `formatNumber`, `formatDate`, `formatRelativeTime` |
| `string.ts` | `slugify`, `truncate`, `capitalize`, `getInitials` |
| `validation.ts` | `isValidEmail`, `isValidPhoneID` |
Tambah file kategori baru bila tidak cocok dengan yang ada (misal `array.ts`).

## Konvensi
- Named export, parameter & return bertipe eksplisit, JSDoc satu baris dengan contoh.
- Lokal default Indonesia (`id-ID`, mata uang `IDR`, zona `Asia/Jakarta`) dari `@/constants/config`.
- Sebelum menambah fungsi, cek apakah sudah ada. Jangan duplikasi.
- Fungsi khusus satu domain (misal hitung diskon produk) → `src/api/<domain>/helpers.ts`, BUKAN di sini.
- Custom hook React bukan utils → `src/hooks/`.
- Bila proyek memakai Vitest, sertakan test `<file>.test.ts` untuk fungsi baru.
