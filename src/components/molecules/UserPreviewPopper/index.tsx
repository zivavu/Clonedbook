import { Fade, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';

import { StyledButtonsStack, StyledPopper, StyledPopperBody } from './styles';

import useGetUserPublicData from '@/common/misc/userDataManagment/useGetUsersPublicData';
import useGetUsersPublicFriends from '@/common/misc/userDataManagment/useGetUsersPublicFriends';
import UserAvatar from '@/components/atoms/UserAvatar';
import AddFriendButton from '@/components/atoms/friendActionButtons/AddFriendButton';
import LoginAsUserButton from '@/components/atoms/friendActionButtons/LoginAsUserButton';
import MessageButton from '@/components/atoms/friendActionButtons/MessageButton';
import MutalFriendsWithAvatars from '../MutalFriendsDisplay/MutalFriendsWithAvatars';
import { UserPreviewPopperProps } from './types';
import MutalFriendsTextOnly from '../MutalFriendsDisplay/MutalFriendsTextOnly';
import UserLink from '@/components/atoms/UserLink';
import themeSlice from '@/redux/features/themeSlice';

/**
 * @description - Popper used to display basic user info and actions,
 *  showed while hovering profile related components (e.g. UserAvatar).
 */

export default function UserPreviewPopper({
  anchorEl,
  open,
  userId,
  handleMouseOver,
  handleMouseOut,
  sx,
  ...rootProps
}: UserPreviewPopperProps) {
  const theme = useTheme();
  const userData = useGetUserPublicData(userId);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('xs'));
  if (!userData) return null;
  return (
    <StyledPopper {...rootProps} anchorEl={anchorEl} open={open} sx={sx} placement='top' transition>
      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={250}>
          <StyledPopperBody onMouseEnter={handleMouseOver} onMouseLeave={handleMouseOut}>
            <Stack direction='row' spacing={2}>
              <UserAvatar userId={userId} usePopper={false} size={isSmallScreen ? 60 : 96} />
              <Stack>
                <UserLink variant='h4' fontWeight={700} userId={userId}>
                  {userData.firstName} {userData.lastName}
                </UserLink>

                <MutalFriendsTextOnly userId={userId} size='medium' mt={1} />
              </Stack>
            </Stack>
            <StyledButtonsStack direction={isSmallScreen ? 'column' : 'row'}>
              <AddFriendButton
                friendId={userId}
                allowMenu
                sx={{
                  width: isSmallScreen ? '100%' : 'auto',
                  padding: theme.spacing(1.2, 2),
                }}
              />
              <MessageButton
                userId={userId}
                sx={{
                  width: isSmallScreen ? '100%' : 'auto',
                  padding: theme.spacing(1.2, 2),
                }}
              />
              <LoginAsUserButton
                userId={userId}
                sx={{
                  width: isSmallScreen ? '100%' : 'auto',
                  padding: theme.spacing(1.2, 2),
                }}
              />
            </StyledButtonsStack>
          </StyledPopperBody>
        </Fade>
      )}
    </StyledPopper>
  );
}
