import type { UserRole } from '@/api/auth/types';
import { formatNumber } from '@/utils/format';

/** Texts of the Users ("Pengguna") page. */
export const USERS_PAGE = {
  title: 'Pengguna',
  description: (kitchenName?: string) =>
    `Akun pegawai, relawan, dan PIC sekolah di ${kitchenName ?? 'dapur ini'}.`,
  addUser: 'Tambah pengguna',
  searchLabel: 'Cari pengguna',
  searchPlaceholder: 'Cari nama atau email',
  filterLabel: 'Filter peran',
  allRoles: 'Semua',
  tableCaption: 'Daftar pengguna',
  columns: {
    user: 'Pengguna',
    role: 'Peran',
    placement: 'Penempatan',
    status: 'Status',
    lastLogin: 'Login terakhir',
    actions: 'Aksi',
  },
  edit: 'Ubah',
  status: {
    active: 'Aktif',
    inactive: 'Nonaktif',
  },
  neverLoggedIn: 'Belum pernah',
  noPlacement: '—',
  footnote: (shown: number, total: number) =>
    `Menampilkan ${formatNumber(shown)} dari ${formatNumber(total)} pengguna. Akun tidak bisa dihapus, hanya dinonaktifkan, agar riwayat checklist dan log tetap utuh.`,
  pagination: {
    label: 'Navigasi halaman',
    prev: 'Sebelumnya',
    next: 'Berikutnya',
    page: (page: number, totalPages: number) =>
      `Halaman ${formatNumber(page)} dari ${formatNumber(totalPages)}`,
  },
  error: {
    title: 'Gagal memuat pengguna',
    retry: 'Coba lagi',
  },
  empty: {
    title: 'Pengguna tidak ditemukan',
    description: 'Coba kata kunci atau filter peran lain.',
    reset: 'Reset filter',
  },
  comingSoon: 'Segera hadir',
} as const;

/** Role filter chips, in design order (after "Semua"). */
export const USER_ROLE_FILTERS: UserRole[] = [
  'kepala_sppg',
  'ahli_gizi',
  'akuntan',
  'petugas_dapur',
  'petugas_distribusi',
  'pic_sekolah',
];
