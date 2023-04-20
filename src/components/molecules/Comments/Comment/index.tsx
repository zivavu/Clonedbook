import { Avatar, Typography, useTheme } from '@mui/material';

import { StyledRoot } from './styles';

import { CommentProps } from './types';

export default function Comment({ comment, ...rootProps }: CommentProps) {
  const theme = useTheme();
  return (
    <StyledRoot {...rootProps}>
      <Typography>{comment.commentText}</Typography>
    </StyledRoot>
  );
}
