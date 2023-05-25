import { Stack } from '@mui/material';

import useGetUsersPublicFriends from '@/hooks/useFetchUsersPublicFriends';
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
        <Stack key={friend.id} width='48%' my={1.5}>
          <SingleFriend friendId={friend.id} />
        </Stack>
      ))}
    </StyledFriendsSectionStack>
  );
}
