import { Stack, styled } from '@mui/material';

export const StyledRoot = styled(Stack)(({ theme }) => ({
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.secondary.light,
  flexDirection: 'row',
  width: '100%',
  height: '500px',
  borderRadius: theme.spacing(1),
}));
