import { Box, styled } from '@mui/material';

export const StyledHorizontalContentDevider = styled(Box)(({ theme }) => ({
  position: 'absolute',
  left: '0',
  width: '100%',
  height: '0',
  borderTop: `1px solid ${theme.palette.divider}`,
}));

export const StyledVerticalContentDevider = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '0',
  width: '0',
  height: '100%',
  borderLeft: `1px solid ${theme.palette.divider}`,
}));
