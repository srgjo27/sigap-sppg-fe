---
name: create-component
description: Membuat komponen React baru (ui, layout, atau section) dengan props bertipe, varian, dan styling sesuai design system. Gunakan saat diminta membuat komponen seperti Button, Card, Navbar, Hero, Testimonial, dll.
---
# Membuat Komponen Baru

## 1. Cek dulu
Cari komponen serupa di `src/components/` (Grep nama atau fungsinya).
Jika sudah ada, perluas dengan varian/props baru, JANGAN membuat duplikat.

## 2. Tentukan lapisan
| Lapisan | Folder | Ciri |
|---|---|---|
| ui | `src/components/ui/` | generik, kecil, tanpa konten spesifik (Button, Badge) |
| layout | `src/components/layout/` | kerangka halaman (Navbar, Footer, Container, Section) |
| section | `src/components/sections/` | blok besar berisi konten (Hero, Features, Testimonials) |

## 3. Tulis komponen
Gunakan `template.tsx` di folder skill ini sebagai pola dasar:
- Satu komponen per file, nama file = nama komponen (`PricingCard.tsx`).
- `type XxxProps` di atas komponen; terima `className` agar bisa ditimpa.
- Varian memakai objek map (`variants`, `sizes`), bukan if-else bertumpuk.
- Gabungkan class dengan `cn()` dari `@/lib/cn`.
- Section mengambil konten dari `src/data/` (statis) atau hook `src/api/` (dinamis), bukan hardcode.
- Komponen `ui/` tidak boleh memanggil hook API atau Redux; data lewat props.

## 4. Styling
Ikuti `docs/design-system.md` bagian Komponen dasar. Semua status interaktif wajib ada:
`hover`, `focus-visible`, `disabled`.

## 5. Verifikasi
`npm run lint`, lalu sebutkan contoh pemakaiannya kepada pengguna.

## Komponen dasar yang sudah tersedia
`Button`, `Skeleton`, `ErrorState`, `EmptyState` di `src/components/ui/`; `Container` di `src/components/layout/`.
Helper `cn()` sudah ada di `@/lib/cn`. Format angka/tanggal pakai `@/utils/format`.
