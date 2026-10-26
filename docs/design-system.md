# Design System

Sumber kebenaran untuk semua keputusan visual. Jika ada konflik antara kode dan dokumen ini,
ikuti dokumen ini lalu laporkan ketidaksesuaiannya.
Referensi desain: `design/screens/` (01-login-dekstop, 02-login-mobile).

## 1. Prinsip

- **Bersih & lega**: utamakan whitespace, jangan memadatkan elemen.
- **Flat**: pemisahan elemen memakai border dan warna latar, bukan shadow.
- **Konsisten**: gunakan token, bukan nilai acak.
- **Mobile-first**: tulis class untuk mobile dulu, lalu `md:` dan `lg:`.
- **Aksesibel**: kontras minimal 4.5:1 untuk teks normal.

## 2. Warna (token Tailwind)

| Token         | Hex     | Penggunaan                                              |
| ------------- | ------- | ------------------------------------------------------- |
| `brand-50`    | #E3F1EB | Latar badge sukses, kartu terpilih, hover tombol ghost  |
| `brand-500`   | #1F8A65 | Logo di latar gelap (sidebar, panel login), nomor tahap |
| `brand-700`   | #0E6B4E | Tombol utama, link, tab aktif, logo di latar terang     |
| `brand-800`   | #0B5A41 | Teks badge “Aktif”                                      |
| `brand-900`   | #094B37 | Hover tombol utama & link                               |
| `focus`       | #8CC9B1 | Cincin fokus input (tombol: `brand-700`, kontras ≥3:1)  |
| `disabled`    | #8FA39A | Latar tombol nonaktif                                   |
| `danger`      | #A1271B | Tombol hapus, pesan error, border input error           |
| `danger-50`   | #FDECEA | Latar badge “Terkunci”                                  |
| `danger-800`  | #8C1D13 | Teks & titik badge “Terkunci”                           |
| `warning-50`  | #FFF4DB | Latar badge “Belum ganti password”                      |
| `warning-800` | #6E4700 | Teks & titik badge “Belum ganti password”               |
| `neutral-50`  | #ECEFED | Latar badge “Nonaktif”                                  |
| `neutral-800` | #47534E | Teks & titik badge “Nonaktif”                           |
| `ink`         | #14211C | Teks utama, judul, label, chip terpilih                 |
| `ink-2`       | #2F3B36 | Teks isi panjang                                        |
| `muted`       | #4E5D57 | Teks keterangan & deskripsi                             |
| `muted-2`     | #6B7A74 | Placeholder, teks terkunci/disabled                     |
| `line`        | #D9E0DC | Border kartu                                            |
| `line-input`  | #C5CFCA | Border input & tombol sekunder                          |
| `line-soft`   | #E1E7E4 | Pemisah baris tabel                                     |
| `line-soft-2` | #E6EBE8 | Garis pemisah konten (mis. di atas “Lupa password?”)    |
| `line-soft-3` | #EEF1EF | Pemisah paling halus, latar baris zebra                 |
| `surface`     | #FFFFFF | Kartu, input                                            |
| `canvas`      | #F3F5F4 | Latar halaman, field read-only                          |
| `avatar`      | #E8EEEB | Latar avatar inisial (teks `ink-2`)                     |
| `side-bg`     | #10261E | Latar sidebar, panel kiri login desktop                 |
| `side-active` | #23463A | Item menu aktif, garis pemisah di sidebar               |
| `side-line`   | #2E5446 | Garis penghubung tahap                                  |
| `side-text`   | #DCE6E1 | Teks menu                                               |
| `side-muted`  | #A9BCB3 | Teks sekunder di latar gelap                            |
| `side-label`  | #8FA79C | Label grup (“Operasional”)                              |
| `side-link`   | #BFE3D3 | Link “Keluar”                                           |

Aturan:

- Maksimal satu tombol `brand` (primary) per section atau form.
- Logo memakai `brand-500` di latar gelap (`side-bg`) dan `brand-700` di latar terang (`canvas`/`surface`).
- Teks di latar `side-bg` hanya memakai token `side-*` atau `text-white`.

### Konfigurasi Tailwind v4 (`src/index.css`)

