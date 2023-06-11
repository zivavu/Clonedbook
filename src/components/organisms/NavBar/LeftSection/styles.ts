import { OutlinedInput, styled } from '@mui/material';
import { StyledContentSection } from '../styles';

export const StyledRoot = styled(StyledContentSection)(({ theme }) => ({
  color: theme.palette.text.primary,
  paddingLeft: theme.spacing(0.5),
}));

export const StyledSearchInput = styled(OutlinedInput)(({ theme }) => ({
  fontSize: '1rem',
  borderRadius: '50px',
  fontWeight: 350,
  backgroundColor: theme.palette.secondary.main,
  zIndex: theme.zIndex.modal + 10,
  paddingLeft: theme.spacing(0.5),

  [theme.breakpoints.down('sm')]: {
    width: '44px',
  },
}));
