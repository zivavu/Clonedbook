import { Stack, styled } from '@mui/material';

export const StyledRoot = styled(Stack)(({ theme }) => ({
  color: theme.palette.text.primary,
  width: '338px',
  height: 'min(450px, 90vh)',
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.spacing(1),
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  boxShadow: theme.shadows[19],

  [theme.breakpoints.down('xs')]: {
    width: '100%',
    minHeight: '100svh',
    zIndex: theme.zIndex.modal,
    overflowY: 'visible',
  },
}));
