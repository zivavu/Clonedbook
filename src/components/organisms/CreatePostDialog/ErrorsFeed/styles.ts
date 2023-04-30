import { Alert, Box, keyframes, styled } from '@mui/material';

export const StyledRoot = styled(Box)(({ theme }) => ({
  color: theme.palette.text.primary,
  display: 'flex',
  flexDirection: 'column',
  position: 'absolute',
  top: '0',
  left: '0',
  width: '100%',
  padding: theme.spacing(2),
  zIndex: theme.zIndex.modal - 1,
}));

export const StyledErrorAlert = styled(Alert)(({ theme }) => ({
  marginTop: theme.spacing(1),
  animation: `${showUp} 0.1s ease-out`,
}));

const showUp = keyframes`
  from {
	transform: translateY(-90%);
	opacity: 0;
  }
  to {
	transform: translateY(0);
	opacity: 1;
  }`;
