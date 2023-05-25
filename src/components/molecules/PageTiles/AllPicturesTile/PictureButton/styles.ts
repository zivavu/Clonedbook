import { ButtonBase, styled } from '@mui/material';

export const StyledRoot = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  aspectRatio: '1/1',
  border: `1px solid ${theme.palette.secondary.main}`,
  borderRadius: theme.spacing(1),
  overflow: 'hidden',
  width: '100%',
}));
