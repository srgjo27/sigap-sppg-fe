/** Content of the desktop left panel on the login page. */
export const LOGIN_INTRO: {
  tagline: string;
  steps: { title: string; description?: string }[];
  footnote: string;
} = {
  tagline: 'Setiap porsi tercatat, dari bahan sampai sekolah.',
  steps: [
    { title: 'Bahan diterima', description: 'Jumlah, suhu, dan foto dicek saat datang' },
    {
      title: 'Dimasak sesuai SOP',
      description: 'Batch baru bisa dikirim setelah checklist lengkap',
    },
    { title: 'Dikirim tepat waktu', description: 'Scan QR saat berangkat dan tiba' },
    { title: 'Dikonfirmasi sekolah', description: 'Pengaduan langsung tertaut ke batch asalnya' },
  ],
  footnote: 'Hanya untuk pengguna terdaftar. Setiap percobaan masuk dicatat di log aktivitas.',
};

/** Texts of the login form (LoginForm). */
export const LOGIN_FORM = {
  title: 'Masuk',
  descriptionDesktop:
    'Untuk kepala SPPG, ahli gizi, akuntan, admin, dan pengawas. Gunakan akun yang sudah dibuatkan untuk Anda.',
  descriptionMobile: 'Pakai email dan password yang diberikan kepala SPPG atau admin.',
  emailLabel: 'Email',
  emailPlaceholder: 'nama@sigap-sppg.local',
  passwordLabel: 'Password',
  submit: 'Masuk',
  submitting: 'Memproses...',
  errorTitle: 'Gagal masuk',
  validation: {
    emailRequired: 'Email wajib diisi.',
    emailInvalid: 'Format email tidak valid.',
    passwordRequired: 'Password wajib diisi.',
  },
} as const;

/** "Lupa password?" note below the login form (ForgotPasswordInfo). Not a link: no self-service reset. */
export const LOGIN_FORGOT = {
  title: 'Lupa password?',
  text: 'Minta kepala SPPG atau admin untuk me-reset. Anda akan diminta membuat password baru saat masuk.',
} as const;
