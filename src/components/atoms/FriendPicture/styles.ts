import { Box, styled } from '@mui/material';

export const StyledRoot = styled(Box)(({ theme }) => ({
  color: theme.palette.text.primary,
  maxWidth: '100%',
  maxHeight: '100%',
  position: 'relative',
  aspectRatio: '1 / 1',
  borderRadius: theme.spacing(1),
  overflow: 'hidden',
}));
