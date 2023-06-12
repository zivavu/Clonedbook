import { useGetLoggedUserQuery } from '@/redux/services/loggedUserAPI';
import { StyledButtonIcon, StyledButtonText, StyledRoot } from './styles';

import useHandleOpenChat from '@/common/chatsManage/useHandleOpenChat';
import { MessageButtonProps } from './types';

export default function MessageButton({ userId, showIcon, sx, ...rootProps }: MessageButtonProps) {
  const { data: loggedUser } = useGetLoggedUserQuery({});
  const handleChatOpen = useHandleOpenChat(userId);

  if (loggedUser?.id === userId) return null;
  return (
    <StyledRoot focusRipple sx={sx} {...rootProps} onClick={handleChatOpen}>
      {showIcon && <StyledButtonIcon icon={['fab', 'facebook-messenger']} />}
      <StyledButtonText>Message</StyledButtonText>
    </StyledRoot>
  );
}
