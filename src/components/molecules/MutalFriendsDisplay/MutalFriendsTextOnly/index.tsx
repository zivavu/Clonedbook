import { Box, Stack, Typography, useTheme } from '@mui/material';

import useGetMutalFriends from '@/common/friendsManage/useGetMutalFriends';
import { MutalFriendsTextOnlyProps } from './types';
import UserLink from '@/components/atoms/UserLink';
import React, { Fragment } from 'react';

export default function MutalFriendsTextOnly({
  userId,
  size = 'small',
  friendsToInclude = 4,
  sx,
  ...rootProps
}: MutalFriendsTextOnlyProps) {
  const theme = useTheme();
  const mutalFriends = useGetMutalFriends(userId);
  return (
    <Box sx={sx} {...rootProps}>
      {mutalFriends.length > 0 && (
        <Stack direction='row'>
          <Typography
            variant={size === 'small' ? 'body2' : 'subtitle2'}
            sx={{
              whiteSpace: 'pre-wrap',
            }}
            lineHeight='1.2rem'
            color={theme.palette.text.secondary}>
            {mutalFriends.length} {mutalFriends.length === 1 ? 'mutal friend' : 'mutal friends'}
            {friendsToInclude > 0 && mutalFriends.length > 0 && (
              <>
                {' '}
                including{' '}
                {mutalFriends.slice(0, friendsToInclude).map((friend, i) => (
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
