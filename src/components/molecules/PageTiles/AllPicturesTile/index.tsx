import { Typography, useTheme } from '@mui/material';

import { StyledFullSizePageTile } from '../styles';
import { AllPicturesTileProps } from './types';

export default function AllPicturesTile({ profileData, sx, ...rootProps }: AllPicturesTileProps) {
  const theme = useTheme();
  return (
    <StyledFullSizePageTile sx={sx} {...rootProps}>
      <Typography>AllPicturesTile</Typography>
    </StyledFullSizePageTile>
  );
}
