import ScrollableBox from '@/components/atoms/Scrollables/ScrollableBox';
import { Button, IconButton, Stack, darken, lighten, styled } from '@mui/material';

export const StyledRoot = styled(ScrollableBox)(({ theme }) => ({
  position: 'relative',
  width: 'min(96vw, 500px)',
  maxHeight: 'min(96vh, 760px)',
  color: theme.palette.text.primary,
}));

export const DialogCloseIconButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(1.5),
  right: theme.spacing(2),
  backgroundColor: theme.palette.secondary.main,
  width: '36px',
  height: '36px',
}));

export const StyledMainContentStack = styled(Stack)(({}) => ({
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
