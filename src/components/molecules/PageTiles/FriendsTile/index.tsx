import { Typography } from '@mui/material';

import { StyledRoot } from './styles';

import { FriendsTileProps } from './types';

export default function FriendsTile({ sx, ...rootProps }: FriendsTileProps) {
  return (
    <StyledRoot sx={sx} {...rootProps}>
      <Typography>FriendsTile</Typography>
    </StyledRoot>
  );
}
