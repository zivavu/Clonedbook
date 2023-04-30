import { Box, TextField, styled } from '@mui/material';

export const StyledRoot = styled(Box)(({ theme }) => ({
  color: theme.palette.text.primary,
  width: '100%',
}));

export const StyledPostTextField = styled(TextField)(({ theme }) => ({
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(2),
  padding: theme.spacing(0, 2),
  minHeight: '40px',

  '& .MuiOutlinedInput-root': {
    padding: '0',
  },
  '& .MuiInputBase-inputMultiline::placeholder': {
    fontWeight: 400,
  },
}));
