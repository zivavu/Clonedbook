import { editUserComment } from '@/common/firebase/comments/editUserComment';
import { useGetLoggedUserQuery } from '@/redux/services/loggedUserAPI';
import { useState } from 'react';
import { StyledCommentInput } from '../../CommentInput/styles';
import { CommentEditProps } from './types';

export default function CommentEdit({
  comment,
  element,
  elementType,
  refetchElement,
  handleCloseEditMode,
  sx,
  ...rootProps
}: CommentEditProps) {
  const [commentText, setCommentText] = useState(comment.commentText);
  const { data: loggedUser } = useGetLoggedUserQuery({});

  const onSubmit = async () => {
    if (!loggedUser) return;
    if (commentText.length === 0 || commentText.length > 6000) return;
    await editUserComment({
      commentId: comment.id,
      newText: commentText,
      elementId: element.id,
      elementOwnerId: element.ownerId,
      elementType: elementType,
    });
    await refetchElement();
    setCommentText('');
    handleCloseEditMode();
  };

  return (
    <form onSubmit={onSubmit} style={{ width: '100%' }}>
      <StyledCommentInput
        multiline
        fullWidth
        size='small'
        onChange={(e) => setCommentText(e.target.value)}
        value={commentText}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            onSubmit();
          }
        }}
        placeholder='Write a comment...'
        sx={sx}
        {...rootProps}
      />
    </form>
  );
}
