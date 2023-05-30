import { SxProps, darken, useTheme } from '@mui/material';

import { StyledButtonIcon, StyledButtonText, StyledRoot } from './styles';

import useGetFriendshipStatus from '@/hooks/useGetFriendshipStatus';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { AddFriendButtonProps } from './types';

export default function AddFriendButton({
  friendId,
  showIcon = true,
  sx,
  ...rootProps
}: AddFriendButtonProps) {
  const theme = useTheme();
  const userStatus = useGetFriendshipStatus(friendId);

  const buttonColor =
    userStatus === 'accepted' ? theme.palette.secondary.dark : theme.palette.primary.main;
  const textColor = theme.palette.getContrastText(buttonColor);

  const buttonSx: SxProps = {
    backgroundColor: buttonColor,
    color: textColor,
    '&:hover': {
      backgroundColor: darken(buttonColor, 0.1),
    },
  };
  const iconColor =
    userStatus === 'accepted' ? theme.palette.secondary.contrastText : theme.palette.common.white;

  let icon: IconProp;
  let buttonText;
  switch (userStatus) {
    case 'accepted':
      icon = 'user-check';
      buttonText = 'Friends';
      break;
    case 'req_sent':
      icon = 'user-xmark';
      buttonText = 'Cancel Request';
      break;
    case 'req_received':
      icon = 'user-plus';
      buttonText = 'Confirm';
      break;
    default:
      icon = 'user-plus';
      buttonText = 'Add Friend';
      break;
  }

  return (
    <StyledRoot focusRipple sx={{ ...sx, ...buttonSx }} {...rootProps}>
      {showIcon && <StyledButtonIcon icon={icon} color={iconColor} />}
      <StyledButtonText>{buttonText}</StyledButtonText>
    </StyledRoot>
  );
}
