import { Box, Stack, Typography, useTheme } from '@mui/material';

import useGetMutualFriends from '@/common/friendsManage/useGetMutualFriends';
import UserLink from '@/components/atoms/UserLink';
import { Fragment } from 'react';
import { MutualFriendsTextOnlyProps } from './types';

export default function MutualFriendsTextOnly({
  userId,
  size = 'small',
  friendsToInclude = 4,
  sx,
  ...rootProps
}: MutualFriendsTextOnlyProps) {
  const theme = useTheme();
  const mutualFriends = useGetMutualFriends(userId);
  return (
    <Box sx={sx} {...rootProps}>
      {mutualFriends.length > 0 && (
        <Stack direction='row'>
          <Typography
            variant={size === 'small' ? 'body2' : 'subtitle2'}
            sx={{
              whiteSpace: 'pre-wrap',
            }}
            lineHeight='1.2rem'
            color={theme.palette.text.secondary}>
            {mutualFriends.length} {mutualFriends.length === 1 ? 'mutual friend' : 'mutual friends'}
            {friendsToInclude > 0 && mutualFriends.length > 0 && (
              <>
                {' '}
                including{' '}
                {mutualFriends.slice(0, friendsToInclude).map((friend, i) => (
                  <Fragment key={friend.id}>
                    {i === friendsToInclude - 1 && 'and '}
                    <UserLink userId={friend.id} usePopper={false} />
                    {i !== friendsToInclude - 1 && ', '}
                  </Fragment>
                ))}
              </>
            )}
          </Typography>
        </Stack>
      )}
    </Box>
  );
}
