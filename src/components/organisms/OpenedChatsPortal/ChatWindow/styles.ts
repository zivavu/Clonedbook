import { Stack, styled } from '@mui/material';

export const StyledRoot = styled(Stack)(({ theme }) => ({
  color: theme.palette.text.primary,
  width: '338px',
  height: '450px',
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.spacing(1),
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  boxShadow: theme.shadows[19],
}));
