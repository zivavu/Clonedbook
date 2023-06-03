import { Stack, styled } from '@mui/material';

export const StyledRoot = styled(Stack)(({ theme }) => ({
  position: 'relative',
  color: theme.palette.text.primary,
  width: '100%',
  padding: theme.spacing(4),

  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(1),
    paddingTop: theme.spacing(2),
  },
}));
