# Aturan Khusus: src/components/

Berlaku saat bekerja di folder ini (melengkapi CLAUDE.md di root).

## Lapisan & arah import

- `ui/` → hanya boleh import dari `@/lib`, `@/utils`, `@/constants`. Murni presentasional:
  DILARANG memanggil hook API (`@/api`) atau Redux (`@/store`). Data masuk lewat props.
- `layout/` → boleh import `ui/`, `@/store` (misal state menu mobile), `@/constants`.
- `sections/` → boleh import `ui/`, `layout/`, `@/data`, hook dari `@/api/<domain>/`, dan `@/store/hooks`.
- Arah sebaliknya DILARANG (ui tidak boleh import sections).

## Konvensi

- Satu komponen per file; nama file = nama komponen (PascalCase).
- Named export (`export function Button`), bukan default export.
- `type XxxProps` didefinisikan tepat di atas komponen; selalu terima `className?`.
- Varian & ukuran memakai objek map + `cn()`; lihat skill `create-component`.
- Komponen yang menerima `children` atau atribut HTML: extend tipe atribut HTML-nya
  (misal `ButtonHTMLAttributes<HTMLButtonElement>`) dan teruskan `...props`.
- `ref` diterima sebagai prop biasa (React 19); jangan pakai `forwardRef`.

## Section

- Kelompokkan per domain: `sections/<domain>/` (misal `users/UsersTable.tsx`); skeleton khusus
  section diletakkan di sebelahnya (`UsersTableSkeleton.tsx`).
- Halaman membungkus isinya dengan `<Container as="section" aria-labelledby>`. Gutter halaman sudah
  diatur `AppLayout`/`AuthLayout`: section tidak menambah padding luar; jarak antar-section diatur
  halaman lewat `className` (misal `mt-6`).
- Judul halaman memakai `PageHeader` (satu-satunya `<h1>`); judul di dalam section mulai dari H2.
- Konten statis dari `src/data/`; data dinamis dari hook `@/api/<domain>/queries`.
- Data API wajib menangani loading (`Skeleton`), error (`ErrorState` + `refetch`), kosong (`EmptyState`).
- Angka, mata uang, tanggal diformat lewat `@/utils/format`. Link memakai `ROUTES`.

## Sebelum membuat komponen baru

Cari dulu komponen serupa. Lebih baik menambah varian daripada membuat duplikat.
