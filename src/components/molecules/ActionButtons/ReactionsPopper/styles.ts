import { Box, Popper, keyframes, styled } from '@mui/material';

export const StyledReactionsPopover = styled(Popper)(({ theme }) => ({
  zIndex: 20,
  pointerEvents: 'none',
  position: 'relative',

  '&.fade-out': {
    animation: `${fadeout} 0.17s ease-in`,
  },
}));

export const StyledContentWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  height: '48px',
  backgroundColor: theme.palette.secondary.light,
  border: `1px solid ${theme.palette.secondary.main}`,
  borderRadius: '36px',
  animation: `${slidein} 0.15s ease-out`,
  pointerEvents: 'all',
}));

const fadeout = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

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
