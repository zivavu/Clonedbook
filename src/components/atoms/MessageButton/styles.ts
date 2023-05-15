import { Box, ButtonBase, Typography, styled } from '@mui/material';
import Icon from '../Icon/Icon';

export const StyledRoot = styled(Box)(({ theme }) => ({
  color: theme.palette.text.primary,
}));

export const StyledMessageButton = styled(ButtonBase)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.dark,
  margin: theme.spacing(0, 1),
  padding: theme.spacing(1.2, 1.3),
  borderRadius: theme.spacing(1),
  height: '38px',
}));

export const StyledButtonIcon = styled(Icon)(({ theme }) => ({
  fontSize: theme.typography.pxToRem(16),
  marginRight: theme.spacing(0.5),
}));

export const StyledButtonText = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
  fontSize: theme.typography.pxToRem(14),
}));
