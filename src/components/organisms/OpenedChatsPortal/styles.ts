import { Box, styled } from '@mui/material';

export const PortalContent = styled(Box)(({ theme }) => ({
  color: theme.palette.text.primary,
  position: 'fixed',
  bottom: 0,
  right: theme.spacing(2),
  zIndex: theme.zIndex.appBar + 1,
}));
