import { Box, Stack, styled } from '@mui/material';
import Image from 'next/image';

export const StyledRoot = styled(Box)(({ theme }) => ({
  color: theme.palette.text.primary,
}));

export const StyledImagesRow = styled(Stack)(({ theme }) => ({
  width: '100%',
  overflow: 'hidden',
}));

export const StyledImageContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: 'calc(100% / 3)',
  aspectRatio: '1/1',
}));

export const StyledTileImage = styled(Image)(({ theme }) => ({
  objectFit: 'cover',
}));
