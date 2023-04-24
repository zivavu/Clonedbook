import { Stack, useTheme } from '@mui/material';

import { StyledRoot } from './styles';

import { useFetchUserQuery } from '@/features/userAPI';
import { IComment } from '@/types/comment';
import Comment from './Comment';
import CommentInput from './CommentInput';
import { CommentsProps } from './types';

export default function Comments({
  comments,
  maxComments,
  onlyUniqueUsers = false,
  ...rootProps
}: CommentsProps) {
  const { data: user } = useFetchUserQuery({});
  const commentsToRender: IComment[] = [];

  if (!comments) return null;

  onlyUniqueUsers
    ? comments?.forEach((comment) => {
        if (!commentsToRender.find((c) => c.owner.profileId === comment.owner.profileId)) {
          commentsToRender.push(comment);
        }
      })
    : commentsToRender.push(...comments);

  const exampleCommentsLength =
    commentsToRender[0]?.commentText?.length + (commentsToRender[1]?.commentText?.length || 0);
  let commentsCutIndex: number | undefined = undefined;
  if (maxComments) {
    commentsCutIndex = maxComments === 'all' ? undefined : maxComments;
  } else if (exampleCommentsLength > 300) {
    commentsCutIndex = 1;
  } else {
    commentsCutIndex = 2;
  }

  return (
    <StyledRoot {...rootProps}>
      {!!comments && (
        <Stack>
          {commentsToRender.slice(0, commentsCutIndex).map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </Stack>
      )}
      {user && <CommentInput user={user} />}
    </StyledRoot>
  );
}
