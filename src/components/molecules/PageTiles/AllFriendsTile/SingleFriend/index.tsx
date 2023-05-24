import { Typography, useTheme } from '@mui/material';

import { StyledRoot } from './styles';

import FriendPicture from '@/components/atoms/FriendPicture';
import AddFriendButton from '@/components/atoms/FriendsButton';
import useGetUsersPublicData from '@/hooks/useGetUsersPublicData';
import { SingleFriendProps } from './types';

export default function SingleFriend({ friendId, sx, ...rootProps }: SingleFriendProps) {
  const theme = useTheme();
  const friend = useGetUsersPublicData(friendId);
  if (!friend) return null;
  return (
    <StyledRoot sx={sx} {...rootProps} direction='row' alignItems='center' spacing={2}>
      <FriendPicture friendId={friendId} sx={{ height: '100%', maxHeight: '80px' }} />
      <Typography variant='subtitle1' fontWeight={550}>
        {friend?.firstName} {friend.lastName}
      </Typography>
    </StyledRoot>
  );
}
