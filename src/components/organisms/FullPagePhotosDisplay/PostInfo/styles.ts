import { Box, styled } from '@mui/material';

export const StyledRoot = styled(Box)(({ theme }) => ({
  position: 'relative',
  color: theme.palette.text.primary,
  minWidwth: '360px',
  maxWidth: '360px',
  padding: theme.spacing(2),
  paddingTop: 0,

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


export const StyledDevider = styled(Box)(({ theme }) => ({
  position: 'absolute',
  left: '0',
  width: '100%',
  height: '0',
  borderTop: `1px solid ${theme.palette.divider}`,
}));
