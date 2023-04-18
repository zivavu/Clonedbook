import { PaletteOptions, createTheme } from '@mui/material/styles';
import { componentOverrides } from './overrides';

export const palette = {
  primary: {
    main: '#1b74e4',
    light: '#e4f0fc',
  },
  secondary: {
    light: '#fff',
    main: '#f0f2f5',
    dark: '#e4e6eb',
  },
  background: {
    default: '#f0f2f5',
  },
  text: {
    primary: '#000',
    secondary: '#65676B',
    disabled: '#b7b9bd',
  },
  info: {
    main: '#1b74e4',
  },
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
  components: componentOverrides({ ...palette, mode }),
});
