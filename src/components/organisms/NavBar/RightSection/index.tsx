import { StyledRoot, StyledToggleButton } from './styles';

import Icon from '@/components/atoms/Icon/Icon';
import UserAvatar from '@/components/atoms/UserAvatar';
import LoggedUserPopover from '@/components/organisms/LoggedUserPopover';
import { useFetchLoggedUserQuery } from '@/redux/services/userAPI';
import { useTheme } from '@mui/material';
import { MouseEvent, useRef, useState } from 'react';
import { RightSectionProps, TPopper } from './types';

export default function RightSection({ sx, classes, ...rootProps }: RightSectionProps) {
  const theme = useTheme();
  const { data: user } = useFetchLoggedUserQuery({});
  const [currentPopper, setCurrentPopper] = useState<TPopper>('none');
  const accountButtonAnchorElRef = useRef<HTMLButtonElement>(null);
  function handlePopoverChange(e: MouseEvent<HTMLElement>, value: any) {
    setCurrentPopper((prev) => (prev === value ? 'none' : value));
  }
  return (
    <StyledRoot sx={sx} className={classes?.root} {...rootProps}>
      <StyledToggleButton
        value={'chats' as TPopper}
        selected={currentPopper === 'chats'}
        onClick={handlePopoverChange}>
        <Icon icon={['fab', 'facebook-messenger']} color={theme.palette.text.primary} />
      </StyledToggleButton>
      <StyledToggleButton
        value={'notifications' as TPopper}
        selected={currentPopper === 'notifications'}
        onClick={handlePopoverChange}>
        <Icon icon='bell' color={theme.palette.text.primary} />
      </StyledToggleButton>
      <StyledToggleButton
        value={'account' as TPopper}
        ref={accountButtonAnchorElRef}
        onClick={handlePopoverChange}>
        <UserAvatar size={42} sx={{ position: 'absolute' }} userId={user?.id} useLink={false} />
      </StyledToggleButton>
      <LoggedUserPopover
        open={currentPopper === 'account'}
        onClose={handlePopoverChange}
        anchorEl={accountButtonAnchorElRef.current}
      />
    </StyledRoot>
  );
}
