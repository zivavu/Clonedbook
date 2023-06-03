import { Stack, styled } from '@mui/material';

export const StyledRoot = styled(Stack)(({ theme }) => ({
  color: theme.palette.text.primary,
  width: '20%',

  [theme.breakpoints.down('xl')]: {
    width: '25%',
  },
  [theme.breakpoints.down('lg')]: {
    width: '50%',
  },
  [theme.breakpoints.down('md')]: {
    width: '33.33%',
  },
  [theme.breakpoints.down('sm')]: {
    width: '50%',
  },
  [theme.breakpoints.down('xs')]: {
    width: '100%',
  },
}));
