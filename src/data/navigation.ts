import type { UserRole } from '@/api/auth/types';
import type { ROUTES } from '@/constants/routes';

export type NavRouteKey = keyof typeof ROUTES;

export type NavItem = {
  /** Key of `ROUTES`; the path and icon are resolved from it in `AppSidebar`. */
  key: NavRouteKey;
  label: string;
};

export type NavGroup = {
  label: string;
  items: NavItem[];
};

/** Menu groups of the app sidebar, in display order. */
export const NAV_GROUPS: NavGroup[] = [
  {
    label: 'Operasional',
    items: [
      { key: 'HOME', label: 'Beranda' },
      { key: 'MENU', label: 'Menu & gizi' },
      { key: 'PROCUREMENT', label: 'Pengadaan' },
      { key: 'PRODUCTION', label: 'Produksi & SOP' },
      { key: 'DISTRIBUTION', label: 'Distribusi' },
      { key: 'COMPLAINTS', label: 'Pengaduan' },
    ],
  },
  {
    label: 'Administrasi',
    items: [
      { key: 'USERS', label: 'Pengguna' },
      { key: 'ACTIVITY_LOG', label: 'Log aktivitas' },
    ],
  },
];

/** Fixed texts of the app sidebar. */
export const SIDEBAR_TEXT = {
  navLabel: 'Navigasi utama',
  logout: 'Keluar',
  loggingOut: 'Keluar...',
} as const;

/** Human-readable label per user role. */
export const ROLE_LABELS: Record<UserRole, string> = {
  admin: 'Admin',
  kepala_sppg: 'Kepala SPPG',
  ahli_gizi: 'Ahli Gizi',
  akuntan: 'Akuntan',
  petugas_dapur: 'Petugas Dapur',
  petugas_distribusi: 'Petugas Distribusi',
  pic_sekolah: 'PIC Sekolah',
  pengawas: 'Pengawas',
};
