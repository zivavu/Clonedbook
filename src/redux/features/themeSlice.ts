import { PaletteMode } from '@mui/material';
import { createSlice } from '@reduxjs/toolkit';

const getInitialTheme = () => {
  return {
    mode: 'dark' as PaletteMode,
  };
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState: getInitialTheme(),
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
    },
    setTheme: (state, action) => {
      state.mode = action.payload;
    },
  },
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
