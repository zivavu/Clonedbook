import ScrollableBox from '@/components/atoms/Scrollables/ScrollableBox';
import { styled } from '@mui/material';

export const StyledRoot = styled(ScrollableBox)(({ theme }) => ({
  position: 'relative',
  color: theme.palette.text.primary,
  minWidth: '376px',
  maxWidth: '376px',
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
}));
