import InteractButton from '@/components/atoms/InteractButton';
import { useGetLoggedUserQuery } from '@/redux/services/loggedUserAPI';
import { editUserComment } from '@/services/comments/editUserComment';
import { Box, Typography, useTheme } from '@mui/material';
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
  const theme = useTheme();
  const [commentText, setCommentText] = useState(comment.commentText);
  const [isFocused, setIsFocused] = useState(false);
  const { data: loggedUser } = useGetLoggedUserQuery({});

  const onSubmit = async () => {
    if (!loggedUser) return;
    if (
      commentText.length === 0 ||
      commentText.length > 6000 ||
      commentText === comment.commentText
    ) {
      handleCloseEditMode();
      return;
    }
    await editUserComment({
      commentId: comment.id,
      newText: commentText,
      elementId: element.id,
      elementOwnerId: element.ownerId,
      elementType: elementType,
    });
    await refetchElement();
    handleClose();
  };

  function handleClose() {
    handleCloseEditMode();
    setCommentText('');
  }

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
          if (e.key === 'Escape') handleClose();
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder='Write a comment...'
        sx={sx}
        {...rootProps}
      />
      <Box height='18px'>
        {isFocused ? (
          <Typography variant='body2'>
            Press Esc to{' '}
            <InteractButton onClick={handleClose}>
              <Typography variant='body2' color={theme.palette.info.main}>
                cancel
              </Typography>
            </InteractButton>
          </Typography>
        ) : (
          <InteractButton onClick={handleClose}>
            <Typography variant='body2' color={theme.palette.info.main}>
              Cancel
            </Typography>
          </InteractButton>
        )}
      </Box>
    </form>
  );
}
