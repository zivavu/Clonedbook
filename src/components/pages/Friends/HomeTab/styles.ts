import { Stack, styled } from '@mui/material';

export const StyledRoot = styled(Stack)(({ theme }) => ({
  position: 'relative',
  color: theme.palette.text.primary,
  width: '100%',
}));
