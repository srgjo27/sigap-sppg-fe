---
name: create-page
description: Membuat halaman (route) baru lengkap: file halaman, section, data konten, pendaftaran route, dan link navigasi. Gunakan saat diminta membuat halaman baru seperti About, Pricing, Contact, Blog, dll.
---
# Membuat Halaman Baru

## Langkah
1. **Tentukan nama**: `NamaHalamanPage` (PascalCase, akhiran `Page`), path kebab-case (`/tentang-kami` atau `/about`).
   Tambahkan konstanta path di `ROUTES` (`src/constants/routes.ts`) terlebih dahulu.
2. **Rencanakan section**: tulis daftar section singkat (misal: Hero → Visi Misi → Tim → CTA).
   Untuk halaman dengan lebih dari 4 section, tampilkan rencana ke pengguna dulu.
3. **Konten**: buat `src/data/<nama-halaman>.ts` berisi teks dan daftar item (typed).
4. **Section**: buat setiap section di `src/components/sections/<nama-halaman>/`
   (gunakan skill `create-component` untuk aturan komponen). Pakai ulang section yang sudah ada jika cocok.
5. **Halaman**: buat `src/pages/<NamaHalaman>Page.tsx` berdasarkan `template.tsx` di folder skill ini.
   Jika section butuh data API, pakai hook dari `src/api/<domain>/` (buat dengan skill `create-api` bila belum ada)
   dan tangani status loading/error/kosong.
6. **Routing**: daftarkan di `src/router.tsx` sebagai child `RootLayout`, path dari `ROUTES`.
7. **Navigasi**: tambahkan item di `NAV_ITEMS` (`src/components/layout/Navbar.tsx`) dan Footer bila relevan.
8. **Dokumentasi**: tambahkan baris ke tabel routing di `docs/architecture.md`.
9. **Verifikasi**: `npm run lint` dan `npm run build`.

## Aturan halaman
- Halaman hanya MENYUSUN section; tidak ada styling rumit atau logika berat di file halaman.
- Satu `<h1>` per halaman (biasanya di Hero).
- Set judul dengan hook `useDocumentTitle('<Judul>')` dari `@/hooks/useDocumentTitle`.
- Latar section bergantian `bg-canvas` / `bg-surface`.
- Default export untuk komponen halaman.

## Checklist akhir
- [ ] Konstanta di `ROUTES`, route terdaftar dan bisa diakses
- [ ] Status loading/error/kosong untuk data API
- [ ] Link navigasi ditambahkan
- [ ] Responsif 375 / 768 / 1280
- [ ] docs/architecture.md diperbarui
