import { Stack, styled } from '@mui/material';

export const StyledPopperContent = styled(Stack)(({ theme }) => ({
  color: theme.palette.text.primary,
  width: 'min(320px, 90vw)',
  backgroundColor: theme.palette.background.paper,
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: theme.zIndex.appBar + 1,
  boxShadow: theme.shadows[20],
  borderRadius: theme.spacing(1),
}));
