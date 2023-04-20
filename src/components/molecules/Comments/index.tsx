import { Stack, Typography, useTheme } from '@mui/material';

import { StyledRoot } from './styles';

import { IComment } from '@/types/comment';
import Comment from './Comment';
import CommentInput from './CommentInput';
import { CommentsProps } from './types';

export default function Comments({ comments, user, ...rootProps }: CommentsProps) {
  const theme = useTheme();
  const uniqueUsersComments: IComment[] = [];
  comments?.forEach((comment) => {
    if (!uniqueUsersComments.find((c) => c.owner.profileId === comment.owner.profileId)) {
      uniqueUsersComments.push(comment);
    }
  });

  return (
    <StyledRoot {...rootProps}>
      {!!comments && (
        <Stack>
          {uniqueUsersComments.slice(0, 2).map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </Stack>
      )}
      <CommentInput user={user} />
    </StyledRoot>
  );
}
