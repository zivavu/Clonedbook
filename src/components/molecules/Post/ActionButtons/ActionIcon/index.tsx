import { Typography, useTheme } from '@mui/material';

import { StyledRoot } from './styles';

import { ActionIconProps } from './types';

export default function ActionIcon({ ...rootProps }: ActionIconProps) {
	const theme = useTheme();
  return (
    <StyledRoot {...rootProps}>
      <Typography>ActionIcon</Typography>
    </StyledRoot>
  );
}
  
