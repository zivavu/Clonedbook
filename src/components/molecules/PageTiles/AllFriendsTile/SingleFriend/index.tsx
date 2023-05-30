import { Box, Link, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';

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
  const smallScreen = useMediaQuery(theme.breakpoints.down('xs'));
  if (!friend) return null;
  return (
    <StyledRoot
      sx={sx}
      {...rootProps}
      direction='row'
      alignItems='center'
      justifyContent='space-between'>
      <Stack direction='row' alignItems='center' height='100%' spacing={2}>
        <FriendPicture
          friendId={friendId}
          sx={{
            height: smallScreen ? '80%' : '100%',
          }}
        />
        <Stack spacing={smallScreen ? 1 : 0}>
          <Box>
            <Link href={`/profile/${friend.id}`}>
              <Typography lineHeight='1rem' variant='subtitle1' fontWeight={550}>
                {friend?.firstName} {friend.lastName}
              </Typography>
            </Link>
            <Typography color={theme.palette.text.secondary} fontWeight={400}>
              {mutalFrineds?.length} mutual friends
            </Typography>
          </Box>
          {smallScreen && <AddFriendButton friendId={friendId} sx={{ minHeight: '36px' }} />}
        </Stack>
      </Stack>
      {!smallScreen && <AddFriendButton friendId={friendId} sx={{ height: '36px' }} />}
    </StyledRoot>
  );
}
