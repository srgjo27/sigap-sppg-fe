# Aturan Khusus: src/store/ (Redux Toolkit)

Berlaku saat bekerja di folder ini (melengkapi CLAUDE.md di root). Untuk langkah lengkap: skill `create-slice`.

## Isi folder
- `store.ts`  → `configureStore`, ekspor `store`, `RootState`, `AppDispatch`.
- `hooks.ts`  → `useAppDispatch`, `useAppSelector` (sudah bertipe). Komponen WAJIB memakai ini.
- `slices/`   → satu slice per domain: `<nama>Slice.ts`.

## Kapan memakai Redux
HANYA untuk client state global yang dipakai ≥2 halaman/bagian jauh (UI, tema, keranjang, filter).
Data dari API → React Query di `src/api/`. Tidak ada RTK Query, tidak ada `createAsyncThunk` untuk fetch API.

## Konvensi slice
- `type XxxState` + `initialState` bertipe.
- State serializable: tanpa Date, class, fungsi, Map/Set (tanggal sebagai ISO string).
- Nama reducer kata kerja: `toggleMenu`, `addItem`, `setFilter`, `reset`.
- Ekspor: actions & selectors (named), reducer (default).
- Selector di file slice: `export const selectXxx = (state: RootState) => state.nama.xxx`.
- Nilai turunan dihitung di selector, tidak disimpan di state.
- Slice baru wajib didaftarkan di `reducer` pada `store.ts`.

## Persistensi
Simpan ke localStorage hanya bila diminta, dengan key dari `STORAGE_KEYS` (`@/constants/config`).
