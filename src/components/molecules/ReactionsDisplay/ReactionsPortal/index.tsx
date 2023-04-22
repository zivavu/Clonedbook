import { Typography, useTheme } from '@mui/material';

import { StyledRoot } from './styles';

import { ReactionsPortalProps } from './types';

export default function ReactionsPortal({ ...rootProps }: ReactionsPortalProps) {
	const theme = useTheme();
  return (
    <StyledRoot {...rootProps}>
      <Typography>ReactionsPortal</Typography>
    </StyledRoot>
  );
}
  
