import { PaletteOptions } from '@mui/material';

export const componentOverrides = (palette: PaletteOptions) => {
  return {
    a: {
      styleOverrides: {
        color: palette.text?.primary,
        textDecoration: 'none',
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& fieldset': {
            border: 'none',
          },
          borderRadius: '18px',
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          border: 'none',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          transition: 'background-color 50ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
          textTransform: 'none',

          '&:hover': {
            //@ts-ignore
            backgroundColor: palette.secondary?.main,
          },
        },
      },
    },

    MuiAppBar: {
      styleOverrides: {
        root: {
          height: '56px',
          boxShadow: 'rgba(0, 0, 0, 0.05) 0px 1px 5px',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
        },
      },
    },
    MuiModal: {
      styleOverrides: {
        root: {
          '& .MuiBackdrop-root': {
            backgroundColor: 'rgba(255, 255, 255, 0.55)',
          },
        },
      },
    },
  };
};
