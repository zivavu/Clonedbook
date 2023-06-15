import useGetMutualFriends from '@/common/friendsManage/useGetMutualFriends';
import useGetUserBasicInfo from '@/common/misc/userDataManagment/useGetUsersPublicData';
import UserLink from '@/components/atoms/UserLink';
import UserPicture from '@/components/atoms/UserPicture';
import { ImageListItem, Typography, useTheme } from '@mui/material';
import { FriendProps } from './types';

export default function Friend({ friendId, sx, ...rootProps }: FriendProps) {
  const theme = useTheme();
  const friend = useGetUserBasicInfo(friendId);
  const mutualFriends = useGetMutualFriends(friendId);

  if (!friend) return null;
  return (
    <ImageListItem sx={{ marginBottom: theme.spacing(1.5), ...sx }} {...rootProps}>
      <UserPicture userId={friendId} sizes='150px' mb={0.5} />
      <UserLink variant='body2' fontWeight={500} userId={friendId} />
      <Typography variant='body2' lineHeight='0.7rem' color={theme.palette.text.secondary}>
        {mutualFriends.length} mutual friends
      </Typography>
    </ImageListItem>
  );
}
