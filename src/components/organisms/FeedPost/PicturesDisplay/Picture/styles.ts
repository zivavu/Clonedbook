import { Box, ImageListItem, styled } from '@mui/material';

export const StyledRoot = styled(Box)(({ theme }) => ({
  position: 'relative',
  color: theme.palette.text.primary,
  width: '100%',
  height: '100%',
}));
