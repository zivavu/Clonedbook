import { ButtonBase, MenuItem, Stack, Typography, styled } from '@mui/material';
import Icon from '../../Icon/Icon';

export const StyledRoot = styled(ButtonBase)(({ theme }) => ({
  padding: theme.spacing(1, 1.5),
  borderRadius: theme.spacing(0.75),
}));

export const StyledButtonIcon = styled(Icon)(({ theme }) => ({
  fontSize: theme.typography.pxToRem(16),
  marginRight: theme.spacing(0.5),
}));

export const StyledButtonText = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
  fontSize: theme.typography.pxToRem(14),
  whiteSpace: 'nowrap',
}));

export const StyledPopperContent = styled(Stack)(({ theme }) => ({
  marginTop: theme.spacing(1),
  padding: theme.spacing(0, 1),
  backgroundColor: theme.palette.background.default,
  width: 'min(90vw, 200px)',
  borderRadius: theme.spacing(1),
}));

export const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  padding: theme.spacing(1),
}));
