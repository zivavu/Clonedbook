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

export const StyledDevider = styled(Box)(({ theme }) => ({
  position: 'absolute',
  left: '0',
  width: '100%',
  height: '0',
  borderTop: `1px solid ${theme.palette.divider}`,
}));
