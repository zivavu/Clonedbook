import { Stack, styled } from '@mui/material';

export const StyledRoot = styled(Stack)(({ theme }) => ({
  color: theme.palette.text.primary,
  maxWidth: '70%',

  [theme.breakpoints.down('xs')]: {
    maxWidth: '90%',
  },
}));
