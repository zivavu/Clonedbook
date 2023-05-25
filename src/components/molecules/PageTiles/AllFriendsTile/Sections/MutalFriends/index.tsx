import { Stack } from '@mui/material';

import useGetMutalFriends from '@/hooks/useGetMutalFriends';
import SingleFriend from '../../SingleFriend';
import { StyledFriendsSectionStack } from '../../styles';
import { SectionProps } from '../../types';

export default function MutalFriendsSection({ profileId, limit, sx, ...rootProps }: SectionProps) {
  const mutalFriends = useGetMutalFriends(profileId).slice(0, limit);

  return (
    <StyledFriendsSectionStack sx={sx} {...rootProps}>
      {mutalFriends.map((friend) => (
        <Stack key={friend.id} width='48%' my={1.5}>
          <SingleFriend friendId={friend.id} />
        </Stack>
      ))}
    </StyledFriendsSectionStack>
  );
}
