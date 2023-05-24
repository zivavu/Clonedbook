import { Box, styled } from '@mui/material';

export const StyledRoot = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: '4px !important',

  '&.Mui-selected': {
    borderBottomLeftRadius: `0 !important`,
    borderBottomRightRadius: `0 !important`,
  },
}));
