import { Stack, styled } from '@mui/material';

export const StyledRoot = styled(Stack)(({ theme }) => ({
  width: '100vw',
  height: '100vh',
  position: 'fixed',
  top: 0,
  flexDirection: 'row',
  backgroundColor: theme.palette.background.paper,
  zIndex: theme.zIndex.appBar + 1,
}));
