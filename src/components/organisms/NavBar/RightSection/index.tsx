import { StyledRoot, StyledToggleButton } from './styles';

import Icon from '@/components/atoms/Icon/Icon';
import UserAvatar from '@/components/atoms/UserAvatar';
import LoggedUserPopper from '@/components/molecules/LoggedUserPopper';
import { useFetchLoggedUserQuery } from '@/redux/services/userAPI';
import { MouseEvent, useRef, useState } from 'react';
import { RightSectionProps, TPopper } from './types';

export default function RightSection({ sx, classes, ...rootProps }: RightSectionProps) {
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
        <Icon icon={['fab', 'facebook-messenger']} />
      </StyledToggleButton>
      <StyledToggleButton
        value={'notifications' as TPopper}
        selected={currentPopper === 'notifications'}
        onClick={handlePopoverChange}>
        <Icon icon='bell' />
      </StyledToggleButton>
      <StyledToggleButton
        value={'account' as TPopper}
        ref={accountButtonAnchorElRef}
        onClick={handlePopoverChange}>
        <UserAvatar size={42} sx={{ position: 'absolute' }} userId={user?.id} useLink={false} />
      </StyledToggleButton>
      <LoggedUserPopper
        open={currentPopper === 'account'}
        anchorEl={accountButtonAnchorElRef.current}
      />
    </StyledRoot>
  );
}
