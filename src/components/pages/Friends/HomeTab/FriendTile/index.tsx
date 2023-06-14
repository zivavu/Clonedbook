import { Stack, Typography, useTheme } from '@mui/material';

import useGetMutualFriends from '@/common/friendsManage/useGetMutualFriends';
import useGetUserBasicInfo from '@/common/misc/userDataManagment/useGetUsersPublicData';
import UserAvatar from '@/components/atoms/UserAvatar';
import UserLink from '@/components/atoms/UserLink';
import UserPicture from '@/components/atoms/UserPicture';
import AddFriendButton from '@/components/atoms/friendActionButtons/AddFriendButton';
import RemoveFriendButton from '@/components/atoms/friendActionButtons/RemoveFriendButton';
import { StyledRoot } from './styles';
import { FriendTileProps } from './types';

export default function FriendTile({
  userId,
  sx,
  allowRemove = true,
  ...rootProps
}: FriendTileProps) {
  const theme = useTheme();
  const user = useGetUserBasicInfo(userId);
  const mutualFriends = useGetMutualFriends(userId);
  if (!user) return null;
  return (
    <StyledRoot sx={sx} {...rootProps}>
      <Stack
        sx={{
          borderRadius: theme.spacing(1),
          border: `1px solid ${theme.palette.divider}`,
          margin: theme.spacing(1),
        }}>
        <UserPicture
          sizes='150px'
          userId={userId}
          sx={{ borderBottomRightRadius: 0, borderBottomLeftRadius: 0, border: 'none' }}
        />
        <Stack p={1.5} bgcolor={theme.palette.background.paper} spacing={1}>
          <UserLink
            userId={userId}
            variant='subtitle1'
            fontWeight={600}
            lineHeight='1rem'
            usePopper={false}
          />
          {mutualFriends.length > 0 && (
            <Stack direction='row' pl={0.5}>
              {mutualFriends.slice(0, 2).map((friend, i) => (
                <UserAvatar
                  key={friend.id}
                  userId={friend.id}
                  size={18}
                  showBorder={true}
                  sx={{
                    zIndex: 2 - i,
                    marginLeft: theme.spacing(-0.5),
                  }}
                />
              ))}
              <Typography variant='body1' color={theme.palette.text.secondary} ml={0.5}>
                {mutualFriends.length} mutual friends
              </Typography>
            </Stack>
          )}
          <AddFriendButton friendId={userId} sx={{ height: '36px' }} showIcon={false} />
          {allowRemove && <RemoveFriendButton friendId={userId} sx={{ height: '36px' }} />}
        </Stack>
      </Stack>
    </StyledRoot>
  );
}
