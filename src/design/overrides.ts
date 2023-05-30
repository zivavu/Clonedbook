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
          '&.Mui-disabled': {
            color: palette.text.secondary,
            border: 'none',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          transition: 'none',
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
          '&.Mui-disabled': {
            opacity: 0.7,
          },
        },
      },
    },
    MuiModal: {
      styleOverrides: {
        root: {
          '& .MuiBackdrop-root': {
            backgroundColor: palette.background.paper,
            opacity: `0.65 !important`,
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        root: {
          '& .MuiPaper-root': {
            borderRadius: '8px',
            boxShadow: shadows[20],
          },
        },
      },
    },
  };
  return componentOverrides;
};
