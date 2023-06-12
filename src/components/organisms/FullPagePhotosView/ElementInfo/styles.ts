import ScrollableBox from '@/components/atoms/scrollables/ScrollableBox';
import { styled } from '@mui/material';

export const StyledRoot = styled(ScrollableBox)(({ theme }) => ({
  position: 'relative',
  color: theme.palette.text.primary,
  minWidth: '376px',
  maxWidth: '376px',
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  overflowX: 'visible',
  overflowY: 'hidden',

  [theme.breakpoints.down('lg')]: {
    minWidth: '100%',
    overflowY: 'visible',
  },
}));
