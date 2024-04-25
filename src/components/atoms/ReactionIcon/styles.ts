import { Box, SvgIcon, styled } from '@mui/material';

export const StyledRoot = styled(Box)(({ theme }) => ({
  position: 'relative',
  backgroundColor: theme.palette.background.paper,
  borderRadius: '50%',
}));

export const StyledSvgIcon = styled(SvgIcon)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
}));