Token didefinisikan di blok `@theme`; Tailwind otomatis membuat class `bg-brand-700`, `text-muted`, dll.

```css
@import 'tailwindcss';

@theme {
  --color-brand-50: #e3f1eb;
  --color-brand-500: #1f8a65;
  --color-brand-700: #0e6b4e;
  --color-brand-800: #0b5a41;
  --color-brand-900: #094b37;
  --color-focus: #8cc9b1;
  --color-disabled: #8fa39a;
  --color-danger: #a1271b;
  --color-danger-50: #fdecea;
  --color-danger-800: #8c1d13;
  --color-warning-50: #fff4db;
  --color-warning-800: #6e4700;
  --color-neutral-50: #ecefed;
  --color-neutral-800: #47534e;
  --color-ink: #14211c;
  --color-ink-2: #2f3b36;
  --color-muted: #4e5d57;
  --color-muted-2: #6b7a74;
  --color-line: #d9e0dc;
  --color-line-input: #c5cfca;
  --color-line-soft: #e1e7e4;
  --color-line-soft-2: #e6ebe8;
  --color-line-soft-3: #eef1ef;
  --color-surface: #ffffff;
  --color-canvas: #f3f5f4;
  --color-avatar: #e8eeeb;
  --color-side-bg: #10261e;
  --color-side-active: #23463a;
  --color-side-line: #2e5446;
  --color-side-text: #dce6e1;
  --color-side-muted: #a9bcb3;
  --color-side-label: #8fa79c;
  --color-side-link: #bfe3d3;
  --font-sans: 'Plus Jakarta Sans', system-ui, sans-serif;
}
```

Mengubah warna cukup di blok ini, lalu perbarui tabel di atas.

## 3. Tipografi

Font: **Plus Jakarta Sans** (Google Fonts), bobot 400, 500, 600, 700.

| Peran                         | Class                                                                                                                              |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Tagline panel (login kiri)    | `max-w-xl text-4xl xl:text-5xl font-bold tracking-tight text-white` (hanya `lg+`)                                                  |
| H1 (judul halaman, “Masuk”)   | `text-3xl md:text-4xl font-bold tracking-tight text-ink`                                                                           |
| H2 (judul bagian)             | `text-xl md:text-2xl font-semibold text-ink`                                                                                       |
| H3 (judul kartu, judul tahap) | `text-base font-semibold text-ink`                                                                                                 |
| Body                          | `text-base leading-relaxed text-ink-2`                                                                                             |
| Deskripsi / keterangan        | `text-sm md:text-base leading-relaxed text-muted`                                                                                  |
| Label form                    | `text-sm font-medium text-ink`                                                                                                     |
| Teks kecil (catatan kaki)     | `text-xs text-muted` (latar gelap: `text-side-muted`)                                                                              |
| Nama aplikasi (logo)          | `text-lg font-bold` (`sm`/sidebar: `text-base`); subjudul `text-sm` (`sm`: `text-xs`). Latar gelap `text-white`, terang `text-ink` |

Panjang baris teks paragraf: `max-w-prose`.

## 4. Spacing & layout

- Skala spacing: kelipatan 4 (Tailwind default). Hindari nilai arbitrary `p-[13px]`.
- Padding halaman: `px-6` (mobile), `lg:px-14` (panel login desktop).
- Lebar form/konten sempit: `w-full max-w-md`.
- Jarak antar-field form: `space-y-5`. Label ke input: `mb-2`.
- Jarak judul ke deskripsi: `mt-2`; deskripsi ke form: `mt-8`.
- Breakpoint: `sm` 640, `md` 768, `lg` 1024, `xl` 1280.

## 5. Radius, border, shadow

| Elemen             | Class                                            |
| ------------------ | ------------------------------------------------ |
| Tombol, input      | `rounded-lg`                                     |
| Logo (kotak ikon)  | `size-10 rounded-lg` (login), `size-8` (sidebar) |
| Kartu              | `rounded-2xl border border-line`                 |
| Badge, nomor tahap | `rounded-full`                                   |
| Garis pemisah      | `h-0.5 bg-line-soft-2` (2px)                     |

