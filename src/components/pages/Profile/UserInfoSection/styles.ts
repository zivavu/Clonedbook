import { Box, Container, styled } from '@mui/material';

export const StyledRoot = styled(Box)(({ theme }) => ({
  color: theme.palette.text.primary,
  width: '100%',
  height: '700px',
  position: 'relative',
}));

export const StyledBacgroundPictureContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  margin: '0 auto',
  height: '462px',
  maxWidth: '1250px',
  backgroundColor: theme.palette.secondary.light,
  borderBottomLeftRadius: theme.spacing(1),
  borderBottomRightRadius: theme.spacing(1),
  overflow: 'hidden',
}));

export const StyledPictureGradient = styled(Box)(({ theme }) => ({
  position: 'absolute',
  width: '100%',
  height: '350px',
  top: 0,
  left: 0,
  background:
    'linear-gradient(180deg, rgba(0,0,0,0.60) 0%, rgba(0,0,0,0.4) 25%, rgba(0,0,0,0) 100%)',
}));

export const StyledProfilePictureContainer = styled(Box)(({ theme }) => ({
  height: '200px',
  width: '200px',
  borderRadius: '50%',
  overflow: 'hidden',
  border: `4px solid ${theme.palette.secondary.light}`,
  transform: 'translateY(-20%)',
}));

export const StyledBasicInfoContainer = styled(Container)(({ theme }) => ({
  position: 'relative',
  height: '150px',
  display: 'flex',
  flexDirection: 'row',
}));
