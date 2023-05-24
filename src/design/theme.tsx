import { Palette, PaletteOptions, createTheme } from '@mui/material/styles';
import { Source_Sans_3 } from 'next/font/google';
import { getCustomShadows } from './customShadows';
import { getCompoentsOverrides } from './overrides';
import { IReactionTypes } from './types';

declare module '@mui/material/styles/createPalette' {
  //eslint-disable-next-line no-unused-vars
  interface CommonColors {
    reactionTypes: IReactionTypes;
  }
}

export const palette: PaletteOptions = {
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

const source_sans = Source_Sans_3({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});
export const mode = 'light';

const customShadows = getCustomShadows(mode);
export const theme = createTheme({
  palette,
  typography: {
    allVariants: {
      fontFamily: [
        `${source_sans.style.fontFamily}, 'Roboto', 'Helvetica', 'sans-serif', 'Arial'`,
      ].join(','),
      fontWeight: 380,
      letterSpacing: '0',
    },
    h6: {
      fontSize: '1.375rem',
    },
    subtitle1: {
      fontSize: '1rem',
    },
    subtitle2: {
      fontSize: '0.9375rem',
    },
    body1: {
      lineHeight: '1.165rem',
      fontSize: '0.875rem',
    },
    body2: {
      fontSize: '0.8rem',
    },
  },
  shape: {
    borderRadius: 8,
  },
  shadows: customShadows,

  components: getCompoentsOverrides({ ...(palette as Palette), mode }, customShadows),
});
