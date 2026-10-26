import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    // Daftarkan slice baru di sini (lihat skill create-slice)
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
