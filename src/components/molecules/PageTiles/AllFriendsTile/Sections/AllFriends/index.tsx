import { Stack } from '@mui/material';

import useGetUsersPublicFriends from '@/hooks/useFetchUsersPublicFriends';
import { IPublicFriend } from '@/types/firend';
import SingleFriend from '../../SingleFriend';
import { StyledSectionStack } from '../../styles';
import { SectionProps } from '../../types';

export default function AllFriendsSection({ profileId, sx, ...rootProps }: SectionProps) {
  const publicFriends = useGetUsersPublicFriends(profileId);
  if (!publicFriends) return null;
  const friends = Object.entries(publicFriends).map(([id, timestamp]) => {
    return {
      id,
      timestamp,
    } as IPublicFriend;
  });

  return (
    <StyledSectionStack sx={sx} {...rootProps}>
      {friends.map((friend) => (
        <Stack key={friend.id} width='48%' my={1.5}>
          <SingleFriend friendId={friend.id} />
        </Stack>
      ))}
    </StyledSectionStack>
  );
}
