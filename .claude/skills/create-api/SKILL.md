---
name: create-api
description: Menghubungkan endpoint REST API ke frontend - membuat types, service axios, query key factory, React Query hook (query & mutation), dan helpers untuk satu domain. Gunakan saat diminta mengambil/mengirim data ke API, integrasi endpoint, atau membuat hook data seperti useProductsQuery.
---
# Membuat Modul API per Domain

Contoh lengkap yang sudah berjalan ada di `src/api/products/`. Template ada di folder `templates/` skill ini.

## Struktur hasil
```
src/api/<domain>/          (domain: jamak, kebab/camel, misal products, orders, blogPosts)
├── types.ts       → tipe respons & payload
├── keys.ts        → query key factory
├── service.ts     → fungsi request axios (async, return data bertipe)
├── queries.ts     → useXxxQuery (GET)
├── mutations.ts   → useCreateXxxMutation, useUpdateXxxMutation, useDeleteXxxMutation
└── helpers.ts     → (opsional) transformasi khusus domain ini
```

## Langkah
1. **Kumpulkan info endpoint**: method, path, query params, bentuk respons, payload.
   Jika bentuk respons tidak diketahui, tanyakan ke pengguna atau buat tipe minimal lalu tandai `// TODO: sesuaikan dengan API`.
2. **types.ts**: definisikan tipe dari respons API. Pisahkan tipe DTO (dari server) dan model UI jika bentuknya berbeda.
3. **keys.ts**: factory key, selalu diawali nama domain:
   `all → ['products']`, `list(params) → ['products','list',params]`, `detail(id) → ['products','detail',id]`.
4. **service.ts**:
   - Path endpoint sebagai konstanta di atas file (`const ENDPOINT = '/products'`).
   - Pakai `api` dari `@/lib/axios`, return `data` (bukan response axios).
   - Tanpa try/catch: interceptor sudah mengubah error menjadi `ApiError`.
5. **queries.ts**: `useQuery({ queryKey, queryFn })`. Untuk detail, pakai `enabled: Boolean(id)`.
6. **mutations.ts**: `useMutation`, lalu `onSuccess` → `queryClient.invalidateQueries({ queryKey: xxxKeys.all })`.
7. **helpers.ts**: hanya jika ada transformasi khusus domain (mapping, kalkulasi). Fungsi generik → `src/utils/`.
8. **Env**: jika butuh base URL lain, tambahkan di `src/config/env.ts` dan `.env.example`.
9. **Verifikasi**: `npm run lint`, `npm run build`.

## Pemakaian di komponen (sertakan dalam laporan)
```tsx
const { data, isPending, isError, error, refetch } = useProductsQuery({ page: 1 });
if (isPending) return <Skeleton className="h-40" />;
if (isError) return <ErrorState message={error.message} onRetry={refetch} />;
if (data.length === 0) return <EmptyState title="Belum ada produk" />;
```

## Larangan
- Menyimpan hasil query ke Redux.
- Import `axios` langsung, atau menulis URL lengkap (base URL sudah dari env).
- Query key ditulis manual di komponen.
