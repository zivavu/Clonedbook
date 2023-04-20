import { Box, ButtonBase, Stack, styled } from '@mui/material';

export const StyledRoot = styled(Box)(({ theme }) => ({
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(1),
}));

export const StyledTextContent = styled(Stack)(({ theme }) => ({
  position: 'relative',
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.secondary.main,
  marginLeft: theme.spacing(0.7),
  padding: theme.spacing(1, 1.5),
  borderRadius: '18px',
}));

export const StyledInteractButton = styled(ButtonBase)(({ theme }) => ({
  padding: theme.spacing(0.2, 0.5),
  borderRadius: '6px',
  '&:hover': {
    textDecoration: 'underline',
  },
}));
