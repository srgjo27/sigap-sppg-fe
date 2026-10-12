---
description: Review desain dan aksesibilitas pada file atau folder UI
argument-hint: [path file/folder; kosongkan untuk file yang baru berubah]
---
Lakukan review UI untuk: $ARGUMENTS
(Jika kosong, review file UI yang berubah menurut `git diff --name-only`.)

Jalankan dua subagent secara paralel:
1. `ui-reviewer`: kesesuaian design system, responsivitas, kualitas komponen.
2. `a11y-checker`: aksesibilitas WCAG 2.1 AA.

Jika file yang direview juga menyentuh data layer (api/, store/, utils/), sarankan menjalankan `/review-code`.

Gabungkan hasilnya menjadi satu laporan, urutkan dari temuan paling kritis.
JANGAN mengedit file. Akhiri dengan pertanyaan: temuan mana yang ingin diperbaiki.
