// TEMPLATE: salinan src/store/slices/uiSlice.ts. Ganti "ui"/"Ui" dengan nama slice baru.
import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '../store';

type UiState = {
  isMobileMenuOpen: boolean;
};

const initialState: UiState = {
  isMobileMenuOpen: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleMobileMenu(state) {
      state.isMobileMenuOpen = !state.isMobileMenuOpen;
    },
    closeMobileMenu(state) {
      state.isMobileMenuOpen = false;
    },
  },
});

export const { toggleMobileMenu, closeMobileMenu } = uiSlice.actions;

export const selectIsMobileMenuOpen = (state: RootState) => state.ui.isMobileMenuOpen;

export default uiSlice.reducer;
