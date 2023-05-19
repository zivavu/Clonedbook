import { Box, ButtonBase, Stack, styled } from '@mui/material';
import Image from 'next/image';

export const StyledRoot = styled(Box)(({ theme }) => ({
  color: theme.palette.text.primary,
}));
