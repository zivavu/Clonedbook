import { Typography } from '@mui/material';

import { StyledRoot } from './styles';

import { ProfileProps } from './types';

export default function Profile({ sx, ...rootProps }: ProfileProps) {
  return (
    <StyledRoot sx={sx} {...rootProps}>
      <Typography>Profile</Typography>
    </StyledRoot>
  );
}
