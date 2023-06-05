import { ButtonBase, Typography, darken, lighten, styled } from '@mui/material';

export const StyledRoot = styled(ButtonBase)(({ theme }) => ({
  padding: theme.spacing(1, 1.5),
  borderRadius: theme.spacing(0.75),
  backgroundColor: theme.palette.secondary.dark,
  '&:hover': {
    backgroundColor:
      theme.palette.mode === 'light'
        ? darken(theme.palette.secondary.dark, 0.1)
        : lighten(theme.palette.secondary.dark, 0.1),
  },
}));

export const StyledButtonText = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
  fontSize: theme.typography.pxToRem(14),
  whiteSpace: 'nowrap',
}));
