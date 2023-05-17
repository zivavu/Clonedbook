import { Box, Typography, styled } from '@mui/material';

export const StyledPageTile = styled(Box)(({ theme }) => ({
  position: 'relative',
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: 'rgba(0, 0, 0, 0.2) 0px 1px 2px 0px',
  padding: theme.spacing(2),
}));

export const StyledPageTileHeader = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: theme.typography.pxToRem(22),
  padding: theme.spacing(0.5, 0),
}));
