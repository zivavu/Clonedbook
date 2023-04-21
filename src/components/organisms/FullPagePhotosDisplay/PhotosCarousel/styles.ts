import { Box, ButtonBase, styled } from '@mui/material';

export const StyledRoot = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: '100%',
  backgroundColor: theme.palette.common.black,

  '&:hover': {
    '& .MuiIconButton-root': {
      backgroundColor: theme.palette.common.white,
      opacity: '0.55',
    },
  },
}));

export const StyledSwitchAreaButton = styled(ButtonBase)(({ theme }) => ({
  position: 'absolute',
  width: '80px',
  height: '100%',
  '&:hover': {
    '& .icon': {
      backgroundColor: theme.palette.common.white,
      opacity: '1 !important',
    },
    '& .rightIcon': {
      transform: 'translateY(-50%) translateX(5px)',
    },
    '& .leftIcon': {
      transform: 'translateY(-50%) translateX(-5px)',
    },
  },

  '& .MuiTouchRipple-child': {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  },
}));

export const StyledButtonIcon = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '50%',
  width: '48px',
  height: '48px',
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',

  backgroundColor: theme.palette.common.white,
  opacity: '0',

  transition: [
    'opacity 0.1s cubic-bezier(0, 0, 1, 1)',
    'transform 0.15s cubic-bezier(0, 0, 1, 1)',
  ].join(', '),

  '&.rightIcon': {
    right: theme.spacing(2),
  },
  '&.leftIcon': {
    left: theme.spacing(2),
  },
}));
