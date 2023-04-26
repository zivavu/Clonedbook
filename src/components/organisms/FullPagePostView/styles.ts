import { Box, Stack, styled } from '@mui/material';

export const StyledRoot = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  height: '93vh',
  width: 'min(90vw, 710px)',
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.secondary.light,
  borderRadius: theme.spacing(1),
  boxShadow:
    'rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.5) 0px 0px 0px 1px inset',
  overflow: 'hidden',
}));

export const StyledPostContentWrapper = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(2),
  overflowY: 'auto',

  scrollbarWidth: 'thin',
  '&::-webkit-scrollbar': {
    width: `8px`,
  },

  scrollbarColor: `transparent transparent`,
  '&::-webkit-scrollbar-thumb': {
    background: theme.palette.secondary.main,
    borderRadius: '8px',
  },

  '&:hover::-webkit-scrollbar-thumb': {
    background: theme.palette.text.disabled,
  },
  '&:hover': {
    scrollbarColor: `${theme.palette.text.disabled}${theme.palette.secondary.main}`,
  },
}));
