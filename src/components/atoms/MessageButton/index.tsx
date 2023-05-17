import { useTheme } from '@mui/material';

import { StyledButtonIcon, StyledButtonText, StyledMessageButton } from './styles';

import { MessageButtonProps } from './types';

export default function MessageButton({ sx, ...rootProps }: MessageButtonProps) {
  const theme = useTheme();
  return (
    <StyledMessageButton focusRipple sx={sx} {...rootProps}>
      <StyledButtonIcon icon={['fab', 'facebook-messenger']} />
      <StyledButtonText>Message</StyledButtonText>
    </StyledMessageButton>
  );
}
