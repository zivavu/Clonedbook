import { StyledRoot, StyledToggleButton } from './styles';

import Icon from '@/components/atoms/Icon/Icon';
import UserAvatar from '@/components/atoms/UserAvatar';
import { useFetchLoggedUserQuery } from '@/features/userAPI';
import { useState } from 'react';
import { Portal, RightSectionProps } from './types';

export default function RightSection({ sx, classes, ...rootProps }: RightSectionProps) {
  const { data: user } = useFetchLoggedUserQuery({});
  const [currentPortal, setCurrentPortal] = useState<Portal>('none');
  const handleSetPortal = (event: React.MouseEvent<HTMLElement>, portal: Portal) => {
    const newPortal = portal === currentPortal ? 'none' : portal;
    setCurrentPortal(newPortal);
  };
  return (
    <StyledRoot sx={sx} className={classes?.root} {...rootProps}>
      <StyledToggleButton
        value='chats'
        selected={currentPortal === 'chats'}
        onClick={(e) => {
          handleSetPortal(e, 'chats');
        }}>
        <Icon icon={['fab', 'facebook-messenger']} />
      </StyledToggleButton>
      <StyledToggleButton
        value='notifications'
        selected={currentPortal === 'notifications'}
        onClick={(e) => {
          handleSetPortal(e, 'notifications');
        }}>
        <Icon icon='bell' />
      </StyledToggleButton>
      <StyledToggleButton
        value='account'
        selected={currentPortal === 'account'}
        onClick={(e) => {
          handleSetPortal(e, 'account');
        }}>
        <UserAvatar size={42} sx={{ position: 'absolute' }} userId={user?.id} />
      </StyledToggleButton>
    </StyledRoot>
  );
}
