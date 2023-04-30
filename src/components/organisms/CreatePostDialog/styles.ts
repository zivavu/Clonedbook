import {
  Box,
  Button,
  IconButton,
  TextField,
  darken,
  lighten,
  styled
} from '@mui/material';

export const StyledRoot = styled(Box)(({ theme }) => ({
  color: theme.palette.text.primary,
  width: 'min(96vw, 500px)',
  overflowX: 'hidden',

  scrollbarWidth: 'thin',
  '&::-webkit-scrollbar': {
    width: `8px`,
  },
  scrollbarColor: `transparent transparent`,
  '&::-webkit-scrollbar-thumb': {
    background: theme.palette.secondary.main,
    borderRadius: '8px',
  },
  '&:hover::-webkit-scrollbar-thumb': {
    background: theme.palette.text.disabled,
  },
  '&:hover': {
    scrollbarColor: `${theme.palette.text.disabled}${theme.palette.secondary.main}`,
  },
}));

export const DialogCloseIconButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(1.5),
  right: theme.spacing(2),
  backgroundColor: theme.palette.secondary.main,
  width: '36px',
  height: '36px',
}));

export const StyledPostTextField = styled(TextField)(({ theme }) => ({
  color: theme.palette.text.primary,
  margin: theme.spacing(2, 0),
  minHeight: '140px',

  '& .MuiOutlinedInput-root': {
    padding: '0',
  },
  '& .MuiInputBase-inputMultiline::placeholder': {
    fontWeight: 400,
  },
}));

export const PostSubmitButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  marginTop: theme.spacing(2),
  transition: 'all 0.1s ease-out',
  '&:hover': {
    backgroundColor:
      theme.palette.mode === 'light'
        ? darken(theme.palette.primary.main, 0.1)
        : lighten(theme.palette.primary.main, 0.1),
  },
}));
