import { Box, Menu, Popover, styled } from '@mui/material';

export const StyledReactionsPopover = styled(Popover)(({ theme }) => ({
  '& .MuiBackdrop-root': {
    backgroundColor: 'transparent',
  },
  '& .MuiPaper-root': {
    backgroundColor: theme.palette.secondary.light,
    border: `1px solid ${theme.palette.secondary.main}`,
    borderRadius: '36px',
    boxShadow: 'none',
    overflow: 'visible',
    height: '48px',
    display: 'flex',
    alignItems: 'center',
  },
}));
