import { Box, styled } from '@mui/material';

export const StyledRoot = styled(Box)(({ theme }) => ({
  position: 'sticky',
  top: '56px',
  dispaly: 'flex',
  height: `calc(100vh - 56px)`,
  color: theme.palette.text.primary,
  width: '19%',
  overflowY: 'auto',
  overscrollBehaviorY: 'contain',

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

export const StyledHeadingContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  marginTop: theme.spacing(2.5),
  padding: theme.spacing(0, 1),
  justifyContent: 'space-between',
  alignItems: 'center',
}));
