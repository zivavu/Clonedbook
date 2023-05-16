import { Box, ToggleButton, styled } from '@mui/material';

export const StyledRoot = styled(Box)(({ theme }) => ({
  color: theme.palette.text.primary,
  margin: theme.spacing(0.5, 0),
}));

export const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
  position: 'relative',
  borderRadius: '8px !important',
  padding: theme.spacing(1.7, 2),
  marginRight: theme.spacing(0.2),

  '&.Mui-selected': {
    backgroundColor: 'transparent',
    color: theme.palette.info.main,
    borderBottomLeftRadius: '0 !important',
    borderBottomRightRadius: '0 !important',
  },
}));
