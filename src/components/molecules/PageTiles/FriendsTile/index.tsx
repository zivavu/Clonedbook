import { Typography, useTheme } from '@mui/material';

import { StyledRoot } from './styles';

import { FriendsTileProps } from './types';

export default function FriendsTile({ sx, ...rootProps }: FriendsTileProps) {
	const theme = useTheme();
  return (
    <StyledRoot sx={sx} {...rootProps}>
      <Typography>FriendsTile</Typography>
    </StyledRoot>
  );
}
  
