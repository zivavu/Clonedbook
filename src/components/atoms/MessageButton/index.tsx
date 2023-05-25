import { StyledButtonIcon, StyledButtonText, StyledRoot } from './styles';

import { MessageButtonProps } from './types';

export default function MessageButton({ sx, ...rootProps }: MessageButtonProps) {
  return (
    <StyledRoot focusRipple sx={sx} {...rootProps}>
      <StyledButtonIcon icon={['fab', 'facebook-messenger']} />
      <StyledButtonText>Message</StyledButtonText>
    </StyledRoot>
  );
}
