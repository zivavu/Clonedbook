import { Box, IconButton, styled } from '@mui/material';
import { drawerBleeding } from '.';

export const StyledRoot = styled(Box)(({ theme }) => ({
  color: theme.palette.text.primary,
}));

export const StyledDrawerPuller = styled(Box)(({ theme }) => ({
  width: drawerBleeding,
  height: '30%',
  position: 'absolute',
  top: `50%`,
  right: `-${drawerBleeding}px`,
  transform: 'translateY(-50%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.secondary.light,
  borderRadius: '0 70px 70px 0',
  visibility: 'visible',
  opacity: 0.8,
}));

export const StyledDrawerCloseIcon = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(0.5),
  right: theme.spacing(0.5),
  width: '40px',
  height: '40px',
  zIndex: 4,
}));
