import ScrollableStack from '@/components/atoms/Scrollables/ScrollableStack';
import { styled } from '@mui/material';

export const StyledRoot = styled(ScrollableStack)(({ theme }) => ({
  width: '100vw',
  height: '100vh',
  position: 'fixed',
  top: 0,
  left: 0,
  flexDirection: 'row',
  backgroundColor: theme.palette.background.paper,
  zIndex: theme.zIndex.appBar + 1,

  [theme.breakpoints.down('lg')]: {
    flexDirection: 'column',
    overflowY: 'scroll',
  },
}));
