import { Box, ButtonBase, Stack, ToggleButton, darken, styled } from '@mui/material';

export const StyledRoot = styled(Box)(({ theme }) => ({
  color: theme.palette.text.primary,
}));

export const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: '4px !important',

  '&.Mui-selected': {
    backgroundColor: 'transparent',
    color: theme.palette.info.main,
    borderBottomLeftRadius: '0 !important',
    borderBottomRightRadius: '0 !important',
  },
}));

export const SeeAllButton = styled(ButtonBase)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  width: '100%',
  height: '40px',
  borderRadius: theme.spacing(1),

  '&:hover': {
    backgroundColor: darken(theme.palette.secondary.main, 0.1),
  },
}));

export const StyledFriendsSectionStack = styled(Stack)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(2),
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
}));
