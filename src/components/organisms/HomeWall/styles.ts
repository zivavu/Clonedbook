import { Box, styled } from '@mui/material';

export const StyledRoot = styled(Box)(({ theme }) => ({
  color: theme.palette.text.primary,
  width: 'min(80%, 700px)',
  padding: theme.spacing(0, 2),
  paddingTop: theme.spacing(3),
  [theme.breakpoints.down('md')]: {
    width: '100%',
    padding: theme.spacing(0, 1),
  },
}));
