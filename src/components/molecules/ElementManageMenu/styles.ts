import { Menu, MenuItem, styled } from '@mui/material';

export const StyledRoot = styled(Menu)(({ theme }) => ({
  color: theme.palette.text.primary,
  '& .MuiMenu-paper': {
    padding: theme.spacing(0, 1),
    width: 'min(70vw, 220px)',
  },
}));

export const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  borderRadius: theme.spacing(0.5),
}));
