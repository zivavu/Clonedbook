import { Popper, Stack, styled } from '@mui/material';

export const StyledPopper = styled(Popper)(({ theme }) => ({
  zIndex: theme.zIndex.modal + 10,
}));

export const StyledPopperBody = styled(Stack)(({ theme }) => ({
  position: 'relative',
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.spacing(1),
  padding: theme.spacing(2),
  minHeight: '180px',
  width: 'min(430px, 98vw)',
  border: `1px solid ${theme.palette.secondary.main}`,
  pointerEvents: 'all',
  boxShadow: theme.shadows[9],
}));

export const StyledButtonsStack = styled(Stack)(({ theme }) => ({
  justifyContent: 'space-evenly',
  width: '100%',
  spacing: theme.spacing(1),
  marginTop: theme.spacing(2),
  alignSelf: 'center',
  rowGap: theme.spacing(1.5),
  flexWrap: 'wrap',
}));
