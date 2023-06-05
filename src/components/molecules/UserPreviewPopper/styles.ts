import { Popper, Stack, styled } from '@mui/material';

export const StyledPopper = styled(Popper)(({ theme }) => ({
  zIndex: theme.zIndex.modal + 10,
}));

export const StyledPopperBody = styled(Stack)(({ theme }) => ({
  position: 'relative',
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.spacing(1),
  padding: theme.spacing(2),
  minHeight: '200px',
  minWidth: 'min(400px, 80vw)',
  border: `1px solid ${theme.palette.secondary.main}`,
  pointerEvents: 'all',
}));
