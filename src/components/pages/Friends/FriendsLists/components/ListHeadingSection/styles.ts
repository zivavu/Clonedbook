import { Stack, styled } from '@mui/material';

export const StyledRoot = styled(Stack)(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(0.5, 0.5),
  paddingBottom: theme.spacing(1),
}));
