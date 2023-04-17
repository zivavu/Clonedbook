import { Typography, useTheme } from '@mui/material';

import { StyledRoot } from './styles';

import { {{name}}Props } from './types';

export default function {{name}}({ ...rootProps }: {{name}}Props) {
	const theme = useTheme();
  return (
    <StyledRoot {...rootProps}>
      <Typography>{{name}}</Typography>
    </StyledRoot>
  );
}
  
