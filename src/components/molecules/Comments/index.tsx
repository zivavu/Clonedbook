import { Stack } from '@mui/material';

import { StyledRoot } from './styles';

import { useRef } from 'react';
import Comment from './Comment';
import CommentInput from './CommentInput';
import { CommentsProps } from './types';

export default function Comments({
  element,
  refetchElement,
  maxComments,
  commentInputRef,
  elementType,
  onlyUniqueUsers = false,
  displayMode = 'post',
  useAutoScroll = true,
  sx,
  ...rootProps
}: CommentsProps) {
  const comments = element.comments;
  const containerRef = useRef<HTMLDivElement>(null);

  const sortedComments = Object.values(comments || {})
    .filter((picture) => !!picture.createdAt)
    .sort((a, b) => b.createdAt.seconds - a.createdAt.seconds);

  const commentsToRender = onlyUniqueUsers
    ? sortedComments.filter((comment, i, self) => {
        return self.findIndex((com) => com.ownerId === comment.ownerId) === i;
      })
    : sortedComments;

  const commentsCutIndex = maxComments === 'all' ? undefined : maxComments;

  function scrollToNewComment() {
    if (containerRef.current && useAutoScroll) {
      containerRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'start',
      });
    }
  }

  if (!comments) return null;
  return (
    <StyledRoot sx={sx} {...rootProps}>
      {!!comments && (
        <Stack ref={containerRef}>
          {commentsToRender.slice(0, commentsCutIndex).map((comment) => (
            <Comment
              key={comment.id}
              refetchElement={refetchElement}
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
        commentInputRef={commentInputRef}
        scrollToNewComment={scrollToNewComment}
      />
    </StyledRoot>
  );
}
