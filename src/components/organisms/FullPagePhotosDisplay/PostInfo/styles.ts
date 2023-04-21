import { Box, styled } from '@mui/material';

export const StyledRoot = styled(Box)(({ theme }) => ({
  position: 'relative',
  color: theme.palette.text.primary,
  minWidwth: '360px',
  maxWidth: '360px',
  padding: theme.spacing(2),
  paddingTop: 0,
}));

export const StyledDevider = styled(Box)(({ theme }) => ({
  position: 'absolute',
  left: '0',
  width: '100%',
  height: '0',
  borderTop: `1px solid ${theme.palette.divider}`,
}));
