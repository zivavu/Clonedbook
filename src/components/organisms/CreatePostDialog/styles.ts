import { theme } from '@/design/theme';
import { Box, ButtonBase, styled } from '@mui/material';

export const StyledRoot = styled(Box)(({ theme }) => ({
  color: theme.palette.text.primary,
  width: 'min(90vw, 500px)',
}));

export const StyledPhotoAddButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: '100%',
  backgroundColor: theme.palette.grey[100],
  borderRadius: '6px',

  '&:hover': {
    backgroundColor: theme.palette.secondary.main,
  },
  cursor: 'pointer',
}));

export const StyledPhotoDropArea = styled('label')(({ theme }) => ({
  position: 'absolute',
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
}));
