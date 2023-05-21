import { Box, ButtonBase, Stack, styled } from '@mui/material';
import Image from 'next/image';

export const StyledRoot = styled(Box)(({ theme }) => ({
  color: theme.palette.text.primary,
}));

export const StyledImagesRow = styled(Stack)(({ theme }) => ({
  width: '100%',
}));

export const StyledImageContainer = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  width: '32.5%',
  aspectRatio: '1/1',
}));

export const StyledTileImage = styled(Image)(({ theme }) => ({}));
