import ScrollableStack from '@/components/atoms/scrollables/ScrollableStack';
import { Box, IconButton, styled } from '@mui/material';

export const StyledRoot = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  height: '90vh',
  width: 'min(98vw, 710px)',
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.spacing(1),
  boxShadow: theme.shadows[20],
  overflow: 'hidden',
}));

export const StyledCloseIconButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(1),
  right: theme.spacing(1),
  width: '35px',
  height: '35px',
  zIndex: 1,
  backgroundColor: theme.palette.background.default,
}));

export const StyledPostContentWrapper = styled(ScrollableStack)(({ theme }) => ({
  padding: theme.spacing(2),
  paddingBottom: 0,
  overflowY: 'auto',
  height: '100%',
}));
