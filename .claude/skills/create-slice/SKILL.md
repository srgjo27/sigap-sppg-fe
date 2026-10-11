---
name: create-slice
description: Membuat Redux Toolkit slice untuk client state global (UI state, preferensi, keranjang, filter) beserta selector dan pendaftaran di store. Gunakan saat diminta membuat state global, slice Redux, atau state yang dipakai lintas halaman.
---
# Membuat Redux Slice

Contoh yang sudah berjalan: `src/store/slices/uiSlice.ts`. Template: `template.ts` di folder skill ini.

## 1. Pastikan memang perlu Redux
| Jenis state | Tempat |
|---|---|
| Data dari API | React Query (skill `create-api`), BUKAN Redux |
| Dipakai satu komponen | `useState` |
| Dipakai komponen induk-anak dekat | props / lifting state |
| Dipakai ≥2 halaman / bagian jauh | **Redux slice** ✅ |
Jika tidak masuk baris terakhir, jelaskan ke pengguna dan sarankan alternatifnya.

## 2. Buat slice
- File: `src/store/slices/<nama>Slice.ts` (camelCase).
- Definisikan `type <Nama>State` dan `initialState` bertipe.
- State harus serializable: tanpa `Date`, class, fungsi, Map/Set. Simpan tanggal sebagai ISO string.
- Reducer bernama kata kerja: `toggleMenu`, `addItem`, `setFilter`, `reset`.
- Ekspor: actions (named), selectors (named), reducer (default).
- Selector: `export const selectXxx = (state: RootState) => state.<nama>.xxx`.
- Nilai turunan (total, jumlah item) dibuat sebagai selector, bukan disimpan di state.

## 3. Daftarkan di store
Tambahkan reducer di `src/store/store.ts` pada objek `reducer`.

## 4. Persistensi (opsional)
Jika state perlu bertahan setelah reload (misal tema, keranjang), simpan ke localStorage
dengan key dari `STORAGE_KEYS` di `@/constants/config`. Tanyakan dulu ke pengguna sebelum menambah library persist.

## 5. Pemakaian
```tsx
const isOpen = useAppSelector(selectIsMenuOpen);
const dispatch = useAppDispatch();
dispatch(toggleMenu());
```

## 6. Verifikasi
`npm run lint`, `npm run build`.
