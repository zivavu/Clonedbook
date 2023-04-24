import { Box, keyframes, styled } from '@mui/material';

export const SelectButtonUnderline = styled(Box)(({ theme }) => ({
  position: 'absolute',
  width: '100%',
  height: '3px',
  bottom: '0',
  left: '0',
  backgroundColor: theme.palette.info.main,
  animation: `${slidein} 0.15s ease-out`,
}));

const slidein = keyframes`
from {
	  height: 0;
	  width: 0;
	  left: 50%;
}
to {
	  height: 3px;
	  width: 100%;
	  left: 0;
}`;
