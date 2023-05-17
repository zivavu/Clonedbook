import { Box, styled } from '@mui/material';

export const StyledRoot = styled(Box)(({ theme }) => ({
  color: theme.palette.text.primary,
  width: '38%',
  padding: theme.spacing(0, 2),
  paddingTop: theme.spacing(3),
}));
