import { Stack, styled } from '@mui/material';

export const StyledRoot = styled(Stack)(({ theme }) => ({
  color: theme.palette.text.primary,
  position: 'relative',
  width: '100%',
  containerType: 'inline-size',
}));

export const StyledContentWrapper = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(2),
  paddingBottom: theme.spacing(4),
  marginLeft: 'auto',
  marginRight: 'auto',
  minHeight: '70vh',
  paddingX: theme.spacing(1),

  width: `min(${theme.breakpoints.values.lg}px, 100%)`,
  containerType: 'inline-size',
}));
