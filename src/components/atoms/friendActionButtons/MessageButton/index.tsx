import { useGetLoggedUserQuery } from '@/redux/services/loggedUserAPI';
import { StyledButtonIcon, StyledButtonText, StyledRoot } from './styles';

import useHandleChatOpen from '@/common/chatsManage/useHandleChatOpen';
import { MessageButtonProps } from './types';

export default function MessageButton({ userId, sx, ...rootProps }: MessageButtonProps) {
  const { data: loggedUser } = useGetLoggedUserQuery({});
  const openChat = useHandleChatOpen(userId);

  if (loggedUser?.id === userId) return null;
  return (
    <StyledRoot focusRipple sx={sx} {...rootProps} onClick={() => openChat()}>
      <StyledButtonIcon icon={['fab', 'facebook-messenger']} />
      <StyledButtonText>Message</StyledButtonText>
    </StyledRoot>
  );
}
