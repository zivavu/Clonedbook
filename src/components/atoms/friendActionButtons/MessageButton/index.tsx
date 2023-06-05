import { useLoggedUserQuery } from '@/redux/services/loggedUserAPI';
import { StyledButtonIcon, StyledButtonText, StyledRoot } from './styles';

import { MessageButtonProps } from './types';

export default function MessageButton({ userId, sx, ...rootProps }: MessageButtonProps) {
  const { data: loggedUser } = useLoggedUserQuery({});

  if (loggedUser?.id === userId) return null;
  return (
    <StyledRoot focusRipple sx={sx} {...rootProps}>
      <StyledButtonIcon icon={['fab', 'facebook-messenger']} />
      <StyledButtonText>Message</StyledButtonText>
    </StyledRoot>
  );
}
