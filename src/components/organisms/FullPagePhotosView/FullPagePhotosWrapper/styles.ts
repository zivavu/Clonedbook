import ScrollableStack from '@/components/atoms/scrollables/ScrollableStack';
import { styled } from '@mui/material';

export const StyledRoot = styled(ScrollableStack)(({ theme }) => ({
  width: '100vw',
  height: '100vh',
  maxWidth: '100vw',
  maxHeight: '100vh',
  position: 'fixed',
  top: 0,
  left: 0,
  flexDirection: 'row',
  backgroundColor: theme.palette.background.paper,
  zIndex: theme.zIndex.drawer + 1,
  overflow: 'hidden',

  [theme.breakpoints.down('lg')]: {
    flexDirection: 'column',
    overflowY: 'scroll',
  },
}));
