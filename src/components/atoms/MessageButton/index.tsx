import { useTheme } from '@mui/material';

import { StyledButtonIcon, StyledButtonText, StyledMessageButton, StyledRoot } from './styles';

import { MessageButtonProps } from './types';

export default function MessageButton({ sx, ...rootProps }: MessageButtonProps) {
  const theme = useTheme();
  return (
    <StyledRoot sx={sx} {...rootProps}>
      <StyledMessageButton>
        <StyledButtonIcon icon={['fab', 'facebook-messenger']} />
        <StyledButtonText>Message</StyledButtonText>
      </StyledMessageButton>
    </StyledRoot>
  );
}
