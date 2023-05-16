import { ButtonBase, Typography, styled } from '@mui/material';
import Image from 'next/image';

export const StyledPostTypeButton = styled(ButtonBase)(({ theme }) => ({
  width: '100%',
  height: '40px',
  borderRadius: theme.shape.borderRadius,

  ':hover': {
    backgroundColor: theme.palette.secondary.main,
  },
}));

export const StyledButtonIcon = styled(Image)(({ theme }) => ({
  width: '24px',
  height: '24px',
  marginRight: theme.spacing(1),
}));
export const StyledButtonText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontWeight: 500,
}));
