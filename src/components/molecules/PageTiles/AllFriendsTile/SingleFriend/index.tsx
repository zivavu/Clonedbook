import { Link, Stack, Typography, useTheme } from '@mui/material';

import { StyledRoot } from './styles';

import AddFriendButton from '@/components/atoms/AddFriendButton';
import FriendPicture from '@/components/atoms/FriendPicture';
import useGetMutalFriends from '@/hooks/useGetMutalFriends';
import useGetUsersPublicData from '@/hooks/useGetUsersPublicData';
import { SingleFriendProps } from './types';

export default function SingleFriend({ friendId, sx, ...rootProps }: SingleFriendProps) {
  const theme = useTheme();
  const friend = useGetUsersPublicData(friendId);
  const mutalFrineds = useGetMutalFriends(friendId);
  if (!friend) return null;
  return (
    <StyledRoot
      sx={sx}
      {...rootProps}
      direction='row'
      alignItems='center'
      justifyContent='space-between'>
      <Stack direction='row' alignItems='center' height='100%' spacing={2}>
        <FriendPicture friendId={friendId} sx={{ height: '100%', maxHeight: '80px' }} />
        <Stack>
          <Link href={`/profile/${friend.id}`}>
            <Typography lineHeight='1rem' variant='subtitle1' fontWeight={550}>
              {friend?.firstName} {friend.lastName}
            </Typography>
          </Link>
          <Typography color={theme.palette.text.secondary} fontWeight={400}>
            {mutalFrineds?.length} mutual friends
          </Typography>
        </Stack>
      </Stack>
      <AddFriendButton friendId={friendId} sx={{ height: '36px' }} />
    </StyledRoot>
  );
}
