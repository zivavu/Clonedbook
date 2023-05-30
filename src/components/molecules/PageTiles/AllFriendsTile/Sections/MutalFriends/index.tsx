import useGetMutalFriends from '@/hooks/useGetMutalFriends';
import SingleFriend from '../../SingleFriend';
import { StyledFriendsSectionStack } from '../../styles';
import { SectionProps } from '../../types';

export default function MutalFriendsSection({ profileId, limit, sx, ...rootProps }: SectionProps) {
  const mutalFriends = useGetMutalFriends(profileId).slice(0, limit);

  return (
    <StyledFriendsSectionStack sx={sx} {...rootProps}>
      {mutalFriends.map((friend) => (
        <SingleFriend key={friend.id} friendId={friend.id} />
      ))}
    </StyledFriendsSectionStack>
  );
}
