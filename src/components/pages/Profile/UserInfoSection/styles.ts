import { Box, styled } from '@mui/material';

export const StyledRoot = styled(Box)(({ theme }) => ({
  color: theme.palette.text.primary,
  width: '100%',
  position: 'relative',
}));

export const StyledProfilePictureContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  minHeight: '174px',
  minWidth: '174px',
  borderRadius: '50%',
  overflow: 'hidden',
  border: `4px solid ${theme.palette.secondary.light}`,
  transform: 'translateY(-20%)',
}));

export const StyledBasicInfoContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'row',
  paddingBottom: theme.spacing(2),
  paddingRight: `${theme.spacing(0)} !important`,
}));
