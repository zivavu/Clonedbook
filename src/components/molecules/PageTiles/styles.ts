import { Box, Stack, Typography, styled } from '@mui/material';

export const StyledPageTile = styled(Box)(({ theme }) => ({
  position: 'relative',
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
  padding: theme.spacing(2),
}));

export const StyledPageTileHeader = styled(Typography)(({ theme }) => ({
  fontWeight: 650,
  fontSize: theme.typography.h4.fontSize,
  lineHeight: theme.typography.h4.fontSize,
  padding: theme.spacing(0.5, 0),
}));

export const StyledFullSizePageTile = styled(Stack)(({ theme }) => ({
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.secondary.light,
  width: '100%',
  borderRadius: theme.spacing(1),
  boxShadow: theme.shadows[3],
  padding: theme.spacing(2),
}));
