import { StyledButtonIcon, StyledButtonText, StyledMessageButton } from './styles';

import { MessageButtonProps } from './types';

export default function MessageButton({ sx, ...rootProps }: MessageButtonProps) {
  return (
    <StyledMessageButton focusRipple sx={sx} {...rootProps}>
      <StyledButtonIcon icon={['fab', 'facebook-messenger']} />
      <StyledButtonText>Message</StyledButtonText>
    </StyledMessageButton>
  );
}
