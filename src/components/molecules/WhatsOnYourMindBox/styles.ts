import { Box, ButtonBase, Typography, styled } from '@mui/material';
import Image from 'next/image';

export const StyledRoot = styled(Box)(({ theme }) => ({
  color: theme.palette.text.primary,
  height: `123px`,
  backgroundColor: theme.palette.background.paper,
  margin: theme.spacing(2, 2),
  borderRadius: theme.shape.borderRadius,
  boxShadow: 'rgba(0, 0, 0, 0.2) 0px 1px 2px 0px',
  padding: theme.spacing(2),
}));

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
