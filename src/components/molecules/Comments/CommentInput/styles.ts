import { Box, TextField, styled } from '@mui/material';

export const StyledRoot = styled(Box)(({ theme }) => ({
  position: 'sticky',
  bottom: 0,
  width: `calc(100% + ${theme.spacing(1)})`,
  padding: theme.spacing(1, 0),
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.secondary.light,
  zIndex: 5,
}));

export const StyledWrapper = styled(Box)(({ theme }) => ({
  paddingRight: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  color: theme.palette.text.primary,
}));

export const StyledCommentInput = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    padding: theme.spacing(1, 1.5),
    color: theme.palette.text.primary,
    fontSize: '1rem',
    backgroundColor: theme.palette.secondary.main,

    '& .MuiOutlinedInput-input::placeholder': {
      opacity: '0.7',
    },
  },
}));
