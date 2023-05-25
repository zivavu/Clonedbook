import { Stack } from '@mui/material';

import useGetUsersPublicFriends from '@/hooks/useFetchUsersPublicFriends';
import { IPublicFriend } from '@/types/firend';
import SingleFriend from '../../SingleFriend';
import { StyledSectionStack } from '../../styles';
import { SectionProps } from '../../types';

export default function RecentlyAddedSection({ profileId, sx, ...rootProps }: SectionProps) {
  const publicFriends = useGetUsersPublicFriends(profileId);
  const currentDate = new Date();
  const months = 2.5;
  const recentLimit = 1000 * 60 * 60 * 24 * 30 * months;
  const friends = Object.entries(publicFriends || {})
    .sort(([idA, timestampA], [idB, timestampB]) => timestampA.seconds - timestampB.seconds)
    .map(([id, timestamp]) => {
      return {
        id,
        timestamp,
      } as IPublicFriend;
    })
    .filter((friend) => {
      const friendDate = new Date(friend.timestamp.seconds * 1000);
      return currentDate.getTime() - recentLimit < friendDate.getTime();
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
