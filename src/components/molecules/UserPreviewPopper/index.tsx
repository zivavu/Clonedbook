import { Fade, Stack, Typography, useTheme } from '@mui/material';

import { StyledPopper, StyledPopperBody } from './styles';

import UserAvatar from '@/components/atoms/UserAvatar';
import LivesIn from '@/components/atoms/accountDetails/detailCategories/LivesIn';
import AddFriendButton from '@/components/atoms/friendActionButtons/AddFriendButton';
import MessageButton from '@/components/atoms/friendActionButtons/MessageButton';
import { useLoggedUserQuery } from '@/redux/services/loggedUserAPI';
import MutalFriendsDisplay from '../MutalFriendsDisplay';
import { UserPreviewPopperProps } from './types';

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
  const { data: user } = useLoggedUserQuery({});
  if (!user) return null;
  return (
    <StyledPopper
      {...rootProps}
      anchorEl={anchorEl}
      open={open}
      sx={sx}
      placement='top'
      transition
      disablePortal>
      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={250}>
          <StyledPopperBody onMouseEnter={handleMouseOver} onMouseLeave={handleMouseOut}>
            <Stack direction='row' spacing={2}>
              <UserAvatar userId={userId} usePopper={false} size={96} />
              <Stack spacing={1.5}>
                <Typography variant='h4' fontWeight={700}>
                  {user.firstName} {user.lastName}
                </Typography>
                <MutalFriendsDisplay userId={userId} avatarsToShow={4} size='medium' />
                <LivesIn userData={user} />
              </Stack>
            </Stack>
            <Stack direction='row' spacing={1} mt='auto' alignSelf='center'>
              <AddFriendButton friendId={userId} sx={{ padding: theme.spacing(1.3, 5) }} />
              <MessageButton userId={userId} sx={{ padding: theme.spacing(1.3, 5) }} />
            </Stack>
          </StyledPopperBody>
        </Fade>
      )}
    </StyledPopper>
  );
}
