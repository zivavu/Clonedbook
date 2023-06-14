import useGetMutualFriends from '@/common/friendsManage/useGetMutualFriends';
import SingleFriend from '../../SingleFriend';
import { StyledFriendsSectionStack } from '../../styles';
import { SectionProps } from '../../types';

export default function MutualFriendsSection({ profileId, limit, sx, ...rootProps }: SectionProps) {
  const mutualFriends = useGetMutualFriends(profileId).slice(0, limit);

  return (
    <StyledFriendsSectionStack sx={sx} {...rootProps}>
      {mutualFriends.map((friend) => (
        <SingleFriend key={friend.id} friendId={friend.id} />
      ))}
    </StyledFriendsSectionStack>
  );
}