Desain bersifat flat: kartu dan input tidak memakai shadow. `shadow-lg` hanya untuk modal/dropdown.

## 6. Komponen dasar

### Button

| Varian                                       | Class                                                                |
| -------------------------------------------- | -------------------------------------------------------------------- |
| primary                                      | `bg-brand-700 text-white hover:bg-brand-900`                         |
| secondary                                    | `bg-surface text-ink border border-line-input hover:bg-canvas`       |
| ghost                                        | `text-brand-700 hover:bg-brand-50`                                   |
| link (aksi di dalam input, mis. “Tampilkan”) | `h-8 px-1 text-sm font-semibold text-brand-700 hover:text-brand-900` |
| danger                                       | `bg-danger text-white hover:opacity-90`                              |

Ukuran: `sm` = `h-9 px-3 text-sm`, `md` = `h-12 px-5`, `lg` = `h-14 px-6 text-lg`. Tombol submit form memakai `md` + `w-full`.
Dasar: `inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700 focus-visible:ring-offset-2 disabled:bg-disabled disabled:text-white disabled:pointer-events-none`

### Card

`rounded-2xl border border-line bg-surface p-6`

### Input

`h-12 w-full rounded-lg border border-line-input bg-surface px-4 text-ink placeholder:text-muted-2 focus:border-brand-700 focus:outline-none focus:ring-2 focus:ring-focus`

- Label selalu terlihat di atas input (`mb-2 block text-sm font-medium text-ink`).
- Status error: `border-danger` + pesan `mt-1 text-sm text-danger`, hubungkan dengan `aria-describedby`.
- Aksi di dalam input (mis. “Tampilkan” pada password): tombol varian link di sisi kanan, input diberi `pr-28`.
- Ikon di dalam input (mis. pencarian): prop `startAdornment`, ikon lucide `size-4` warna `muted` di `pl-4`, input diberi `pl-11`; ikon dekoratif (`aria-hidden`, tidak menerima klik).

### Badge

Dasar: `inline-flex h-6 items-center gap-1.5 rounded-full px-2.5 text-sm font-semibold whitespace-nowrap`, titik `size-1.5 shrink-0 rounded-full bg-current` (`aria-hidden`; bisa dimatikan dengan `dot={false}`).

| Varian  | Class                            | Contoh               |
| ------- | -------------------------------- | -------------------- |
| success | `bg-brand-50 text-brand-800`     | Aktif                |
| warning | `bg-warning-50 text-warning-800` | Belum ganti password |
| danger  | `bg-danger-50 text-danger-800`   | Terkunci s.d. 19.52  |
| neutral | `bg-neutral-50 text-neutral-800` | Nonaktif             |

### Avatar

Lingkaran inisial 36px: `size-9 rounded-full text-sm font-semibold`, inisial dari `getInitials(name)` (`@/utils/string`). Tone `light` (tabel): `bg-avatar text-ink-2`; tone `dark` (kartu user di sidebar): `bg-side-active text-white`. Default dekoratif (`aria-hidden`) karena nama lengkap tampil di sebelahnya.

### Alert

Pesan di level form (mis. gagal masuk). Tidak ada di `design/screens`; diturunkan dari token.
Dasar: `flex gap-3 rounded-lg border p-4 text-sm`, ikon lucide `size-5`, judul opsional `font-semibold`, isi `text-ink-2`.

| Varian  | Class                                                  | Ikon                           | Role     |
| ------- | ------------------------------------------------------ | ------------------------------ | -------- |
| danger  | `border-danger bg-surface`, judul `text-danger`        | `CircleAlert` `text-danger`    | `alert`  |
| success | `border-brand-500 bg-brand-50`, judul `text-brand-800` | `CircleCheck` `text-brand-700` | `status` |
| info    | `border-line-input bg-surface`, judul `text-ink`       | `Info` `text-muted`            | `status` |

### Langkah (stepper vertikal)

- Nomor: `flex size-8 items-center justify-center rounded-full bg-brand-500 text-sm font-semibold text-white`
- Garis penghubung: `w-0.5 bg-side-line` (2px) di tengah kolom nomor; kolom teks `pb-4` kecuali tahap terakhir, garis `min-h-7` (nomor ke nomor 60px). Teks berjarak `gap-4` dari nomor.
- Judul `text-base font-semibold text-white`, deskripsi `text-sm text-side-muted`.

