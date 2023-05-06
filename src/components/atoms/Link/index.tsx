import { Typography, useTheme } from '@mui/material';

import { StyledRoot } from './styles';

import { LinkProps } from './types';

export default function Link({ sx, ...rootProps }: LinkProps) {
	const theme = useTheme();
  return (
    <StyledRoot sx={sx} {...rootProps}>
      <Typography>Link</Typography>
    </StyledRoot>
  );
}
  
