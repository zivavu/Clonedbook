import { Stack, styled } from '@mui/material';

export const StyledRoot = styled(Stack)(({ theme }) => ({
  color: theme.palette.text.primary,
  marginTop: 'auto',
  alignItems: 'center',
  padding: theme.spacing(1.5, 1),
}));
