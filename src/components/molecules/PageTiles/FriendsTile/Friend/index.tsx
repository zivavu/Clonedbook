import { StyledRoot } from './styles';

import FriendPicture from '@/components/atoms/FriendPicture';
import Link from '@/components/atoms/Link';
import { useFetchLoggedUserQuery } from '@/features/userAPI';
import useGetUsersPublicFriends from '@/hooks/useFetchUsersPublicFriends';
import useGetUsersPublicData from '@/hooks/useGetUsersPublicData';
import { FriendProps } from './types';
import useGetMutalFriends from '@/hooks/useGetMutalFriends';

export default function Friend({ friendId, sx, ...rootProps }: FriendProps) {
  const friend = useGetUsersPublicData(friendId);
  const mutalFriends = useGetMutalFriends(friendId);
  if (!friend) return null;
  return (
    <StyledRoot sx={sx} {...rootProps} spacing={1}>
      <FriendPicture friendId={friendId} />
      <Link variant='body2' fontWeight={500} href={`/profile/${friendId}`}>
        {friend.firstName} {friend.lastName}
      </Link>
    </StyledRoot>
  );
}
