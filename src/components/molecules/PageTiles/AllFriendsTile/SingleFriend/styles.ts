import { Stack, styled } from '@mui/material';

export const StyledRoot = styled(Stack)(({ theme }) => ({
  color: theme.palette.text.primary,
  height: '85px',
  width: '48%',
  marginTop: theme.spacing(1.5),

  [theme.breakpoints.down('md')]: {
    width: '100%',
    height: '95px',
    marginTop: theme.spacing(2),
  },
}));
