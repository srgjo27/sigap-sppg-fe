# Design System

Sumber kebenaran untuk semua keputusan visual. Jika ada konflik antara kode dan dokumen ini,
ikuti dokumen ini lalu laporkan ketidaksesuaiannya.
<!-- GANTI nilai-nilai di bawah sesuai brand Anda -->

## 1. Prinsip
- **Bersih & lega**: utamakan whitespace, jangan memadatkan elemen.
- **Konsisten**: gunakan token, bukan nilai acak.
- **Mobile-first**: tulis class untuk mobile dulu, lalu `md:` dan `lg:`.
- **Aksesibel**: kontras minimal 4.5:1 untuk teks normal.

## 2. Warna (token Tailwind)
| Token | Hex | Penggunaan |
|---|---|---|
| `brand-700` | #0E6B4E | Tombol utama, link, tab aktif |
| `brand-800` | #0B5A41 | Teks badge “Aktif” |
| `brand-900` |	#094B37 | Hover link |
| `brand-500`	| #1F8A65 | Logo di sidebar, nomor tahap |
| `brand-50`	| #E3F1EB | Latar badge sukses, kartu terpilih |
| `focus` | #8CC9B1 | Cincin fokus keyboard |
| `disabled` | #8FA39A | Tombol nonaktif |
| `ink` | #14211C | Teks utama, chip terpilih |
| `ink-2` | #2F3B36 | Teks isi |
| `muted` | #4E5D57 | Teks keterangan |
| `muted-2` | #6B7A74 | Teks terkunci/disabled |
| `line` | #D9E0DC | Border kartu |
| `line-input` | #C5CFCA | Border input & tombol sekunder |
| `line-soft` | #E1E7E4, #E6EBE8, #EEF1EF | Pemisah baris tabel |
| `surface` | #FFFFFF | Kartu, input |
| `canvas` | #F3F5F4 | Latar halaman, field read-only |
| `side-bg` | #10261E | Latar sidebar, panel kiri login desktop |
| `side-active` | #23463A | Item menu aktif, garis pemisah |
| `side-line` | #2E5446 | Garis penghubung tahap |
| `side-text` |	#DCE6E1 | Teks menu |
| `side-muted` | #A9BCB3 | Teks sekunder |
| `side-label` | #8FA79C | Label grup (“Operasional”) |
| `side-link` | #BFE3D3 | Link “Keluar” |

Aturan: maksimal satu tombol `brand` per section;

### Konfigurasi Tailwind v4 (`src/index.css`)
Token didefinisikan di blok `@theme`; Tailwind otomatis membuat class `bg-brand-700`, `text-muted`, dll.
```css
@import "tailwindcss";

@theme {
  --color-brand-50: #E3F1EB;
  --color-brand-500: #1F8A65;
  --color-brand-700: #0E6B4E;
  --color-brand-800: #0B5A41;
  --color-brand-900: #094B37;
  --color-focus: #8CC9B1;
  --color-disabled: #8FA39A;
  --color-ink: #14211C;
  --color-ink-2: #2F3B36;
  --color-muted: #4E5D57;
  --color-muted-2: #6B7A74;
  --color-line: #D9E0DC;
  --color-line-input: #C5CFCA;
  --color-line-soft: #E1E7E4;
  --color-line-soft-2: #E6EBE8;
  --color-line-soft-3: #EEF1EF;
  --color-surface: #FFFFFF;
  --color-canvas: #F3F5F4;
  --color-side-bg: #10261E;
  --color-side-active: #23463A;
  --color-side-line: #2E5446;
  --color-side-text: #DCE6E1;
  --color-side-muted: #A9BCB3;
  --color-side-label: #8FA79C;
  --color-side-link: #BFE3D3;
  --font-sans: "Plus Jakarta Sans", system-ui, sans-serif;
}
```
Mengubah warna brand cukup di blok ini, lalu perbarui tabel di atas.

## 3. Tipografi
Font: **Plus Jakarta Sans** (Google Fonts), bobot 400, 500, 600, 700.

