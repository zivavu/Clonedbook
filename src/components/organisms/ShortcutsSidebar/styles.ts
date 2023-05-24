import { Avatar, Box, ListItemButton, styled } from '@mui/material';
import { NAVBAR_HEIGHT } from '../NavBar';

export const StyledRoot = styled(Box)(({ theme }) => ({
  position: 'sticky',
  top: NAVBAR_HEIGHT,
  height: `calc(100vh - ${NAVBAR_HEIGHT})`,

  color: theme.palette.text.primary,
  width: '15%',
  padding: theme.spacing(1, 0),
  marginLeft: theme.spacing(1),
}));

export const StyledListItem = styled(ListItemButton)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  paddingLeft: theme.spacing(1),
}));

export const StyledListItemAvatar = styled(Avatar)(({ theme }) => ({
  marginRight: theme.spacing(1.5),
  width: '36px',
  height: '36px',
}));
