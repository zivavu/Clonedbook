import {
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
import { updateFriendshipStatus } from '@/common/updateData/friends/updateFriendshipStatus';
import { useFetchLoggedUserQuery } from '@/redux/services/loggedUserAPI';
import { TFriendStatus } from '@/types/firend';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { useRef, useState } from 'react';
import Icon from '../../Icon/Icon';
import { AddFriendButtonProps } from './types';

export default function AddFriendButton({
  friendId,
  showIcon = true,
  allowMenu = false,
  sx,
  ...rootProps
}: AddFriendButtonProps) {
  const theme = useTheme();
  const userStatus = useGetFriendshipStatus(friendId);
  const { data: loggedUser, refetch } = useFetchLoggedUserQuery({});
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const anchorElRef = useRef<HTMLButtonElement | null>(null);

  async function handleUpdateFriendshipStatus(newStatus: TFriendStatus | null) {
    if (!loggedUser?.id) return;
    setIsMenuOpen(false);
    await updateFriendshipStatus({ friend: friendId, loggedUser: loggedUser?.id, newStatus });
    refetch();
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

  return (
    <>
      <StyledRoot
        ref={anchorElRef}
        focusRipple
        disabled={disabled}
        sx={{ ...sx, ...buttonSx }}
        {...rootProps}
        onClick={clickHandler}>
        {showIcon && <StyledButtonIcon icon={icon} color={iconColor} />}
        <StyledButtonText>{buttonText}</StyledButtonText>
      </StyledRoot>

      {allowMenu && (
        <Popper
          anchorEl={anchorElRef.current}
          open={isMenuOpen}
          sx={{
            zIndex: theme.zIndex.modal,
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
