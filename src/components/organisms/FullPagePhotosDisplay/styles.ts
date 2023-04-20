import { Box, styled } from '@mui/material';

export const StyledRoot = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  zIndex: 2000,
  top: 0,
  width: '100vw',
  height: '100vh',
  position: 'fixed',
}));
