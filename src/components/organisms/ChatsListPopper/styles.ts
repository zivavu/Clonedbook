import { Popper, Stack, styled } from '@mui/material';

export const StyledRoot = styled(Popper)(({ theme }) => ({
  zIndex: theme.zIndex.appBar + 1,
}));

export const StyledContentWrapper = styled(Stack)(({ theme }) => ({
  zIndex: theme.zIndex.modal + 10,
  position: 'relative',
  width: 'min(360px, 98vw)',
  maxHeight: '90vh',
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.spacing(1),
  boxShadow: theme.shadows[19],
  transform: 'translateX(-10px)',

  [theme.breakpoints.down('xs')]: {
    transform: 'none',
  },
}));

export const StyledHeaderContainer = styled(Stack)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(1.5, 0.5),
  position: 'sticky',
  top: '0',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: theme.palette.background.paper,
  zIndex: 1,
}));
