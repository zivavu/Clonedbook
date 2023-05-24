import { Box, ToggleButton, styled } from '@mui/material';

export const StyledRoot = styled(Box)(({ theme }) => ({
  color: theme.palette.text.primary,
}));

export const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: '4px !important',

  '&.Mui-selected': {
    backgroundColor: 'transparent',
    color: theme.palette.info.main,
    borderBottomLeftRadius: '0 !important',
    borderBottomRightRadius: '0 !important',
  },
}));
