import { Box, Button, IconButton, Stack, darken, lighten, styled } from '@mui/material';

export const StyledRoot = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: 'min(96vw, 500px)',
  maxHeight: 'min(96vh, 760px)',
  color: theme.palette.text.primary,

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

export const DialogCloseIconButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(1.5),
  right: theme.spacing(2),
  backgroundColor: theme.palette.secondary.main,
  width: '36px',
  height: '36px',
}));

export const StyledMainContentStack = styled(Stack)(({ theme }) => ({
  maxHeight: '100%',
}));

export const PostSubmitButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  transition: 'all 0.1s ease-out',
  '&:hover': {
    backgroundColor:
      theme.palette.mode === 'light'
        ? darken(theme.palette.primary.main, 0.1)
        : lighten(theme.palette.primary.main, 0.1),
  },
}));
