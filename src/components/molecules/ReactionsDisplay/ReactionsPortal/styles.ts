import { Box, styled } from '@mui/material';

export const StyledRoot = styled(Box)(({ theme }) => ({
  position: 'fixed',
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.secondary.light,
  opacity: 1,
  height: 'min(90vh, 550px)',
  width: 'min(90vw, 550px)',
}));
