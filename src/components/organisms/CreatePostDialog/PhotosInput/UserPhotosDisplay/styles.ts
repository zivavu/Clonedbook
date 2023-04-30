import { Box, CardMedia, IconButton, styled } from '@mui/material';

export const StyledRoot = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: '100%',
  minHeight: '100%',
  color: theme.palette.text.primary,
  borderRadius: '12px',
  overflowX: 'hidden',
  pointerEvents: 'none',
}));

export const StyledPhotoCardMedia = styled(CardMedia)(({ theme }) => ({
  border: `1px solid ${theme.palette.secondary.light}`,
}));