| Peran | Class |
|---|---|
| Display (hero) | `text-4xl md:text-6xl font-bold tracking-tight` |
| H1 | `text-3xl md:text-5xl font-bold tracking-tight` |
| H2 (judul section) | `text-2xl md:text-4xl font-semibold` |
| H3 (judul kartu) | `text-xl font-semibold` |
| Body | `text-base leading-relaxed text-ink` |
| Body kecil | `text-sm text-muted` |
| Eyebrow (label di atas judul) | `text-sm font-semibold uppercase tracking-wider text-ink` |

Panjang baris teks paragraf: `max-w-prose`.

## 4. Spacing & layout
- Skala spacing: kelipatan 4 (Tailwind default). Hindari nilai arbitrary `p-[13px]`.
- Container: `mx-auto max-w-6xl px-4 md:px-6`
- Jarak vertikal section: `py-16 md:py-24`
- Jarak judul section ke konten: `mb-10 md:mb-12`
- Grid kartu: `grid gap-6 sm:grid-cols-2 lg:grid-cols-3`
- Breakpoint: `sm` 640, `md` 768, `lg` 1024, `xl` 1280.

## 5. Radius, border, shadow
| Elemen | Class |
|---|---|
| Tombol, input | `rounded-lg` |
| Kartu | `rounded-2xl border border-line` |
| Badge | `rounded-full` |
| Shadow kartu | `shadow-sm`, hover `shadow-md` |
Hindari shadow tebal (`shadow-2xl`) kecuali modal.

## 6. Komponen dasar

### Button
| Varian | Class |
|---|---|
| primary | `bg-brand-700 text-white hover:bg-brand-900` |
| secondary | `bg-surface text-ink border border-line hover:bg-canvas` |
| ghost | `text-brand-700 hover:bg-brand-50` |
| danger | `bg-danger text-white hover:opacity-90` |

Ukuran: `sm` = `h-9 px-3 text-sm`, `md` = `h-11 px-5`, `lg` = `h-12 px-6 text-lg`.
Dasar: `inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-800 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none`

### Card
`rounded-2xl border border-line bg-surface p-6 shadow-sm transition hover:shadow-md`

### Input
`h-11 w-full rounded-lg border border-line bg-surface px-3 text-ink placeholder:text-muted focus:border-brand-800 focus:outline-none focus:ring-2 focus:ring-line-input`
Label selalu terlihat di atas input (`text-sm font-medium mb-1.5`). Pesan error `text-sm text-danger mt-1`.

### Badge
`inline-flex items-center rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-800`

## 7. Pola section
Setiap section mengikuti urutan: Eyebrow (opsional) → H2 → deskripsi singkat (`text-muted max-w-2xl`) → konten.
Latar section bergantian `bg-canvas` dan `bg-surface` agar ada ritme visual.

## 8. Ikon & gambar
- Ikon: `lucide-react`, ukuran `size-5` (inline) atau `size-6` (fitur). Warna mengikuti teks.
- Gambar: format WebP, `loading="lazy"` kecuali gambar hero, selalu ada `alt` yang deskriptif.
- Rasio gambar kartu: `aspect-video` atau `aspect-square`, `object-cover`.

## 9. Interaksi & animasi
- Transisi: `transition-colors` atau `transition` dengan durasi default (150ms).
- Hindari animasi berlebihan; hormati `motion-reduce:transition-none`.
- Semua elemen interaktif punya status `hover`, `focus-visible`, dan `disabled`.

## 10. Status data (loading, error, kosong)
Setiap komponen yang menampilkan data dari API WAJIB menangani ketiga status ini dengan komponen standar
dari `src/components/ui/`:

| Status | Komponen | Aturan |
|---|---|---|
| Loading | `Skeleton` | `animate-pulse rounded-lg bg-line`; bentuknya meniru konten asli (kartu, baris teks). Jangan spinner di tengah layar untuk konten halaman. |
| Error | `ErrorState` | Ikon, judul, pesan `error.message`, tombol secondary "Coba lagi" yang memanggil `refetch`. Pakai `role="alert"`. |
| Kosong | `EmptyState` | Ikon `text-muted`, judul singkat, deskripsi, CTA opsional. |

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
