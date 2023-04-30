import { Box, ButtonBase, styled } from '@mui/material';

export const StyledRoot = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: '240px',
  padding: theme.spacing(1),
  margin: 'auto',
  border: `1px solid`,
  borderRadius: '6px',
  pointerEvents: 'none',
  color: theme.palette.text.primary,
}));

export const StyledPhotoAddButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: '100%',
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
  width: '100%',
  height: '100%',
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
