/** Roles listed in the login page description copy. */
export type UserRole = 'admin'|'kepala_sppg'|'ahli_gizi'|'akuntan'|'petugas_dapur'|'petugas_distribusi'|'pic_sekolah'|'pengawas';

export type AuthUser = {
  id: string;
  nama: string;
  role: UserRole;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResponse = {
  access_token: string;
  refresh_token:string;
  expires_in: number;
  wajib_ganti_password: boolean;
  user: AuthUser;
};
