import Icon from '@/components/atoms/Icon/Icon';
import { Box, Button, styled } from '@mui/material';

export const StyledRoot = styled(Box)(({ theme }) => ({
  color: theme.palette.text.primary,
  width: '100%',
  height: '44px',
  display: 'flex',
  justifyContent: 'space-evenly',
  borderTop: `1px solid ${theme.palette.divider}`,
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

export const StyledActionButton = styled(Button)(({ theme }) => ({
  color: theme.palette.text.secondary,
  backgroundColor: theme.palette.secondary.light,
  width: '100%',
  borderRadius: '4px',
  margin: theme.spacing(0.5, 0),
}));

export const StyledActionIcon = styled(Icon)(({ theme }) => ({
  fontSize: '1.15rem',
  margin: theme.spacing(0, 1),
}));
