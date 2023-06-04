import { Box, styled } from '@mui/material';

export const StyledRoot = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  color: theme.palette.text.primary,
  justifyContent: 'space-between',

  [theme.breakpoints.down('md')]: {
    justifyContent: 'center',
  },
}));
