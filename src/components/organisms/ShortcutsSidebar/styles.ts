import { Avatar, Box, ListItemButton, styled } from '@mui/material';
import { NAVBAR_HEIGHT } from '../NavBar';
import Image from 'next/image';

export const StyledRoot = styled(Box)(({ theme }) => ({
  position: 'sticky',
  top: NAVBAR_HEIGHT,
  height: `calc(100vh - ${NAVBAR_HEIGHT})`,

  minWidth: 'max(15%, 240px)',
  padding: theme.spacing(1, 0),
  marginLeft: theme.spacing(1),

  [theme.breakpoints.down('lg')]: {
    display: 'none',
  },
}));

export const StyledListItem = styled(ListItemButton)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  paddingLeft: theme.spacing(1),
}));

export const StyledListItemAvatar = styled(Image)(({ theme }) => ({
  marginRight: theme.spacing(1.5),
  width: '36px',
  height: '36px',
}));
