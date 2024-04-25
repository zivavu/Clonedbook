import { Box, ListItemButton, styled } from '@mui/material';
import Image from 'next/image';
import { NAVBAR_HEIGHT } from '../NavBar';

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

export const StyledListItemImage = styled(Image)(({ theme }) => ({
  marginRight: theme.spacing(1.5),
  width: '32px',
  height: '32px',
}));
