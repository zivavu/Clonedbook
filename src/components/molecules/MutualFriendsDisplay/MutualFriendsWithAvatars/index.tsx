import { Box, Stack, Typography, useTheme } from '@mui/material';

import useGetMutualFriends from '@/common/friendsManage/useGetMutualFriends';
import UserAvatar from '@/components/atoms/UserAvatar';
import { MutualFriendsWithAvatarsProps } from './types';

export default function MutualFriendsWithAvatars({
  userId,
  avatarsToShow = 5,
  size = 'small',
  sx,
  ...rootProps
}: MutualFriendsWithAvatarsProps) {
  const theme = useTheme();
  const mutualFriends = useGetMutualFriends(userId);
  return (
    <Box sx={sx} {...rootProps}>
      {mutualFriends.length > 0 && (
        <Stack direction='row' alignItems='center'>
          {avatarsToShow > 0 &&
            mutualFriends.slice(0, avatarsToShow).map((friend, i) => (
              <UserAvatar
                key={friend.id}
                userId={friend.id}
                size={size === 'small' ? 16 : 24}
                useLink={false}
                showBorder={true}
                sx={{
                  zIndex: avatarsToShow - i,
                  marginLeft: theme.spacing(-0.5),
                  '&: first-of-type': {
                    marginLeft: 0,
                  },
                }}
              />
            ))}
          <Stack direction='row' flexWrap='wrap'>
            <Typography
              variant={size === 'small' ? 'body2' : 'body1'}
              color={theme.palette.text.secondary}
              ml={avatarsToShow > 0 ? 0.5 : 0}>
              {mutualFriends.length}{' '}
              {mutualFriends.length === 1 ? 'mutual friend' : 'mutual friends'}
            </Typography>
          </Stack>
        </Stack>
      )}
    </Box>
  );
}
