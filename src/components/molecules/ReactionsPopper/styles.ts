import { Box, Popper, keyframes, styled } from '@mui/material';

export const StyledReactionsPopper = styled(Popper)(({ theme }) => ({
  zIndex: theme.zIndex.modal + 10,
  pointerEvents: 'none',
}));

export const StyledPopperBody = styled(Box)(({ theme }) => ({
  position: 'relative',
  backgroundColor: theme.palette.background.paper,
  borderRadius: '36px',
  padding: theme.spacing(0, 0.5),
  border: `1px solid ${theme.palette.secondary.main}`,
}));

export const StyledAnimationWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  height: '48px',
  animation: `${slidein} 0.15s ease-out`,
  pointerEvents: 'all',
}));

const slidein = keyframes`
  0% {
    opacity: 0;
    transform: translateY(30px);
    pointer-events: none;
  }
  99% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    pointer-events: all;
  }
`;
