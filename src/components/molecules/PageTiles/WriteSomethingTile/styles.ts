import Icon from '@/components/atoms/Icon/Icon';
import { ButtonBase, Typography, styled } from '@mui/material';

export const StyledPostTypeButton = styled(ButtonBase)(({ theme }) => ({
  width: '100%',
  height: '40px',
  borderRadius: theme.shape.borderRadius,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'row',
  gap: theme.spacing(1),

  ':hover': {
    backgroundColor: theme.palette.secondary.main,
  },
}));

export const StyledAddPostButton = styled(ButtonBase)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  width: '100%',
  borderRadius: '20px',
  padding: theme.spacing(1, 2),
  justifyContent: 'flex-start',
}));

export const StyledButtonIcon = styled(Icon)(({ theme }) => ({
  marginRight: theme.spacing(1),
}));
export const StyledButtonText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontWeight: 500,
}));
