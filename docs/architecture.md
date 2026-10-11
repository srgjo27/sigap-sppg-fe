# Arsitektur

<!-- Perbarui dokumen ini setiap ada keputusan arsitektur baru (pakai /update-context) -->

## Gambaran
Single Page Application (SPA) berbasis React + Vite. Konten marketing statis di `src/data/`,
data dinamis diambil dari REST API lewat axios + React Query. State UI global di Redux Toolkit.

## Provider (src/main.tsx)
```
<StrictMode>
  <ReduxProvider store={store}>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools />   (hanya development)
    </QueryClientProvider>
  </ReduxProvider>
</StrictMode>
```

## Routing
Didefinisikan di `src/router.tsx`. Semua path diambil dari `ROUTES` di `src/constants/routes.ts`.
Halaman dibungkus `RootLayout` (Navbar + Outlet + Footer).

| Konstanta | Path | Halaman |
|---|---|---|
| `ROUTES.HOME` | `/` | `src/pages/HomePage.tsx` |
| `ROUTES.PRODUCTS` | `/products` | `src/pages/ProductsPage.tsx` |
| (404) | `*` | `src/pages/NotFoundPage.tsx` |

Menambah halaman: tambah konstanta di `ROUTES` → buat file di `src/pages/` → daftarkan di `router.tsx`
→ tambahkan baris di tabel ini → tambahkan link Navbar bila perlu.

## Lapisan komponen
```
pages/          → menyusun section, set document.title
  └── sections/     → boleh memanggil query hook & useAppSelector
        └── layout/     → kerangka halaman
              └── ui/       → murni presentasional, data hanya lewat props
```
Lapisan bawah tidak boleh meng-import lapisan atas.

## Alur data

### Server state (React Query)
```
config/env.ts ─► lib/axios.ts ─► api/<domain>/service.ts ─► api/<domain>/queries.ts ─► section/page
                 (instance +      (fungsi request bertipe)    (useXxxQuery,
                  interceptor)                                  useXxxMutation)
```
- Query key memakai factory di `keys.ts`: `productKeys.all`, `.list(params)`, `.detail(id)`.
- Default `staleTime` dan `retry` diatur di `src/lib/queryClient.ts` dari `@/constants/queryConfig`.
- Setelah mutation sukses: `invalidateQueries({ queryKey: xxxKeys.all })`.

### Client state (Redux Toolkit)
```
komponen ─dispatch(action)─► slice reducer ─► store ─selector─► komponen
```
- Slice per domain di `src/store/slices/`. Selector diekspor dari file slice.
- Contoh yang ada: `uiSlice` (menu mobile terbuka/tertutup).

## Penanganan error
- Interceptor axios mengubah semua error menjadi `ApiError { status, message, details? }`.
  Pesan default sudah dalam Bahasa Indonesia, berdasarkan status HTTP.
- Komponen menampilkan `ErrorState` dengan `error.message` dan tombol "Coba lagi" (`refetch`).
- Status 401: interceptor menghapus token dari storage (redirect login ditambahkan bila ada fitur auth).

## Environment variable
| Variabel | Wajib | Keterangan |
|---|---|---|
| `VITE_API_URL` | Ya | Base URL REST API |
| `VITE_APP_ENV` | Tidak | `development` / `production` |
Didokumentasikan di `.env.example`, dibaca hanya lewat `src/config/env.ts`.

## Konvensi import
- Alias `@/` → `src/`.
- Urutan import: library eksternal → alias `@/` → relatif.

## Keputusan arsitektur (log)
| Tanggal | Keputusan | Alasan |
|---|---|---|
| 2026-10-02 | Tailwind tanpa library UI | Kontrol penuh atas design system |
| 2026-10-02 | React Query untuk server state, Redux Toolkit untuk client state | Pisahkan cache data API dari state UI; tanpa RTK Query agar tidak tumpang tindih |
| 2026-10-02 | Axios dengan satu instance + interceptor | Base URL, header, dan error handling terpusat |
| 2026-10-02 | Pemisahan utils (generik) vs helpers (per domain) vs constants | Mencegah duplikasi fungsi dan magic value |
