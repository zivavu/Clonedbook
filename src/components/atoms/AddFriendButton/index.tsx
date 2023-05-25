import { darken, useTheme } from '@mui/material';

import { StyledButtonIcon, StyledButtonText, StyledRoot } from './styles';

import useGetFriendshipStatus from '@/hooks/useGetFriendshipStatus';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FriendsButtonProps } from './types';

export default function AddFriendButton({ friendId, sx, ...rootProps }: FriendsButtonProps) {
  const theme = useTheme();
  const userStatus = useGetFriendshipStatus(friendId);
  const buttonColor =
    userStatus === 'accepted' ? theme.palette.secondary.dark : theme.palette.primary.main;
  const textColor = theme.palette.getContrastText(buttonColor);
  const buttonSx = {
    backgroundColor: buttonColor,
    color: textColor,
    '&:hover': {
      backgroundColor: darken(buttonColor, 0.1),
    },
  };
  let icon: IconProp;
  let buttonText;
  switch (userStatus) {
    case 'accepted':
      icon = 'user-check';
      buttonText = 'Friends';
      break;
    case 'pending':
      icon = 'user-xmark';
      buttonText = 'Cancel Request';
      break;
    default:
      icon = 'user-plus';
      buttonText = 'Add Friend';
      break;
  }

  return (
    <StyledRoot focusRipple sx={{ ...sx, ...buttonSx }} {...rootProps}>
      <StyledButtonIcon icon={icon} />
      <StyledButtonText>{buttonText}</StyledButtonText>
    </StyledRoot>
  );
}
