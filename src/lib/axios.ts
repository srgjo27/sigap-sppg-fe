// SATU-SATUNYA file yang boleh import axios. Lihat src/lib/CLAUDE.md.
import axios, { AxiosError } from 'axios';

import { env } from '@/config/env';
import { REQUEST_TIMEOUT_MS, STORAGE_KEYS } from '@/constants/config';

/** Bentuk error yang diterima semua pemanggil API (service, React Query, komponen). */
export type ApiError = {
  status: number;
  message: string;
  details?: unknown;
};

export function isApiError(error: unknown): error is ApiError {
  return typeof error === 'object' && error !== null && 'status' in error && 'message' in error;
}

function getErrorMessage(status: number): string {
  if (status === 0) return 'Tidak dapat terhubung ke server. Periksa koneksi internet Anda.';
  if (status === 400) return 'Permintaan tidak valid. Periksa kembali data yang dikirim.';
  if (status === 401) return 'Sesi Anda berakhir. Silakan masuk kembali.';
  if (status === 403) return 'Anda tidak memiliki akses ke data ini.';
  if (status === 404) return 'Data tidak ditemukan.';
  if (status === 422) return 'Data yang dikirim belum lengkap atau tidak sesuai.';
  if (status >= 500) return 'Terjadi gangguan pada server. Coba lagi beberapa saat lagi.';
  return 'Terjadi kesalahan. Coba lagi nanti.';
}

export const api = axios.create({
  baseURL: env.API_URL,
  timeout: REQUEST_TIMEOUT_MS,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string }>) => {
    const status = error.response?.status ?? 0;

    if (status === 401) {
      localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    }

    const apiError: ApiError = {
      status,
      message: error.response?.data?.message ?? getErrorMessage(status),
      details: error.response?.data,
    };
    return Promise.reject(apiError);
  },
);
