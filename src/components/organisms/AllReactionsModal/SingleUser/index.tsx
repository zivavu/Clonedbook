import { Box, Stack, useTheme } from '@mui/material';

import ReactionIcon from '@/components/atoms/ReactionIcon';
import UserAvatar from '@/components/atoms/UserAvatar';
import UserLink from '@/components/atoms/UserLink';
import AddFriendButton from '@/components/atoms/friendActionButtons/AddFriendButton';
import MutualFriendsWithAvatars from '@/components/molecules/MutualFriendsDisplay/MutualFriendsWithAvatars';
import { SingleUserProps } from './types';

export default function SingleUser({
  reaction,
  reactionsByTypes,
  sx,
  ...rootProps
}: SingleUserProps) {
  const theme = useTheme();
  const { id: profileId } = reaction.info;
  return (
    <Stack sx={sx} {...rootProps} direction='row' alignItems='center' pr={2}>
      <Box position='relative'>
        <UserAvatar userId={profileId} mr={theme.spacing(1)} size={40} />
        <ReactionIcon
          type={reaction.type}
          sx={{ position: 'absolute', bottom: '-4px', right: '10px' }}
          showBorder={false}
          size={16}
        />
      </Box>
      <Stack>
        <UserLink userId={profileId} usePopper></UserLink>
        <MutualFriendsWithAvatars userId={profileId} avatarsToShow={0} />
      </Stack>
      <AddFriendButton
        friendId={profileId}
        sx={{ marginLeft: 'auto', padding: theme.spacing(0.9, 1.5) }}
      />
    </Stack>
  );
}
