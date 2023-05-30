import { Box, keyframes, styled } from '@mui/material';

export const StyledRoundHole = styled(Box)(({ theme }) => ({
  width: '50px',
  height: '50px',
  borderRadius: '50%',
  background: `linear-gradient(-45deg, ${theme.palette.background.paper}, ${theme.palette.background.default}, ${theme.palette.background.paper})`,
  backgroundSize: `300% 300%`,
  animation: `${gradient} 1.5s infinite`,
}));

export const StyledHorizontalHole = styled(Box)(({ theme }) => ({
  height: '10px',
  borderRadius: '15px',
  background: `linear-gradient(-45deg, ${theme.palette.background.paper}, ${theme.palette.background.default}, ${theme.palette.background.paper})`,
  backgroundSize: `150% 150%`,
  animation: `${gradient} 1.5s infinite`,
}));

const gradient = keyframes`
0% {
	background-position: 0% 0%;
	scale: 1;
}
50% {
	background-position: 100% 100%;
	scale: 1.1;
}
100% {
	background-position: 0% 0%;
	scale: 1;
}
`;
