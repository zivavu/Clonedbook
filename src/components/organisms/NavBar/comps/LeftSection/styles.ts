import { styled } from '@mui/material';
import { StyledContentSection } from '../../styles';

export const StyledRoot = styled(StyledContentSection)(({ theme }) => ({
  color: theme.palette.text.primary,
}));
