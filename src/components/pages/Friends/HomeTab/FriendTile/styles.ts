import { Stack, styled } from '@mui/material';

export const StyledRoot = styled(Stack)(({ theme }) => ({
  color: theme.palette.text.primary,
  width: '13%',
  borderRadius: theme.spacing(1),
  border: `1px solid ${theme.palette.divider}`,
  margin: theme.spacing(1),
}));
