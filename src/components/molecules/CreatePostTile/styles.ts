import { Box, styled } from '@mui/material';

export const StyledRoot = styled(Box)(({ theme }) => ({
  color: theme.palette.text.primary,
  height: `123px`,
  backgroundColor: theme.palette.background.paper,
  margin: theme.spacing(2, 2),
  borderRadius: theme.shape.borderRadius,
  boxShadow: 'rgba(0, 0, 0, 0.2) 0px 1px 2px 0px',
  padding: theme.spacing(2),
}));
