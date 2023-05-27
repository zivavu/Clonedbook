import { Box, styled } from '@mui/material';

export const StyledRoot = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  backgroundColor: theme.palette.background.default,
}));
