import { ListItemButton, Stack, styled } from '@mui/material';

export const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  height: '50px',
  paddingLeft: theme.spacing(1),
  marginBottom: theme.spacing(1),

  '&.Mui-selected': {
    backgroundColor: theme.palette.secondary.main,
  },
}));

export const StyledIconContainer = styled(Stack)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
  height: '36px',
  aspectRatio: '1/1',
  marginRight: theme.spacing(1.5),
}));
