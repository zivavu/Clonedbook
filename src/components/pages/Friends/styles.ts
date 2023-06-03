import { Stack, styled } from '@mui/material';

export const StyledRoot = styled(Stack)(({ theme }) => ({
  color: theme.palette.text.primary,
}));

export const StyledSidebarWrapper = styled(Stack)(({ theme }) => ({}));

export const StyledFriendTilesWrapper = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  flexWrap: 'wrap',
}));
