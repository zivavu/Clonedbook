import { TextField, Typography, styled } from '@mui/material';

export const StyledTextDetailValue = styled(Typography)(({}) => ({
  overflow: 'hidden',
  wordBreak: 'keep-all',
  textOverflow: 'ellipsis',
}));

export const StyledEditInput = styled(TextField)(({ theme }) => ({
  width: 'min(90%, 300px)',

  '& .MuiInputBase-root': {
    width: '100%',
    fontSize: theme.typography.subtitle2.fontSize,

    '& input': {
      padding: theme.spacing(1.5, 2),
    },
    '& fieldset': {
      border: `1px solid ${theme.palette.text.disabled}`,
    },
  },
  '& .MuiFormLabel-root': {
    color: theme.palette.text.secondary,
  },
}));
