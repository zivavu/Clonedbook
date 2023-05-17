import { Box, styled } from '@mui/material';

export const StyledRoot = styled(Box)(({ theme }) => ({
  position: 'relative',
  color: theme.palette.text.primary,
  minWidth: '376px',
  maxWidth: '376px',
  padding: theme.spacing(2),
  paddingTop: 0,

  overflowX: 'hidden',
  overflowY: 'scroll',
  scrollbarWidth: 'thin',
  '&::-webkit-scrollbar': {
    width: `8px`,
  },

  scrollbarColor: `transparent transparent`,
  '&::-webkit-scrollbar-thumb': {
    background: theme.palette.secondary.main,
    borderRadius: '8px',
  },

  '&:hover::-webkit-scrollbar-thumb': {
    background: theme.palette.text.disabled,
  },
  '&:hover': {
    scrollbarColor: `${theme.palette.text.disabled}${theme.palette.secondary.main}`,
  },
}));
