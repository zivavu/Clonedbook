import { Stack, useTheme } from '@mui/material';

import { StyledRoot } from './styles';

import { useFetchUserQuery } from '@/features/userAPI';
import { IComment } from '@/types/comment';
import Comment from './Comment';
import CommentInput from './CommentInput';
import { CommentsProps } from './types';

export default function Comments({ comments, ...rootProps }: CommentsProps) {
  const { data } = useFetchUserQuery({});
  const user = data?.public;
  const uniqueUsersComments: IComment[] = [];
  comments?.forEach((comment) => {
    if (!uniqueUsersComments.find((c) => c.owner.profileId === comment.owner.profileId)) {
      uniqueUsersComments.push(comment);
    }
  });
  const exampleCommentsLength =
    uniqueUsersComments[0]?.commentText?.length +
    (uniqueUsersComments[1]?.commentText?.length || 0);
  const commentsCutIndex = exampleCommentsLength > 300 ? 1 : 2;

  return (
    <StyledRoot {...rootProps}>
      {!!comments && (
        <Stack>
          {uniqueUsersComments.slice(0, commentsCutIndex).map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </Stack>
      )}
      {user && <CommentInput user={user} />}
    </StyledRoot>
  );
}
