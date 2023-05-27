import { Box, styled } from '@mui/material';

export const StyledRoot = styled(Box)(({ theme }) => ({
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.secondary.light,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
}));

export const StyledContentWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(0, 2),
  paddingTop: theme.spacing(1),
}));
