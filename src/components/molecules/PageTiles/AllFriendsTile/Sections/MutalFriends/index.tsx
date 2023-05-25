import { Stack } from '@mui/material';

import useGetMutalFriends from '@/hooks/useGetMutalFriends';
import SingleFriend from '../../SingleFriend';
import { StyledSectionStack } from '../../styles';
import { SectionProps } from '../../types';

export default function MutalFriendsSection({ profileId, sx, ...rootProps }: SectionProps) {
  const mutalFriends = useGetMutalFriends(profileId);

  return (
    <StyledSectionStack sx={sx} {...rootProps}>
      {mutalFriends.map((friend) => (
        <Stack key={friend.id} width='48%' my={1.5}>
          <SingleFriend friendId={friend.id} />
        </Stack>
      ))}
    </StyledSectionStack>
  );
}
