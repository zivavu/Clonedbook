import { Typography, useTheme } from '@mui/material';

import { StyledRoot } from './styles';

import { ChatListPopperProps } from './types';

export default function ChatListPopper({ sx, ...rootProps }: ChatListPopperProps) {
	const theme = useTheme();
  return (
    <StyledRoot sx={sx} {...rootProps}>
      <Typography>ChatListPopper</Typography>
    </StyledRoot>
  );
}
  
