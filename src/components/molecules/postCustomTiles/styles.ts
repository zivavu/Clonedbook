import Icon from '@/components/atoms/Icon/Icon';
import { Stack, styled } from '@mui/material';

export const StyledIconContainer = styled(Stack)(({ theme }) => ({
  width: '65px',
  height: '65px',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.primary.main,
  borderRadius: '50%',
}));

export const StyledIcon = styled(Icon)(({ theme }) => ({
  color: theme.palette.common.white,
  fontSize: '2.5rem',
}));
