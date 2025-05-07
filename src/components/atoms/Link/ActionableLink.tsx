import { setActiveLink } from '@/redux/features/openedChatsSlice';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { Menu, MenuItem, Link as MuiLink } from '@mui/material';
import { default as NextLink } from 'next/link';
import React, { MouseEvent, useState } from 'react';
import { useDispatch } from 'react-redux';

interface ActionableLinkProps {
  href: string;
  children: React.ReactNode;
  sx?: any;
}

const ActionableLink: React.FC<ActionableLinkProps> = ({ href, children, sx }) => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget as HTMLElement);
  };

  const handleClose = () => setAnchorEl(null);

  const handleOpenInApp = () => {
    dispatch(setActiveLink(href));
    handleClose();
  };

  return (
    <>
      <MuiLink
        href={href}
        sx={{ cursor: 'pointer', textDecoration: 'underline', ...sx }}
        onClick={handleClick}
        component={NextLink}
      >
        {children}
      </MuiLink>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        <MenuItem onClick={handleOpenInApp}>
          <PlayCircleOutlineIcon fontSize='small' sx={{ mr: 1 }} /> Open in app
        </MenuItem>
        <MenuItem
          component={NextLink}
          href={href}
          target='_blank'
          rel='noopener noreferrer'
          onClick={handleClose}
        >
          <OpenInNewIcon fontSize='small' sx={{ mr: 1 }} /> Open in new tab
        </MenuItem>
      </Menu>
    </>
  );
};

export default ActionableLink; 