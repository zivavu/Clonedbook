import { Grow, Stack, useMediaQuery, useTheme } from '@mui/material';

import { StyledButtonsStack, StyledPopper, StyledPopperBody } from './styles';

import useGetUserPublicData from '@/common/misc/userDataManagment/useGetUsersPublicData';
import UserAvatar from '@/components/atoms/UserAvatar';
import UserLink from '@/components/atoms/UserLink';
import AddFriendButton from '@/components/atoms/friendActionButtons/AddFriendButton';
import LoginAsUserButton from '@/components/atoms/friendActionButtons/LoginAsUserButton';
import MessageButton from '@/components/atoms/friendActionButtons/MessageButton';
import MutalFriendsTextOnly from '../MutalFriendsDisplay/MutalFriendsTextOnly';
import { UserPreviewPopperProps } from './types';

/**
 * @description - Popper used to display basic user info and actions,
 *  showed while hovering profile related components (e.g. UserAvatar).
 */

export default function UserPreviewPopper({
  anchorEl,
  open,
  userId,
  handleMouseEnter,
  handleMouseLeave,
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
        <Grow {...TransitionProps} timeout={250}>
          <StyledPopperBody onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <Stack direction='row' spacing={2}>
              <UserAvatar userId={userId} usePopper={false} size={isSmallScreen ? 60 : 96} />
              <Stack>
                <UserLink variant='h4' fontWeight={700} userId={userId} />

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
        </Grow>
      )}
    </StyledPopper>
  );
}
