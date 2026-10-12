---
description: Memperbarui CLAUDE.md dan docs/ berdasarkan perubahan & keputusan terbaru
---
Tinjau perubahan di sesi ini (dan `git diff` / `git log -5` bila perlu), lalu perbarui konteks proyek:

1. `CLAUDE.md`: perintah, struktur folder, atau aturan baru yang kini berlaku.
2. `docs/design-system.md`: token, varian komponen, atau pola visual baru.
3. `docs/architecture.md`: route baru, alur data, environment variable, atau baris baru di log keputusan.
4. `CLAUDE.md` per folder (`src/api`, `src/store`, `src/lib`, `src/utils`, `src/constants`, `src/components`, `src/pages`):
   konvensi baru yang khusus folder tersebut.
5. `.env.example`: variabel environment baru (tanpa nilai rahasia).

Aturan:
- Hanya catat hal yang STABIL dan berlaku ke depan, bukan detail tugas harian.
- Jaga CLAUDE.md tetap ringkas (di bawah ±200 baris); detail pindahkan ke docs/.
- Tampilkan ringkasan perubahan yang diusulkan sebelum menulis ke file.
