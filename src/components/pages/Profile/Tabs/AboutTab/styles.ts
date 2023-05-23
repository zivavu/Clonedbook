import { ListItemButton, Stack, styled } from '@mui/material';

export const StyledRoot = styled(Stack)(({ theme }) => ({
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.secondary.light,
  flexDirection: 'row',
  width: '100%',
  borderRadius: theme.spacing(1),
  boxShadow: theme.shadows[3],
}));

export const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  '&.Mui-selected .MuiTypography-root': {
    color: theme.palette.primary.main,
  },
}));
