import { Typography, useTheme } from '@mui/material';

import { StyledRoot } from './styles';

import { {{name}}Props } from './types';

export default function {{name}}({ sx, classes, ...rootProps }: {{name}}Props) {
	const theme = useTheme();
  return (
    <StyledRoot sx={sx} className={classes?.root} {...rootProps}>
      <Typography>{{name}}</Typography>
    </StyledRoot>
  );
}
  
