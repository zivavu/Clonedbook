import { Box, styled } from '@mui/material';

export const StyledRoot = styled(Box)(({ theme }) => ({
  position: 'relative',
  color: theme.palette.text.primary,
  display: 'flex',
  justifyContent: 'space-between',
  height: `200vh`,
}));
