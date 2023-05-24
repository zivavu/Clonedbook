import ScrollableStack from '@/components/atoms/Scrollables/ScrollableStack';
import { Box, ToggleButton, styled } from '@mui/material';

export const StyledRoot = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  height: 'min(85vh, 450px)',
  width: 'min(90vw, 550px)',
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.secondary.light,
  borderRadius: theme.spacing(1),
  padding: theme.spacing(0.5, 2),
  paddingRight: 0,
  boxShadow: theme.shadows[14],
  overflow: 'hidden',
}));

export const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: '4px !important',

  '&.Mui-selected': {
    borderBottomLeftRadius: `0 !important`,
    borderBottomRightRadius: `0 !important`,
  },
}));

export const StyledUsersContainer = styled(ScrollableStack)(({ theme }) => ({
  marginTop: theme.spacing(1),
  overflowY: 'auto',
  height: '100%',
}));
