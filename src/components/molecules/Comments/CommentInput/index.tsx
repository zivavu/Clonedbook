import { SxProps, Theme, useTheme } from '@mui/material';

import { StyledCommentInput, StyledRoot, StyledWrapper } from './styles';

import UserAvatar from '@/components/atoms/UserAvatar';
import { useGetLoggedUserQuery } from '@/redux/services/loggedUserAPI';
import { createUserComment } from '@/services/comments/createUserComment';
import { useState } from 'react';
import { CommentInputProps } from './types';

export default function CommentInput({
  sx,
  element,
  refetchElement,
  parentElementType,
  displayMode,
  commentInputRef,
  scrollToNewComment,
  ...rootProps
}: CommentInputProps) {
  const theme = useTheme();
  const { data: loggedUser } = useGetLoggedUserQuery({});
  const [commentText, setCommentText] = useState('');

  const onSubmit = async () => {
    if (!loggedUser) return;
    if (commentText.length === 0 || commentText.length > 6000) return;
    await createUserComment({
      commentText: commentText,
      elementId: element.id,
      elementOwnerId: element.ownerId,
      elementType: parentElementType,
      loggedUserId: loggedUser.id,
    });

    setCommentText('');
    await refetchElement();
    scrollToNewComment();
  };

  let modeSx: SxProps<Theme>;
  switch (displayMode) {
    case 'post':
      modeSx = { p: theme.spacing(2, 0), position: 'sticky', bottom: 0 };
      break;
    case 'picture':
      modeSx = { p: theme.spacing(1, 0), position: 'sticky', bottom: 0 };
      break;
    case 'feed':
      modeSx = { pb: theme.spacing(1) };
      break;
    default:
      modeSx = { pb: theme.spacing(1) };
  }

  return (
    <StyledRoot sx={{ ...modeSx, ...sx }} {...rootProps}>
      <form onSubmit={onSubmit}>
        <StyledWrapper>
          <UserAvatar size={30} sx={{ mr: theme.spacing(0.7) }} userId={loggedUser?.id} />
          <StyledCommentInput
            multiline
            fullWidth
            size='small'
            inputRef={commentInputRef}
            onChange={(e) => setCommentText(e.target.value)}
            value={commentText}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                onSubmit();
              }
            }}
            placeholder='Write a comment...'
          />
        </StyledWrapper>
      </form>
    </StyledRoot>
  );
}
