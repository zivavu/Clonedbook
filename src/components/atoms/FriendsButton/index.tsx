import { useTheme } from '@mui/material';

import { StyledButtonIcon, StyledButtonText, StyledFriendsButton, StyledRoot } from './styles';

import { useFetchUserQuery } from '@/features/userAPI';
import { TFriendStatus } from '@/types/firend';
import getFriendshipStatus from '@/utils/getFriendshipStatus';
import { useEffect, useState } from 'react';
import { FriendsButtonProps } from './types';

export default function FriendsButton({ friendsMap, sx, ...rootProps }: FriendsButtonProps) {
  const theme = useTheme();
  const { data: user } = useFetchUserQuery({});
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

  return (
    <StyledRoot sx={sx} {...rootProps}>
      {!userStatus && (
        <StyledFriendsButton sx={{ ...buttonSx }}>
          <StyledButtonIcon icon='user-plus' />
          <StyledButtonText>Add Friend</StyledButtonText>
        </StyledFriendsButton>
      )}
      {userStatus === 'pending' && (
        <StyledFriendsButton sx={{ ...buttonSx }}>
          <StyledButtonIcon icon='user-xmark' />
          <StyledButtonText>Cancel Request</StyledButtonText>
        </StyledFriendsButton>
      )}
      {userStatus === 'accepted' && (
        <StyledFriendsButton sx={{ ...buttonSx }}>
          <StyledButtonIcon icon='user-check' />
          <StyledButtonText>Friends</StyledButtonText>
        </StyledFriendsButton>
      )}
      {userStatus === 'rejected' ||
        (userStatus === 'blocked' && (
          <StyledFriendsButton sx={{ ...buttonSx }}>
            <StyledButtonIcon icon='user-xmark' />
            <StyledButtonText>Can&apos;t befriend</StyledButtonText>
          </StyledFriendsButton>
        ))}
    </StyledRoot>
  );
}
