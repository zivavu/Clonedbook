import { ListItemButton, styled } from '@mui/material';

export const StyledRoot = styled(ListItemButton)(({ theme }) => ({
  color: theme.palette.text.primary,
  paddingLeft: theme.spacing(1),
  alignItems: 'flex-start',
}));
