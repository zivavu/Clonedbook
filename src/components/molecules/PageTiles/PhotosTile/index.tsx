import { Typography, useTheme } from '@mui/material';

import { StyledRoot } from './styles';

import { PhotosTileProps } from './types';

export default function PhotosTile({ sx, ...rootProps }: PhotosTileProps) {
	const theme = useTheme();
  return (
    <StyledRoot sx={sx} {...rootProps}>
      <Typography>PhotosTile</Typography>
    </StyledRoot>
  );
}
  
