import { PaletteMode } from '@mui/material';
import { createSlice } from '@reduxjs/toolkit';

const getInitialTheme = () => {
  return { mode: 'light' as PaletteMode };
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState: getInitialTheme(),
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', state.mode);
    },
    validateTheme: (state) => {
      const storage = localStorage.getItem('theme');
      if (storage === 'light' || storage === 'dark') {
        state.mode = storage;
      }
    },
  },
});

export const { toggleTheme, validateTheme } = themeSlice.actions;

export default themeSlice.reducer;
