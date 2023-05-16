import { Box, styled } from '@mui/material';

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
