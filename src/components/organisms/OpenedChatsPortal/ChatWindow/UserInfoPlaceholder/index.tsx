import { Box, Stack, Typography, useTheme } from '@mui/material';

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
    <StyledRoot sx={sx} {...rootProps} spacing={2}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: theme.spacing(1),
          backgroundColor:
            theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
          borderRadius: theme.spacing(2),
        }}>
        <UserAvatar
          userId={userData.id}
          size={72}
          usePopper={false}
          useLink={false}
          sx={{ mb: 1.5 }}
        />
        <Typography variant='h6' fontWeight={650} letterSpacing={0.4} textAlign='center'>
          {userData?.firstName} {userData?.lastName}
        </Typography>
      </Box>

      <Stack spacing={0.5} alignItems='center'>
        {isFriend && (
          <Typography variant='body2' color={theme.palette.text.secondary} textAlign='center'>
            You are friends on Clonedbook
          </Typography>
        )}
        {userData?.about.address && (
          <Typography variant='body2' color={theme.palette.text.secondary} textAlign='center'>
            Lives in {userData?.about.city}
          </Typography>
        )}
        {userData?.about.workplace ? (
          <Typography variant='body2' color={theme.palette.text.secondary} textAlign='center'>
            Works at {userData?.about.workplace}
          </Typography>
        ) : (
          userData?.about.highSchool ||
          (userData?.about.college && (
            <Typography variant='body2' color={theme.palette.text.secondary} textAlign='center'>
              Studied at {userData?.about.college || userData?.about.highSchool}
            </Typography>
          ))
        )}
      </Stack>

      <Typography
        variant='body2'
        color={theme.palette.text.secondary}
        fontStyle='italic'
        textAlign='center'
        fontSize='0.8rem'>
        This is the beginning of your conversation with {userData?.firstName}
      </Typography>
    </StyledRoot>
  );
}
