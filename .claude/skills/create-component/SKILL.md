---
name: create-component
description: Membuat komponen React baru (ui, layout, atau section) dengan props bertipe, varian, dan styling sesuai design system. Gunakan saat diminta membuat komponen seperti Button, Card, Navbar, Hero, Testimonial, dll.
---

# Membuat Komponen Baru

## 1. Cek dulu

Cari komponen serupa di `src/components/` (Grep nama atau fungsinya).
Jika sudah ada, perluas dengan varian/props baru, JANGAN membuat duplikat.

## 2. Tentukan lapisan

| Lapisan | Folder                              | Ciri                                                                        |
| ------- | ----------------------------------- | --------------------------------------------------------------------------- |
| ui      | `src/components/ui/`                | generik, kecil, tanpa konten spesifik (Button, Badge)                       |
| layout  | `src/components/layout/`            | kerangka halaman (AppLayout, AuthLayout, Container, PageHeader)             |
| section | `src/components/sections/<domain>/` | blok berisi konten/data satu domain (`login/LoginForm`, `users/UsersTable`) |

## 3. Tulis komponen

Gunakan `template.tsx` di folder skill ini sebagai pola dasar:

- Satu komponen per file, nama file = nama komponen (`PricingCard.tsx`).
- `type XxxProps` di atas komponen; terima `className` agar bisa ditimpa.
- Varian memakai objek map (`variants`, `sizes`), bukan if-else bertumpuk.
- Gabungkan class dengan `cn()` dari `@/lib/cn`.
- Section mengambil konten dari `src/data/` (statis) atau hook `src/api/` (dinamis), bukan hardcode.
- Komponen `ui/` tidak boleh memanggil hook API atau Redux; data lewat props.
- `ref` diterima sebagai prop biasa (React 19); jangan pakai `forwardRef`.

## 4. Styling

Ikuti `docs/design-system.md` bagian Komponen dasar. Semua status interaktif wajib ada:
`hover`, `focus-visible`, `disabled`.

## 5. Verifikasi

`npm run lint` dan `npm run build`, lalu sebutkan contoh pemakaiannya kepada pengguna.

## Komponen dasar yang sudah tersedia

- `ui/`: `Alert`, `Avatar`, `Badge`, `Button`, `DataTable`, `Divider`, `EmptyState`, `ErrorState`,
  `FilterChip`, `FormField`, `Input`, `Label`, `Logo`, `PasswordInput`, `Skeleton`, `StepList`.
- `layout/`: `AppLayout`, `AuthLayout`, `Container`, `PageHeader`, `RootLayout`.

Helper `cn()` sudah ada di `@/lib/cn`. Format angka/tanggal pakai `@/utils/format`.
