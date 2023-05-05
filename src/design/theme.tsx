import { PaletteOptions, createTheme } from '@mui/material/styles';
import { componentOverrides } from './overrides';

export const palette = {
  primary: {
    main: '#1b74e4',
    light: '#e4f0fc',
    500: '#1b74e4',
    400: '#3982E4',
  },
  secondary: {
    light: '#fff',
    main: '#f0f2f5',
    dark: '#e4e6eb',
  },
  grey: {
    '100': '#f7f8fa',
    '300': '#f0f2f5',
    '600': '#e4e6eb',
  },
  common: {
    white: '#fff',
    black: '#000',
  },
  background: {
    default: '#f0f2f5',
  },
  text: {
    primary: '#000',
    secondary: '#65676b',
    disabled: '#b7b9bd',
  },
  info: {
    main: '#1b74e4',
  },
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
  divider: '#ced0d4',
  contrastThreshold: 6,
} as PaletteOptions;

export const mode = 'light';
export const theme = createTheme({
  palette,
  typography: {
    allVariants: {
      fontFamily: ['"Roboto"', 'Helvetica', 'sans-serif', 'Arial'].join(','),
      fontWeight: 300,
    },
  },
  shape: {
    borderRadius: 8,
  },

  //@ts-ignore
  components: componentOverrides({ ...palette, mode }),
});
