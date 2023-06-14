import { Box, styled } from '@mui/material';

export const StyledChatsContainer = styled(Box)(({ theme }) => ({
  color: theme.palette.text.primary,
  position: 'fixed',
  bottom: 0,
  right: 0,
  zIndex: theme.zIndex.appBar + 1,

  maxWidth: '100vw',
  padding: theme.spacing(0, 1),
  paddingRight: theme.spacing(10),

  [theme.breakpoints.down('lg')]: {
    paddingRight: theme.spacing(2),
  },

  [theme.breakpoints.down('xs')]: {
    top: 0,
    width: '100vw',
    padding: theme.spacing(0),
    overflowY: 'visible',
  },
}));
