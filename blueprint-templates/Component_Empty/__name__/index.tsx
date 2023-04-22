import { Typography, useTheme } from '@mui/material';

import { StyledRoot } from './styles';

import { {{name}}Props } from './types';

export default function {{name}}({ sx, ...rootProps }: {{name}}Props) {
	const theme = useTheme();
  return (
    <StyledRoot sx={sx} {...rootProps}>
      <Typography>{{name}}</Typography>
    </StyledRoot>
  );
}
  
