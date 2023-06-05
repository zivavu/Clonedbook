import ScrollableBox from '@/components/atoms/scrollables/ScrollableBox';
import { Box, styled } from '@mui/material';
import { NAVBAR_HEIGHT } from '../../organisms/NavBar';

export const StyledRoot = styled(ScrollableBox)(({ theme }) => ({
  position: 'sticky',
  top: NAVBAR_HEIGHT,
  height: `calc(100vh - ${NAVBAR_HEIGHT})`,
  color: theme.palette.text.primary,
  minWidth: 'max(18%, 300px)',

  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

export const StyledHeadingContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  marginTop: theme.spacing(2.5),
  padding: theme.spacing(0, 1),
  justifyContent: 'space-between',
  alignItems: 'center',
}));
