import { Box, styled } from '@mui/material';

export const StyledPictureContainer = styled(Box)(({ theme }) => ({
  maxWidth: '20%',
  flex: `1 0 20%`,
  border: `4px solid ${theme.palette.background.paper}`,

  [theme.breakpoints.down('md')]: {
    minWidth: '33.33%',
  },
  [theme.breakpoints.down('sm')]: {
    minWidth: '50%',
  },
  [theme.breakpoints.down('xs')]: {
    minWidth: '100%',
  },
}));
