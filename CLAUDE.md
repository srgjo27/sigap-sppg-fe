# Proyek: SIGAP SPPG

Aplikasi web untuk satu dapur SPPG yang mencatat setiap tahap operasional MBG (bahan masuk, masak, porsi, kirim, terima di sekolah, pengaduan) secara digital, real-time, dan bisa ditelusuri.

## Stack
- React 19 + Vite + TypeScript (strict)
- Tailwind CSS v4 (token design system di `src/index.css` blok `@theme`)
- React Router: routing (path dari `@/constants/routes`)
- TanStack Query (React Query): **server state**, semua data dari API
- Redux Toolkit: **client state global** (UI, preferensi, keranjang, filter)
- Axios: HTTP client, satu instance di `src/lib/axios.ts`
- Prettier (format) + oxlint (lint bawaan template Vite; boleh diganti ESLint)

## Perintah
- `npm run dev`      : dev server (http://localhost:5173)
- `npm run build`    : typecheck + build produksi (wajib lolos)
- `npm run lint`     : cek lint (wajib lolos)
- `npm run preview`  : preview hasil build

## Struktur folder
```
src/
├── main.tsx            → entry: Redux Provider → QueryClientProvider → Router
├── router.tsx          → definisi route
├── index.css           → Tailwind + token @theme
├── api/<domain>/       → keys.ts, service.ts, queries.ts, mutations.ts, types.ts, helpers.ts
├── store/              → store.ts, hooks.ts, slices/
├── lib/                → axios.ts, queryClient.ts, cn.ts (wrapper library)
├── config/env.ts       → satu-satunya akses import.meta.env
├── constants/          → routes.ts, config.ts, queryConfig.ts
├── utils/              → fungsi murni generik (format, date, string, validation)
├── hooks/              → custom hooks non-API (useMediaQuery, useDebounce)
├── components/
│   ├── ui/             → komponen dasar (Button, Card, Skeleton, ErrorState, EmptyState)
│   ├── layout/         → RootLayout, Navbar, Footer, Container
│   └── sections/       → section halaman (Hero, Features, ProductList)
├── pages/              → satu file per route
├── data/               → konten statis (teks marketing)
└── assets/             → gambar & ikon
```

## Aturan coding
- Function component + hooks. Tanpa class component.
- Named export untuk komponen; default export hanya untuk halaman.
- Props: `type XxxProps = {...}` di file yang sama, tanpa `any`.
- Import memakai alias `@/` (contoh `@/lib/axios`). Urutan: eksternal → `@/` → relatif.
- Styling HANYA Tailwind dengan token design system. Tanpa hex langsung, tanpa CSS inline.
- Gabungkan class kondisional dengan `cn()` dari `@/lib/cn`.
- Semua teks UI dalam Bahasa Indonesia. Konten panjang di `src/data/`.
- Gambar wajib `alt`; elemen interaktif wajib bisa diakses keyboard.

## State management
- Data dari API → React Query (lewat hook di `src/api/<domain>/`). JANGAN disimpan ke Redux.
- State UI global (dipakai ≥2 halaman) → Redux slice. State satu komponen → `useState`.
- Pakai `useAppDispatch` / `useAppSelector` dari `@/store/hooks`.
- Setiap tampilan data wajib menangani 3 status: loading (`Skeleton`), error (`ErrorState`), kosong (`EmptyState`).

## HTTP & API
- Alur: `lib/axios.ts` → `api/<domain>/service.ts` → `queries.ts`/`mutations.ts` → komponen.
- Request HTTP hanya lewat instance `api` dari `@/lib/axios`. Error sudah dinormalisasi menjadi `ApiError`.
- Komponen tidak pernah memanggil axios/fetch atau service secara langsung; selalu lewat hook.

## Utils, helper & constant
- Fungsi generik & murni → `src/utils/`. Fungsi khusus satu domain → `api/<domain>/helpers.ts`.
- Sebelum membuat fungsi baru, CARI dulu di `src/utils/` dan helpers terkait. Jangan duplikasi.
- Tidak ada magic number/string: path route, URL, durasi, limit, storage key → `src/constants/`.
- Environment variable hanya lewat `@/config/env`, tidak pernah langsung `import.meta.env`.

## Pengetahuan proyek (baca saat relevan)
- Aturan visual & komponen: @docs/design-system.md
- Arsitektur, alur data, error handling: @docs/architecture.md
- Aturan per folder ada di `CLAUDE.md` masing-masing (store, api, lib, utils, constants, components, pages).

## Agent, skill & command
- Subagent: `ui-builder` (UI), `data-builder` (API, React Query, Redux), `ui-reviewer` (desain), `code-reviewer` (arsitektur & data layer), `a11y-checker` (aksesibilitas)
- Skill: `create-page`, `create-component`, `create-api`, `create-slice`
- Command: `/new-page`, `/new-component`, `/new-api`, `/new-slice`, `/review-ui`, `/review-code`, `/update-context`

## Definisi "selesai"
1. `npm run lint` dan `npm run build` lolos.
2. Responsif (375px, 768px, 1280px) dan sesuai design system.
3. Status loading/error/kosong ditangani untuk setiap data dari API.
4. Laporkan file yang diubah secara ringkas.

## Jangan
- Jangan memakai RTK Query (server state sudah ditangani React Query).
- Jangan import `axios` di luar `src/lib/axios.ts`.
- Jangan menginstall library UI lain (MUI, Bootstrap, Chakra) tanpa persetujuan.
- Jangan mengubah token `@theme` tanpa memperbarui `docs/design-system.md`.
- Jangan membaca atau mengubah file `.env` (kecuali `.env.example`). Jangan taruh secret di frontend.
