import { Box, ButtonBase, Stack, styled } from '@mui/material';

export const StyledRoot = styled(Box)(({ theme }) => ({
  color: theme.palette.text.primary,
}));

export const StyledImagesRow = styled(Stack)(({}) => ({
  width: '100%',
  overflow: 'hidden',
}));

export const StyledImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  width: '33.33%',
  aspectRatio: '1/1',
  border: `2px solid ${theme.palette.secondary.light}`,
}));
