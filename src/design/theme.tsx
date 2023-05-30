import { Palette, createTheme } from '@mui/material/styles';
import { Source_Sans_3 } from 'next/font/google';
import { getCustomShadows } from './customShadows';
import { getCompoentsOverrides } from './overrides';
import { darkPalette, lightPalette } from './pallets';
import { IReactionTypes } from './types';

declare module '@mui/material/styles/createPalette' {
  //eslint-disable-next-line no-unused-vars
  interface CommonColors {
    reactionTypes: IReactionTypes;
  }
}

const source_sans = Source_Sans_3({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

export function getDesignTokens(mode: 'light' | 'dark') {
  const currentPalette = mode === 'light' ? lightPalette : darkPalette;
  const customShadows = getCustomShadows(mode);
  return createTheme({
    palette: currentPalette,
    typography: {
      allVariants: {
        fontFamily: [
          `${source_sans.style.fontFamily}, 'Roboto', 'Helvetica', 'sans-serif', 'Arial'`,
        ].join(','),
        fontWeight: 380,
        letterSpacing: '0',
      },
      h1: {
        fontSize: '2rem',
      },
      h2: {
        fontSize: '1.75rem',
      },
      h3: {
        fontSize: '1.5rem',
      },
      h4: {
        fontSize: '1.375rem',
      },
      h5: {
        fontSize: '1.25rem',
      },
      h6: {
        fontSize: '1.125rem',
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
    breakpoints: {
      values: {
        xs: 450,
        sm: 600,
        md: 900,
        lg: 1220,
        xl: 1520,
      },
    },
    shadows: customShadows,

    components: getCompoentsOverrides({ ...(currentPalette as Palette), mode }, customShadows),
  });
}
