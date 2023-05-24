import { Typography, useTheme } from '@mui/material';

import { StyledRoot } from './styles';

import { AllPicturesTileProps } from './types';

export default function AllPicturesTile({ sx, ...rootProps }: AllPicturesTileProps) {
	const theme = useTheme();
  return (
    <StyledRoot sx={sx} {...rootProps}>
      <Typography>AllPicturesTile</Typography>
    </StyledRoot>
  );
}
  
