import { Box, ImageList, Stack, Typography, styled } from '@mui/material';

export const StyledPageTile = styled(Box)(({ theme }) => ({
  position: 'relative',
  containerType: 'inline-size',
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
  padding: theme.spacing(2),

  [theme.breakpoints.down('sm').replace('@media', '@container')]: {
    padding: theme.spacing(2, 1),
  },
}));

export const StyledPageTileHeader = styled(Typography)(({ theme }) => ({
  fontWeight: 650,
  fontSize: theme.typography.h4.fontSize,
  lineHeight: theme.typography.h4.fontSize,
  padding: theme.spacing(0.5, 0),
}));

export const StyledFullSizePageTile = styled(Stack)(({ theme }) => ({
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.paper,
  width: '100%',
  borderRadius: theme.spacing(1),
  boxShadow: theme.shadows[3],
  padding: theme.spacing(2),
}));

export const StyledImageListContainer = styled(ImageList)(({ theme }) => ({
  borderRadius: theme.spacing(1.5),
  marginTop: theme.spacing(1),
  gridTemplateColumns: `repeat(3, 1fr) !important`,

  [theme.breakpoints.down('xs').replace('@media', '@container')]: {
    gridTemplateColumns: `repeat(2, 1fr) !important`,
  },
}));
