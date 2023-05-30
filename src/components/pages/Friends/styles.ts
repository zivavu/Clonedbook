import { ListItemButton, Stack, styled } from '@mui/material';

export const StyledRoot = styled(Stack)(({ theme }) => ({
  color: theme.palette.text.primary,
}));

export const StyledFriendsWrapper = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  flexWrap: 'wrap',
}));
