import { Box, ButtonBase, IconButton, styled } from '@mui/material';

export const StyledRoot = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  minHeight: '240px',
  padding: theme.spacing(2),
  margin: 'auto',
  borderRadius: '6px',
  pointerEvents: 'none',
  color: theme.palette.text.primary,
}));

export const StyledBorderBox = styled(Box)(({ theme }) => ({
  height: '100%',
  padding: theme.spacing(1),
  borderRadius: '8px',
  border: `1px solid`,
}));

export const StyledPhotoAddButton = styled(ButtonBase)(({ theme }) => ({
  width: '100%',
  minHeight: '240px',
  maxHeight: '100%',
  backgroundColor: theme.palette.grey[100],
  borderRadius: '6px',
  pointerEvents: 'all',

  '&:hover': {
    backgroundColor: theme.palette.secondary.main,
  },
  cursor: 'pointer',
}));

export const StyledPhotoDropArea = styled('label')(({}) => ({
  position: 'absolute',
  left: 0,
  top: 0,

  width: '100%',
  minHeight: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
}));

export const StyledDragOverOverlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  width: '100%',
  height: '100%',
  backgroundColor: theme.palette.secondary.main,
  opacity: 0.3,
}));

export const StyledPhotosResetIcon = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(4.5),
  right: theme.spacing(4.5),
  width: '30px',
  height: '30px',
  backgroundColor: theme.palette.secondary.main,
  zIndex: 20,
  pointerEvents: 'all',
  boxShadow: 'rgba(0, 0, 0, 0.4) 0px 1px 4px;',

  '&:hover': {
    backgroundColor: theme.palette.secondary.dark,
  },
}));
