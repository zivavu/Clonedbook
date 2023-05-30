import { useTheme } from '@mui/material';

import { StyledButtonText, StyledRoot } from './styles';

import { RemoveFriendButtonProps } from './types';

export default function RemoveFriendButton({
  friendId,
  sx,
  ...rootProps
}: RemoveFriendButtonProps) {
  const theme = useTheme();
  return (
    <StyledRoot sx={sx} {...rootProps}>
      <StyledButtonText>Remove</StyledButtonText>
    </StyledRoot>
  );
}
