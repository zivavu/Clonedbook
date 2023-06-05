import { StyledButtonText, StyledRoot } from './styles';

import { updateFriendshipStatus } from '@/common/updateData/friends/updateFriendshipStatus';
import { useFetchLoggedUserQuery } from '@/redux/services/userAPI';
import { MouseEvent } from 'react';
import { RemoveFriendButtonProps } from './types';

export default function RemoveFriendButton({
  friendId,
  sx,
  ...rootProps
}: RemoveFriendButtonProps) {
  const { data: loggedUser, refetch } = useFetchLoggedUserQuery({});

  async function handleRemoveFriend(e: MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    if (!loggedUser?.id) return;
    await updateFriendshipStatus({ friend: friendId, loggedUser: loggedUser?.id, newStatus: null });
    refetch();
  }
  return (
    <StyledRoot sx={sx} {...rootProps} onClick={handleRemoveFriend}>
      <StyledButtonText>Remove</StyledButtonText>
    </StyledRoot>
  );
}
