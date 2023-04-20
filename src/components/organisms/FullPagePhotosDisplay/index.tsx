import { Portal, Typography, useTheme } from '@mui/material';

import { StyledRoot } from './styles';

import { FullPagePhotosDisplayProps } from './types';

export default function FullPagePhotosDisplay({
  sx,
  photo,
  post,
  setOpen,
  ...rootProps
}: FullPagePhotosDisplayProps) {
  const theme = useTheme();
  console.log('opened');
  return (
    <StyledRoot {...rootProps} sx={sx}>
      <Typography>FullPagePhotosDisplay</Typography>
    </StyledRoot>
  );
}
