import { ButtonBase, Typography, darken, lighten, styled } from '@mui/material';
import Icon from '../../Icon/Icon';

export const StyledRoot = styled(ButtonBase)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(1, 1.5),
  borderRadius: theme.spacing(0.75),
  '&:hover': {
    backgroundColor:
      theme.palette.mode === 'light'
        ? darken(theme.palette.primary.main, 0.1)
        : lighten(theme.palette.primary.main, 0.1),
  },
}));

export const StyledButtonIcon = styled(Icon)(({ theme }) => ({
  fontSize: theme.typography.pxToRem(16),
  marginRight: theme.spacing(0.5),
  color: theme.palette.common.white,
}));

export const StyledButtonText = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
  fontSize: theme.typography.pxToRem(14),
}));
