import { Stack, Typography, useTheme } from '@mui/material';

import { StyledRoot } from './styles';

import useGetFriendshipStatus from '@/common/friendsManage/useGetFriendshipStatus';
import UserAvatar from '@/components/atoms/UserAvatar';
import { UserInfoPlaceholderProps } from './types';
/**
 * @description - Placeholder that is shown of the chat scrollable box
 */

export default function UserInfoPlaceholder({
  userData,
  sx,
  ...rootProps
}: UserInfoPlaceholderProps) {
  const theme = useTheme();
  const isFriend = useGetFriendshipStatus(userData.id) === 'accepted';
  return (
    <StyledRoot sx={sx} {...rootProps} spacing={1}>
      <UserAvatar userId={userData.id} size={52} usePopper={false} useLink={false} />
      <Typography variant='h6' fontWeight={650} letterSpacing={0.4}>
        {userData?.firstName} {userData?.lastName}
      </Typography>
      <Stack spacing={0.5} alignItems='center'>
        {isFriend && (
          <Typography variant='body2' color={theme.palette.text.secondary}>
            You are friends on Clonedbook
          </Typography>
        )}
        {userData?.about.address && (
          <Typography variant='body2' color={theme.palette.text.secondary}>
            Lives in {userData?.about.city}
          </Typography>
        )}
        {userData?.about.workplace ? (
          <Typography variant='body2' color={theme.palette.text.secondary}>
            Works at {userData?.about.workplace}
          </Typography>
        ) : (
          userData?.about.highSchool ||
          (userData?.about.college && (
            <Typography variant='body2' color={theme.palette.text.secondary}>
              Studied at {userData?.about.college || userData?.about.highSchool}
            </Typography>
          ))
        )}
      </Stack>
    </StyledRoot>
  );
}
