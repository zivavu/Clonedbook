import { Stack, Typography, useTheme } from '@mui/material';

import { StyledRoot } from './styles';

import Comment from './Comment';
import CommentInput from './CommentInput';
import { CommentsProps } from './types';

export default function Comments({ comments, user, ...rootProps }: CommentsProps) {
  const theme = useTheme();
  return (
    <StyledRoot {...rootProps}>
      {!!comments && (
        <Stack>
          {comments.slice(0, 2).map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </Stack>
      )}
      <CommentInput user={user} />
    </StyledRoot>
  );
}
