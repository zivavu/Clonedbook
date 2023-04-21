import { styled } from '@mui/material';
import { StyledContentSection } from '../styles';

export const StyledRoot = styled(StyledContentSection)(({ theme }) => ({
  color: theme.palette.text.primary,
  paddingLeft: theme.spacing(0.5),
}));
