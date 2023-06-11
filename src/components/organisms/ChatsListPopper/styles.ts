import { Popper, Stack, styled } from '@mui/material';

export const StyledRoot = styled(Popper)(({ theme }) => ({
  zIndex: theme.zIndex.appBar + 1,
}));

export const StyledContentWrapper = styled(Stack)(({ theme }) => ({
  zIndex: theme.zIndex.modal + 10,
  position: 'relative',
  width: 'min(360px, 92vw)',
  maxHeight: '90vh',
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.spacing(1),
  boxShadow: theme.shadows[19],
  transform: 'translateX(-10px)',
}));
