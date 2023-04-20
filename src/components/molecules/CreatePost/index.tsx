import { Typography } from '@mui/material';

import { StyledRoot } from './styles';

import { CreatePostProps } from './types';

export default function CreatePost({ ...rootProps }: CreatePostProps) {
  return (
    <StyledRoot {...rootProps}>
      <Typography>CreatePost</Typography>
    </StyledRoot>
  );
}
