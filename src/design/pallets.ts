import { PaletteOptions } from '@mui/material';

export const lightPalette: PaletteOptions = {
  mode: 'light',
  primary: {
    main: '#1b74e4',
    light: '#e4f0fc',
  },
  secondary: {
    light: '#fff',
    main: '#f0f2f5',
    dark: '#e4e6eb',
  },
  grey: {
    '100': '#f7f8fa',
    '500': '#92979c',
  },
  common: {
    white: '#fff',
    black: '#000',
    reactionTypes: {
      like: '#2078f4',
      love: '#F44336',
      care: '#d49820',
      haha: '#d49820',
      wow: '#d49820',
      sad: '#d49820',
      angry: '#F44336',
      default: '#65676b',
    },
  },
  background: {
    default: '#f0f2f5',
    paper: '#fff',
  },
  text: {
    primary: '#000',
    secondary: '#65676b',
    disabled: '#b7b9bd',
  },
  info: {
    main: '#1b74e4',
  },
  divider: '#ced0d4',
  contrastThreshold: 4.5,
};

export const darkPalette: PaletteOptions = {
  mode: 'dark',
  primary: {
    main: '#1b74e4',
    light: '#263951',
  },
  secondary: {
    light: '#3a3b3c',
    main: '#3a3b3c',
    dark: '#3a3b3c',
  },
  grey: {
    '100': '#f7f8fa',
    '500': '#92979c',
  },
  common: {
    white: '#fff',
    black: '#000',
    reactionTypes: {
      like: '#2078f4',
      love: '#F44336',
      care: '#d49820',
      haha: '#d49820',
      wow: '#d49820',
      sad: '#d49820',
      angry: '#F44336',
      default: '#a8aab1',
    },
  },
  background: {
    default: '#18191a',
    paper: '#242526',
  },
  text: {
    primary: '#e4e6eb',
    secondary: '#b8babf',
    disabled: '#a6a9ad',
  },
  info: {
    main: '#4093ff',
  },

  divider: '#3e4042',
  contrastThreshold: 4.5,
};
