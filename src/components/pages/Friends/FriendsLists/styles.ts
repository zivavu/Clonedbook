import ScrollableStack from '@/components/atoms/Scrollables/ScrollableStack';
import { NAVBAR_HEIGHT } from '@/components/organisms/NavBar';
import { Stack, styled } from '@mui/material';

export const StyledRoot = styled(Stack)(({ theme }) => ({
  color: theme.palette.text.primary,
}));

export const StyledFriendsList = styled(ScrollableStack)(({ theme }) => ({
  maxHeight: `calc(100vh - ${NAVBAR_HEIGHT} - ${theme.spacing(6)})`,
  paddingRight: theme.spacing(1),
  overflowY: 'auto',
}));
