import { Typography, useTheme } from '@mui/material';

import { StyledRoot } from './styles';

import { CreatePostProps } from './types';

export default function CreatePost({ ...rootProps }: CreatePostProps) {
	const theme = useTheme();
  return (
    <StyledRoot {...rootProps}>
      <Typography>CreatePost</Typography>
    </StyledRoot>
  );
}
  
