import {
  Box,
  CircularProgress,
  ClickAwayListener,
  MenuList,
  Popper,
  SxProps,
  Typography,
  darken,
  lighten,
  useTheme,
} from '@mui/material';

import {
  StyledButtonIcon,
  StyledButtonText,
  StyledMenuItem,
  StyledPopperContent,
  StyledRoot,
} from './styles';

import useGetFriendshipStatus from '@/common/friendsManage/useGetFriendshipStatus';
import { useGetLoggedUserQuery } from '@/redux/services/loggedUserAPI';
import { updateFriendshipStatus } from '@/services/friends/updateFriendshipStatus';
import { TFriendStatus } from '@/types/firend';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { useRef, useState } from 'react';
import Icon from '../../Icon/Icon';
import { AddFriendButtonProps } from './types';

export default function AddFriendButton({
  friendId,
  showIcon = true,
  allowMenu = false,
  refetchOtherUser,
  sx,
  ...rootProps
}: AddFriendButtonProps) {
  const theme = useTheme();
  const userStatus = useGetFriendshipStatus(friendId);
  const { data: loggedUser, refetch: refetchLoggedUser } = useGetLoggedUserQuery({});
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const anchorElRef = useRef<HTMLButtonElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleUpdateFriendshipStatus(newStatus: TFriendStatus | null) {
    if (!loggedUser?.id) return;
    setIsLoading(true);
    setIsMenuOpen(false);
    await updateFriendshipStatus({ friendId: friendId, loggedUserId: loggedUser?.id, newStatus });
    await refetchLoggedUser();
    if (refetchOtherUser) refetchOtherUser();
    setIsLoading(false);
  }

  const buttonColor =
    userStatus === 'accepted' ? theme.palette.secondary.dark : theme.palette.primary.main;
  const textColor = theme.palette.getContrastText(buttonColor);

  const buttonSx: SxProps = {
    backgroundColor: buttonColor,
    color: textColor,
    '&:hover': {
      backgroundColor:
        theme.palette.mode === 'light' ? darken(buttonColor, 0.1) : lighten(buttonColor, 0.1),
    },
  };
  const iconColor =
    userStatus === 'accepted' ? theme.palette.secondary.contrastText : theme.palette.common.white;

  let icon: IconProp;
  let buttonText;
  let clickHandler: (e: React.MouseEvent<HTMLButtonElement>) => void;
  let disabled = false;
  switch (userStatus) {
    case 'accepted':
      icon = 'user-check';
      buttonText = 'Friends';
      disabled = allowMenu ? false : true;
      clickHandler = (e) => {
        e.stopPropagation();
        if (allowMenu) setIsMenuOpen(true);
      };
      break;
    case 'req_sent':
      icon = 'user-xmark';
      buttonText = 'Cancel Request';
      clickHandler = (e) => {
        e.stopPropagation();
        handleUpdateFriendshipStatus(null);
      };
      break;
    case 'req_received':
      icon = 'user-plus';
      buttonText = allowMenu ? 'Respond' : 'Accept';
      clickHandler = (e) => {
        e.stopPropagation();
        if (allowMenu) setIsMenuOpen(true);
        else handleUpdateFriendshipStatus('accepted');
      };
      break;
    default:
      icon = 'user-plus';
      buttonText = 'Add Friend';
      clickHandler = () => {
        handleUpdateFriendshipStatus('req_sent');
      };
      break;
  }

  if (loggedUser?.id === friendId) return null;
  return (
    <>
      <StyledRoot
        ref={anchorElRef}
        focusRipple
        disabled={disabled || isLoading}
        sx={{ ...buttonSx, ...sx }}
        {...rootProps}
        onClick={clickHandler}>
        {isLoading ? (
          <Box width='24px' pr={0.5}>
            <CircularProgress thickness={6} size={18} sx={{ color: theme.palette.common.white }} />
          </Box>
        ) : (
          showIcon && <StyledButtonIcon icon={icon} color={iconColor} />
        )}
        <StyledButtonText>{buttonText}</StyledButtonText>
      </StyledRoot>

      {allowMenu && (
        <Popper
          anchorEl={anchorElRef.current}
          open={isMenuOpen}
          sx={{
            zIndex: theme.zIndex.modal + 20,
          }}>
          <ClickAwayListener onClickAway={() => setIsMenuOpen(false)}>
            <StyledPopperContent>
              <MenuList>
                {userStatus === 'accepted' && (
                  <StyledMenuItem onClick={() => handleUpdateFriendshipStatus(null)}>
                    <Icon icon='user-xmark' fontSize={16} />
                    <Typography ml={1}>Unfriend</Typography>
                  </StyledMenuItem>
                )}
                {userStatus === 'req_received' && (
                  <>
                    <StyledMenuItem onClick={() => handleUpdateFriendshipStatus('accepted')}>
                      <Icon icon='user-check' fontSize={16} />
                      <Typography ml={1}>Accept</Typography>
                    </StyledMenuItem>
                    <StyledMenuItem onClick={() => handleUpdateFriendshipStatus(null)}>
                      <Icon icon='user-xmark' fontSize={16} />
                      <Typography ml={1}>Reject</Typography>
                    </StyledMenuItem>
                  </>
                )}
              </MenuList>
            </StyledPopperContent>
          </ClickAwayListener>
        </Popper>
      )}
    </>
  );
}
