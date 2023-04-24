import {
  Backdrop,
  Box,
  Dialog,
  GlobalStyles,
  Portal,
  Typography,
  alpha,
  useTheme,
} from '@mui/material';
import { StyledRoot } from './styles';

import { ReactionsPortalProps } from './types';

export default function ReactionsPortal({
  reactionsArr,
  setShowPortal,
  sx,
  ...rootProps
}: ReactionsPortalProps) {
  const theme = useTheme();
  return (
    <Portal>
      <GlobalStyles styles={{ body: { overflow: 'hidden' } }} />
      <Backdrop
        sx={{
          backgroundColor: alpha(theme.palette.secondary.light, 0.5),
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open
        onClick={() => setShowPortal(false)}
      >
        <StyledRoot sx={sx} {...rootProps}></StyledRoot>
      </Backdrop>
    </Portal>
  );
}
