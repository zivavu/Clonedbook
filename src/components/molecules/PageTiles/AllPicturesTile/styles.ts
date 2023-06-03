import { Box, styled } from '@mui/material';

export const StyledPictureContainer = styled(Box)(({ theme }) => ({
  maxWidth: '20%',
  flex: `1 0 20%`,
  border: `4px solid ${theme.palette.background.paper}`,

  [theme.breakpoints.down('md').replace('@media', '@container')]: {
    minWidth: '33.33%',
  },
  [theme.breakpoints.down('sm').replace('@media', '@container')]: {
    minWidth: '50%',
  },
  [theme.breakpoints.down('xs').replace('@media', '@container')]: {
    minWidth: '100%',
  },
}));
