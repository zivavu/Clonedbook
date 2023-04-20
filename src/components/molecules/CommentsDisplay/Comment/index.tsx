import { Typography, useTheme } from '@mui/material';

import { StyledRoot } from './styles';

import { CommentProps } from './types';

export default function Comment({ ...rootProps }: CommentProps) {
	const theme = useTheme();
  return (
    <StyledRoot {...rootProps}>
      <Typography>Comment</Typography>
    </StyledRoot>
  );
}
  
