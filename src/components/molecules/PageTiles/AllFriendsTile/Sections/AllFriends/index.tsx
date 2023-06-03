import useGetUsersPublicFriends from '@/common/misc/userDataManagment/useGetUsersPublicFriends';
import { IPublicFriend } from '@/types/firend';
import SingleFriend from '../../SingleFriend';
import { StyledFriendsSectionStack } from '../../styles';
import { SectionProps } from '../../types';

export default function AllFriendsSection({ profileId, limit, sx, ...rootProps }: SectionProps) {
  const publicFriends = useGetUsersPublicFriends(profileId);
  if (!publicFriends) return null;
  const friends = Object.entries(publicFriends)
    .map(([id, timestamp]) => {
      return {
        id,
        timestamp,
      } as IPublicFriend;
    })
    .slice(0, limit);

  return (
    <StyledFriendsSectionStack sx={sx} {...rootProps}>
      {friends.map((friend) => (
        <SingleFriend key={friend.id} friendId={friend.id} />
      ))}
    </StyledFriendsSectionStack>
  );
}
