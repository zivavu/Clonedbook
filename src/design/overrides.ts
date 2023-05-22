import { Components, Palette, Shadows } from '@mui/material';

export const getCompoentsOverrides = (palette: Palette, shadows: Shadows) => {
  const componentOverrides: Components = {
    MuiLink: {
      styleOverrides: {
        root: {
          color: palette.text?.primary,
          textDecoration: 'none',
          '&:hover': {
            textDecoration: 'underline',
          },
        },
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
            backgroundColor: palette.secondary?.main,
          },
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
    MuiDialog: {
      styleOverrides: {
        root: {
          '& .MuiPaper-root': {
            borderRadius: '8px',
            boxShadow: shadows[14],
          },
        },
      },
    },
  };
  return componentOverrides;
};
