import { Box, Stack, ToggleButton, styled } from '@mui/material';

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

export const StyledSectionStack = styled(Stack)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(3, 2),
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
}));
