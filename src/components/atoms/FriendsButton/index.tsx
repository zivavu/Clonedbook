import { useTheme } from '@mui/material';

import { StyledButtonIcon, StyledButtonText, StyledFriendsButton } from './styles';

import { useFetchLoggedUserQuery } from '@/features/userAPI';
import { TFriendStatus } from '@/types/firend';
import getFriendshipStatus from '@/utils/getFriendshipStatus';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { useEffect, useState } from 'react';
import { FriendsButtonProps } from './types';

export default function FriendsButton({ friendsMap, sx, ...rootProps }: FriendsButtonProps) {
  const theme = useTheme();
  const { data: user } = useFetchLoggedUserQuery({});
  const [userStatus, setUserStatus] = useState<TFriendStatus | null>(null);
  useEffect(() => {
    if (friendsMap && user) {
      setUserStatus(getFriendshipStatus(user.profileId, friendsMap));
    }
  }, [user]);

  const buttonColor =
    userStatus === 'accepted' ? theme.palette.secondary.dark : theme.palette.primary.main;
  const textColor = theme.palette.getContrastText(buttonColor);
  const buttonSx = {
    backgroundColor: buttonColor,
    color: textColor,
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
    case 'rejected':
    case 'blocked':
      icon = 'user-xmark';
      buttonText = "Can't befriend";
      break;
    default:
      icon = 'user-plus';
      buttonText = 'Add Friend';
      break;
  }

  return (
    <StyledFriendsButton sx={{ ...sx, ...buttonSx }} {...rootProps}>
      <StyledButtonIcon icon={icon} />
      <StyledButtonText>{buttonText}</StyledButtonText>
    </StyledFriendsButton>
  );
}
