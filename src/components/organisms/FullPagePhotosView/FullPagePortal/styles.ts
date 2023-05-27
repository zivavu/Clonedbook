import { Box, styled } from '@mui/material';

export const StyledRoot = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.light,
  zIndex: theme.zIndex.appBar + 1,
  top: 0,
  width: '100vw',
  height: '100vh',
  position: 'fixed',
  display: 'flex',
  justifyContent: 'space-between',
}));
