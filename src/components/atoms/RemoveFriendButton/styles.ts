import { ButtonBase, Typography, styled } from '@mui/material';

export const StyledRoot = styled(ButtonBase)(({ theme }) => ({
  padding: theme.spacing(1, 1.5),
  borderRadius: theme.spacing(0.75),
  backgroundColor: theme.palette.secondary.dark,
}));

export const StyledButtonText = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
  fontSize: theme.typography.pxToRem(14),
  whiteSpace: 'nowrap',
}));
