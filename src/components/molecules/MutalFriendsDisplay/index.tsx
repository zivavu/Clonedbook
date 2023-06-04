import { Box, Stack, Typography, useTheme } from '@mui/material';

import useGetMutalFriends from '@/common/friendsManage/useGetMutalFriends';
import UserAvatar from '@/components/atoms/UserAvatar';
import { MutalFriendsDisplayProps } from './types';

export default function MutalFriendsDisplay({
  userId,
  avatarsToShow = 5,
  sx,
  ...rootProps
}: MutalFriendsDisplayProps) {
  const theme = useTheme();
  const mutalFriends = useGetMutalFriends(userId);
  return (
    <Box sx={sx} {...rootProps}>
      {mutalFriends.length > 0 && (
        <Stack direction='row'>
          {avatarsToShow > 0 &&
            mutalFriends.slice(0, avatarsToShow).map((friend, i) => (
              <UserAvatar
                key={friend.id}
                userId={friend.id}
                size={16}
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
          <Typography
            variant='body2'
            color={theme.palette.text.secondary}
            ml={avatarsToShow > 0 ? 0.5 : 0}>
            {mutalFriends.length} {mutalFriends.length === 1 ? 'mutal friend' : 'mutal friends'}
          </Typography>
        </Stack>
      )}
    </Box>
  );
}
