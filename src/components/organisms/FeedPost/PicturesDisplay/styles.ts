import { Box, styled } from '@mui/material';

export const StyledRoot = styled(Box)(({ theme }) => ({
  color: theme.palette.text.primary,
  position: 'relative',
}));

export const StyledPicturesContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  height: '460px',
  width: '100%',

  [theme.breakpoints.down('sm')]: {
    height: '300px',
  },
}));
