import ScrollableStack from '@/components/atoms/Scrollables/ScrollableStack';
import { Box, styled } from '@mui/material';

export const StyledRoot = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  height: '93vh',
  width: 'min(90vw, 710px)',
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.secondary.light,
  borderRadius: theme.spacing(1),
  boxShadow: theme.shadows[20],
  overflow: 'hidden',
}));

export const StyledPostContentWrapper = styled(ScrollableStack)(({ theme }) => ({
  padding: theme.spacing(2),
  paddingBottom: 0,
  overflowY: 'auto',
  height: '100%',
}));
