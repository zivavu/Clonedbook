import { Typography, useTheme } from '@mui/material';

import { StyledRoot } from './styles';

import CommentInput from './CommentInput';
import { CommentsDisplayProps } from './types';

export default function CommentsDisplay({ comments, user, ...rootProps }: CommentsDisplayProps) {
  const theme = useTheme();
  return (
    <StyledRoot {...rootProps}>
      <Typography>CommentsDisplay</Typography>
      <CommentInput user={user} />
    </StyledRoot>
  );
}
