import { Drawer, SwipeableDrawer, useMediaQuery, useTheme } from '@mui/material';

import Icon from '@/components/atoms/Icon/Icon';
import { NAVBAR_HEIGHT } from '@/components/organisms/NavBar';
import { useState } from 'react';
import { StyledDrawerCloseIcon, StyledDrawerPuller } from './styles';
import { SidebarDrawerProps } from './types';

export const drawerBleeding = 30;
export default function SidebarDrawer({ sx, children, ...rootProps }: SidebarDrawerProps) {
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  const theme = useTheme();
  const drawerWidth = useMediaQuery(theme.breakpoints.down('md')) ? `280px` : `350px`;

  return (
    <>
      <Drawer
        {...rootProps}
        open
        variant='permanent'
        sx={{
          width: drawerWidth,
          height: '100%',
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            padding: theme.spacing(2, 1),
            paddingRight: theme.spacing(0),
            top: NAVBAR_HEIGHT,
          },

          [theme.breakpoints.down('md')]: {
            display: 'none',
          },
          ...sx,
        }}>
        {children}
      </Drawer>

      <SwipeableDrawer
        {...rootProps}
        variant='temporary'
        open={isMobileDrawerOpen}
        anchor='left'
        onOpen={() => setIsMobileDrawerOpen(true)}
        onClose={() => setIsMobileDrawerOpen(false)}
        swipeAreaWidth={(useMediaQuery(theme.breakpoints.down('md')) ? 1 : 0) * drawerBleeding * 4}
        SwipeAreaProps={{ sx: { top: NAVBAR_HEIGHT } }}
        disableSwipeToOpen={false}
        allowSwipeInChildren={true}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          width: drawerWidth,
          height: '100%',
          display: 'flex',
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            padding: theme.spacing(2, 1),
            paddingRight: theme.spacing(0),
            overflow: 'visible',
          },

          [theme.breakpoints.up('md')]: {
            display: 'none',
          },
          ...sx,
        }}>
        <StyledDrawerCloseIcon
          onClick={() => {
            setIsMobileDrawerOpen(false);
          }}>
          <Icon icon='xmark' />
        </StyledDrawerCloseIcon>
        <StyledDrawerPuller
          onMouseDown={() => setIsMobileDrawerOpen((prev) => !prev)}
          sx={{ pointerEvents: isMobileDrawerOpen ? 'none' : 'all' }}>
          <Icon
            icon='angle-left'
            fontSize={25}
            style={{
              transform: isMobileDrawerOpen ? 'rotate(0)' : 'rotate(180deg)',
              transition: 'transform 0.2s ease-out',
            }}
          />
        </StyledDrawerPuller>
        {children}
      </SwipeableDrawer>
    </>
  );
}
