import { Stack, styled } from '@mui/material';

export const StyledRoot = styled(Stack)(({ theme }) => ({
  color: theme.palette.text.primary,
  width: '100%',
  paddingBottom: theme.spacing(6),
}));
