import Icon from '@/components/atoms/Icon/Icon';
import { ButtonBase, ListItemButton, Popover, Stack, styled } from '@mui/material';

export const StyledRoot = styled(Popover)(({ theme }) => ({
  '& .MuiBackdrop-root': {
    opacity: `0 !important`,
  },
}));

export const StyledContentWrapper = styled(Stack)(({ theme }) => ({
  zIndex: theme.zIndex.modal + 10,
  position: 'relative',
  width: 'min(360px, 92vw)',
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.spacing(1),
  boxShadow: theme.shadows[19],
}));

export const StyledLoggedUserButton = styled(ButtonBase)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(2, 1.5),
  alignItems: 'center',
  justifyContent: 'flex-start',
  borderRadius: theme.spacing(1),
  boxShadow: theme.shadows[15],
}));

export const StyledListButton = styled(ListItemButton)(({ theme }) => ({
  height: '55px',
  padding: theme.spacing(1),
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
}));

export const StyledIconContainer = styled(Stack)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
  height: '38px',
  aspectRatio: '1/1',
  marginRight: theme.spacing(1),
}));

export const StyledListItemIcon = styled(Icon)(({ theme }) => ({
  fontSize: '1.2rem',
  color: theme.palette.text.primary,
}));
