import { Box, styled } from '@mui/material';

export const StyledRoot = styled(Box)(({ theme }) => ({
  color: theme.palette.text.primary,
  position: 'relative',
}));

export const StyledPicturesContainer = styled(Box)(({}) => ({
  position: 'relative',
  height: '460px',
  width: '100%',
}));
