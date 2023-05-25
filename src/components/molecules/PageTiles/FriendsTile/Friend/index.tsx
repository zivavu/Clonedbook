import { StyledRoot } from './styles';

import FriendPicture from '@/components/atoms/FriendPicture';
import Link from '@/components/atoms/Link';
import useGetMutalFriends from '@/hooks/useGetMutalFriends';
import useGetUsersPublicData from '@/hooks/useGetUsersPublicData';
import { Box, Typography, useTheme } from '@mui/material';
import { FriendProps } from './types';

export default function Friend({ friendId, sx, ...rootProps }: FriendProps) {
  const theme = useTheme();
  const friend = useGetUsersPublicData(friendId);
  const mutalFriends = useGetMutalFriends(friendId);
  if (!friend) return null;
  return (
    <StyledRoot sx={sx} {...rootProps} spacing={0.5}>
      <FriendPicture friendId={friendId} />
      <Box>
        <Link variant='body2' fontWeight={500} href={`/profile/${friendId}`}>
          {friend.firstName} {friend.lastName}
        </Link>
        <Typography variant='body2' lineHeight='0.7rem' color={theme.palette.text.secondary}>
          {mutalFriends.length} mutal friends
        </Typography>
      </Box>
    </StyledRoot>
  );
}
