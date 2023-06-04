import { Box, Stack } from '@mui/material';

import { StyledRoot } from './styles';

import { IComment } from '@/types/comment';
import Comment from './Comment';
import CommentInput from './CommentInput';
import { CommentsProps } from './types';

export default function Comments({
  comments,
  maxComments,
  element,
  refetchElement,
  elementType,
  onlyUniqueUsers = false,
  displayMode = 'post',
  sx,
  ...rootProps
}: CommentsProps) {
  if (!comments) return null;

  let commentsToRender: IComment[] = [];
  const sortedComments = Object.values(comments)
    .filter((picture) => !!picture.createdAt)
    .sort((a, b) => b.createdAt.seconds - a.createdAt.seconds);

  onlyUniqueUsers
    ? sortedComments?.forEach((comment) => {
        if (!commentsToRender.find((c) => c.ownerId === comment.ownerId)) {
          commentsToRender.push(comment);
        }
      })
    : (commentsToRender = sortedComments);

  const commentsCutIndex = maxComments === 'all' ? undefined : maxComments;
  return (
    <StyledRoot sx={sx} {...rootProps}>
      <Box>
        {!!comments && (
          <Stack>
            {commentsToRender.slice(0, commentsCutIndex).map((comment) => (
              <Comment
                key={comment.id}
                elementType={elementType}
                comment={comment}
                element={element}
              />
            ))}
          </Stack>
        )}
        <CommentInput
          displayMode={displayMode}
          element={element}
          parentElementType={elementType}
          refetchElement={refetchElement}
        />
      </Box>
    </StyledRoot>
  );
}
