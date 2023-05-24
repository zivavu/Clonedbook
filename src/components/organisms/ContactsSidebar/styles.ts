import ScrollableBox from '@/components/atoms/Scrollables/ScrollableBox';
import { Box, styled } from '@mui/material';
import { NAVBAR_HEIGHT } from '../NavBar';

export const StyledRoot = styled(ScrollableBox)(({ theme }) => ({
  position: 'sticky',
  top: NAVBAR_HEIGHT,
  height: `calc(100vh - ${NAVBAR_HEIGHT})`,
  color: theme.palette.text.primary,
  width: '19%',
}));

export const StyledHeadingContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  marginTop: theme.spacing(2.5),
  padding: theme.spacing(0, 1),
  justifyContent: 'space-between',
  alignItems: 'center',
}));
