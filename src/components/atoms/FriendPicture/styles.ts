import { Box, styled } from '@mui/material';

export const StyledRoot = styled(Box)(({ theme }) => ({
  color: theme.palette.text.primary,
  width: '100%',
  position: 'relative',
  aspectRatio: '1 / 1',
  borderRadius: theme.spacing(1),
  overflow: 'hidden',
}));
