import Icon from '@/components/atoms/Icon/Icon';
import { ListItemButton, Popper, Stack, styled } from '@mui/material';

export const StyledRoot = styled(Popper)(({ theme }) => ({
  zIndex: theme.zIndex.modal + 10,
  position: 'relative',
  width: 'min(360px, 92vw)',
  backgroundColor: theme.palette.secondary.light,
  borderRadius: theme.spacing(1),
  boxShadow: theme.shadows[19],
}));

export const StyledLoggedUserDispaly = styled(Stack)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(2),
  alignItems: 'center',
  borderRadius: theme.spacing(1),
  boxShadow: theme.shadows[15],
}));

export const StyledListItem = styled(ListItemButton)(({ theme }) => ({
  height: '55px',
  padding: theme.spacing(1),
}));

export const StyledIconContainer = styled(Stack)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.dark,
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
  height: '100%',
  aspectRatio: '1/1',
  marginRight: theme.spacing(1),
}));

export const StyledListItemIcon = styled(Icon)(({ theme }) => ({
  fontSize: '1.4rem',
}));
