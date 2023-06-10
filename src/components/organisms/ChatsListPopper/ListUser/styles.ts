import { ListItemButton, styled } from '@mui/material';

export const StyledRoot = styled(ListItemButton)(({ theme }) => ({
  color: theme.palette.text.primary,
  padding: theme.spacing(1.4, 1),
}));
