import { StyledButtonText, StyledRoot } from './styles';

import { updateFriendshipStatus } from '@/common/firebase/updateData/friends/updateFriendshipStatus';
import { useLoggedUserQuery } from '@/redux/services/loggedUserAPI';
import { MouseEvent } from 'react';
import { RemoveFriendButtonProps } from './types';

export default function RemoveFriendButton({
  friendId,
  sx,
  ...rootProps
}: RemoveFriendButtonProps) {
  const { data: loggedUser, refetch } = useLoggedUserQuery({});

  async function handleRemoveFriend(e: MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    if (!loggedUser?.id) return;
    await updateFriendshipStatus({
      friendId: friendId,
      loggedUserId: loggedUser?.id,
      newStatus: null,
    });
    refetch();
  }
  return (
    <StyledRoot sx={sx} {...rootProps} onClick={handleRemoveFriend}>
      <StyledButtonText>Remove</StyledButtonText>
    </StyledRoot>
  );
}
