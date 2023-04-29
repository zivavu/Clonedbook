import { Box, TextField, styled } from '@mui/material';

export const StyledRoot = styled(Box)(({ theme }) => ({
  color: theme.palette.text.primary,
  display: 'flex',
  alignItems: 'center',
  paddingBottom: theme.spacing(1),
}));

export const StyledCommentInput = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    padding: theme.spacing(1, 1.5),
    color: theme.palette.text.primary,
    fontSize: '0.9rem',
    lineHeight: '1.2rem',
    backgroundColor: theme.palette.secondary.main,

    '& .MuiOutlinedInput-input::placeholder': {
      opacity: '0.7',
    },
  },
}));
