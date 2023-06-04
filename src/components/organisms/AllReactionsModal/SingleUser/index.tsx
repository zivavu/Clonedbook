import { Box, Stack, useTheme } from '@mui/material';

import AddFriendButton from '@/components/atoms/AddFriendButton';
import Link from '@/components/atoms/Link';
import ReactionIcon from '@/components/atoms/ReactionIcon';
import UserAvatar from '@/components/atoms/UserAvatar';
import MutalFriendsDisplay from '@/components/molecules/MutalFriendsDisplay';
import { SingleUserProps } from './types';

export default function SingleUser({
  reaction,
  reactionsByTypes,
  sx,
  ...rootProps
}: SingleUserProps) {
  const theme = useTheme();
  const { firstName, lastName, id: profileId } = reaction.info;
  return (
    <Stack sx={sx} {...rootProps} direction='row' alignItems='center' pr={2}>
      <Box position='relative'>
        <UserAvatar userId={profileId} mr={theme.spacing(1)} size={40} />
        <ReactionIcon
          src={reactionsByTypes[reaction.type].icon}
          sx={{ position: 'absolute', bottom: '-4px', right: '10px' }}
          showBorder={false}
          size={16}
        />
      </Box>
      <Stack>
        <Link href={`/profile/${profileId}`} lineHeight='1rem'>
          {firstName} {lastName}
        </Link>
        <MutalFriendsDisplay userId={profileId} avatarsToShow={0} />
      </Stack>
      <AddFriendButton
        friendId={profileId}
        sx={{ marginLeft: 'auto', padding: theme.spacing(0.9, 1.5) }}
      />
    </Stack>
  );
}
