import { Box, styled } from '@mui/material';

export const StyledRoot = styled(Box)(({ theme }) => ({
  position: 'relative',
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.paper,
  margin: theme.spacing(2, 2),
  borderRadius: theme.shape.borderRadius,
  boxShadow: 'rgba(0, 0, 0, 0.2) 0px 1px 2px 0px',
}));

export const StyledContentWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(0, 2),
  paddingTop: theme.spacing(1),
}));
