import { ListItemButton, styled } from '@mui/material';

export const StyledRoot = styled(ListItemButton)(({ theme }) => ({
  color: theme.palette.text.primary,
  paddingLeft: theme.spacing(1),
  alignItems: 'flex-start',
  marginTop: theme.spacing(0.5),

  [theme.breakpoints.down('md')]: {
    paddingLeft: theme.spacing(0.5),
    paddingRight: theme.spacing(0.5),
  },
}));
