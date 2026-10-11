# Aturan Khusus: src/pages/

Berlaku saat bekerja di folder ini (melengkapi CLAUDE.md di root).

- Satu file per route, nama `<Nama>Page.tsx`, default export.
- Halaman hanya MENYUSUN section dari `src/components/sections/`. Tidak ada styling kompleks di sini.
- Halaman boleh memanggil query hook bila datanya dibagikan ke beberapa section (misal parameter dari URL),
  tetapi utamakan pemanggilan hook di dalam section.
- Wajib `useDocumentTitle('<Judul>')` dari `@/hooks/useDocumentTitle`.
- Tepat satu `<h1>` per halaman (biasanya di section Hero).
- Setiap halaman baru wajib:
  1. punya konstanta path di `ROUTES` (`src/constants/routes.ts`),
  2. didaftarkan di `src/router.tsx` sebagai child `RootLayout`,
  3. dicatat di tabel routing `docs/architecture.md`,
  4. ditambahkan ke `NAV_ITEMS` di Navbar bila merupakan halaman utama.
- Gunakan skill `create-page` untuk langkah lengkapnya.