## 7. Pola layout

### Halaman autentikasi (login)

- Mobile: satu kolom di atas `bg-canvas`; logo di atas, form di tengah, info “Lupa password?” di bawah dipisah garis `line-soft-2`.
- Desktop (`lg:`): grid dua kolom sama lebar (`lg:grid-cols-2`).
  - Kiri: `bg-side-bg`, berisi logo, tagline, stepper alur MBG, dan catatan kaki.
  - Kanan: `bg-canvas`, form di tengah (`max-w-md`).

### Halaman aplikasi (setelah login)

- Kerangka: `AppLayout` (`src/components/layout/AppLayout.tsx`). Sidebar `w-60` sticky setinggi layar; konten `px-10 pt-10` di desktop tanpa batas lebar (tabel penuh). Isi sidebar lewat slot dari section `AppSidebar`.
- Sidebar `bg-side-bg` dengan item menu `text-side-text`, item aktif `bg-side-active`, label grup `text-side-label`.
- Area konten di `bg-canvas`, isi dikelompokkan dalam Card.

## 8. Ikon & gambar

- Ikon: `lucide-react`, ukuran `size-5` (inline) atau `size-6` (fitur). Warna mengikuti teks. Pengecualian: ikon menu sidebar `size-4` (diukur 14px di desain).
- Gambar: format WebP, `loading="lazy"` kecuali gambar di atas lipatan, selalu ada `alt` yang deskriptif.
- Rasio gambar kartu: `aspect-video` atau `aspect-square`, `object-cover`.

## 9. Interaksi & animasi

- Transisi: `transition-colors` atau `transition` dengan durasi default (150ms).
- Hindari animasi berlebihan; hormati `motion-reduce:transition-none`.
- Semua elemen interaktif punya status `hover`, `focus-visible`, dan `disabled`.

## 10. Status data (loading, error, kosong)

Setiap komponen yang menampilkan data dari API WAJIB menangani ketiga status ini dengan komponen standar
dari `src/components/ui/`:

| Status  | Komponen     | Aturan                                                                                                                                                                                                                                                                          |
| ------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Loading | `Skeleton`   | `animate-pulse rounded-lg bg-line`; bentuknya meniru konten asli (kartu, baris teks). Jangan spinner di tengah layar untuk konten halaman.                                                                                                                                      |
| Error   | `ErrorState` | Ikon, judul, pesan `error.message`, tombol secondary "Coba lagi" yang memanggil `refetch`. Pakai `role="alert"`.                                                                                                                                                                |
| Kosong  | `EmptyState` | Tanpa kartu/border sendiri (`px-6 py-12 text-center`). Ikon `size-6` di lingkaran `size-12 bg-canvas text-muted`, judul `text-base font-semibold text-ink` (`<p>`; `titleAs` `h2`/`h3` untuk level halaman), deskripsi `mt-1 max-w-sm text-sm text-muted`, CTA opsional `mt-6`. |

Pola pemakaian:

```tsx
if (isPending) return <ProductGridSkeleton />;
if (isError) return <ErrorState message={error.message} onRetry={refetch} />;
if (data.length === 0) return <EmptyState title="Belum ada produk" />;
```

Tombol submit pada mutation: nonaktifkan (`disabled`) dan ganti label ("Menyimpan...") selama `isPending`.

## 11. Format angka & tanggal

Selalu lewat `src/utils/format.ts` agar seragam:

- Mata uang: `formatCurrency(150000)` → "Rp 150.000"
- Tanggal: `formatDate(date)` → "2 Oktober 2026"
- Angka: `formatNumber(12500)` → "12.500"

## 12. Larangan

- Nilai hex langsung di className (`text-[#2563EB]`).
- Lebih dari 2 font family.
- Gradien warna-warni ungu-biru generik tanpa alasan brand.
- Teks abu-abu di atas latar abu-abu (kontras rendah).
- Shadow pada kartu/input (desain flat).
