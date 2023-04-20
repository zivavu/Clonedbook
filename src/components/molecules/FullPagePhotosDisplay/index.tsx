import { Typography, useTheme } from '@mui/material';

import { StyledRoot } from './styles';

import { FullPagePhotosDisplayProps } from './types';

export default function FullPagePhotosDisplay({ ...rootProps }: FullPagePhotosDisplayProps) {
	const theme = useTheme();
  return (
    <StyledRoot {...rootProps}>
      <Typography>FullPagePhotosDisplay</Typography>
    </StyledRoot>
  );
}
  
