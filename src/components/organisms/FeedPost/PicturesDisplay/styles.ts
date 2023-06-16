import { Box, styled } from '@mui/material';

export const StyledRoot = styled(Box)(({ theme }) => ({
  color: theme.palette.text.primary,
  position: 'relative',
}));

export const StyledImagesGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  minWidth: '100%',
  height: '460px',
  gap: theme.spacing(0.5),
}));
