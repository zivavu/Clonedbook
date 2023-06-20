import { Box, OutlinedInput, styled } from '@mui/material';

export const StyledRoot = styled(Box)(({ theme }) => ({
  position: 'sticky',
  width: `calc(100% + ${theme.spacing(2)})`,
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.paper,
  zIndex: 5,
}));

export const StyledCommentInputWrapper = styled(Box)(({ theme }) => ({
  paddingRight: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  color: theme.palette.text.primary,
}));

export const StyledCommentInput = styled(OutlinedInput)(({ theme }) => ({
  padding: theme.spacing(1, 1.5),
  color: theme.palette.text.primary,
  fontSize: '1rem',
  backgroundColor: theme.palette.secondary.main,

  transition: 'height 0.2s ease-in-out',
  '& .MuiOutlinedInput-input::placeholder': {
    opacity: '0.7',
  },
}));
