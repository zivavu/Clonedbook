import { StyledRoot, StyledToggleButton } from './styles';

import Icon from '@/components/atoms/Icon/Icon';
import UserAvatar from '@/components/atoms/UserAvatar';
import LoggedUserPopper from '@/components/molecules/LoggedUserPopper';
import { useGetLoggedUserQuery } from '@/redux/services/loggedUserAPI';
import { Box, ClickAwayListener, useTheme } from '@mui/material';
import { MouseEvent, useRef, useState } from 'react';
import ChatsListPopper from '../../ChatsListPopper';
import { RightSectionProps, TTopbarPoper } from './types';

export default function RightSection({ sx, classes, ...rootProps }: RightSectionProps) {
  const theme = useTheme();
  const { data: user } = useGetLoggedUserQuery({});
  const accountButtonElRef = useRef<HTMLButtonElement>(null);
  const chatsButtonrElRef = useRef<HTMLButtonElement>(null);
  const [currentPopper, setCurrentPopper] = useState<TTopbarPoper>('none');
  function handlePopperChange(e: MouseEvent<HTMLElement>, value: any) {
    setCurrentPopper((prev) => (prev === value ? 'none' : value));
  }
  function handlePopperClose() {
    setCurrentPopper('none');
  }
  return (
    <StyledRoot sx={sx} className={classes?.root} {...rootProps}>
      <ClickAwayListener onClickAway={() => handlePopperClose()}>
        <Box>
          <StyledToggleButton
            disabled
            value={'notifications' as TTopbarPoper}
            selected={currentPopper === 'notifications'}
            onClick={handlePopperChange}>
            <Icon icon='bell' color={theme.palette.text.primary} />
          </StyledToggleButton>

          <StyledToggleButton
            value={'chats' as TTopbarPoper}
            selected={currentPopper === 'chats'}
            ref={chatsButtonrElRef}
            onClick={handlePopperChange}>
            <Icon icon={['fab', 'facebook-messenger']} color={theme.palette.text.primary} />
          </StyledToggleButton>

          <StyledToggleButton
            value={'account' as TTopbarPoper}
            ref={accountButtonElRef}
            onClick={handlePopperChange}>
            <UserAvatar size={42} sx={{ position: 'absolute' }} userId={user?.id} useLink={false} />
          </StyledToggleButton>

          <ChatsListPopper
            open={currentPopper === 'chats'}
            anchorEl={chatsButtonrElRef.current}
            handleClose={handlePopperClose}
          />
          <LoggedUserPopper
            open={currentPopper === 'account'}
            anchorEl={accountButtonElRef.current}
          />
        </Box>
      </ClickAwayListener>
    </StyledRoot>
  );
}
