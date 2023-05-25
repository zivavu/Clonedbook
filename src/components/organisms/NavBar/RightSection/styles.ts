import { ToggleButton, styled } from '@mui/material';
import { StyledContentSection } from '../styles';

export const StyledRoot = styled(StyledContentSection)(({ theme }) => ({
  color: theme.palette.text.primary,
  justifyContent: 'flex-end',
}));

export const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.secondary.dark,
  minWidth: '40px',
  minHeight: '40px',
  position: 'relative',
  borderRadius: '50%',
  margin: theme.spacing(0, 0.5),
  fontSize: '1.1rem',
  '&.Mui-selected': {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.main,
  },
}));
