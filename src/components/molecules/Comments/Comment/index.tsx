import { Stack, Typography, useTheme } from '@mui/material';

import { StyledRoot } from './styles';

import getShortDate from '@/common/misc/dateManagment/getShortDate';
import useGetUserBasicInfo from '@/common/misc/userDataManagment/useGetUsersPublicData';
import InteractButton from '@/components/atoms/InteractButton';
import UserAvatar from '@/components/atoms/UserAvatar';
import { useGetLoggedUserQuery } from '@/redux/services/loggedUserAPI';
import { updateCommentReaction } from '@/services/reactions/updateCommentReaction';
import { TLocalUserReaction } from '@/types/reaction';
import { useState } from 'react';
import ReactionsPopper from '../../ReactionsPopper';
import useReactionsPopperHandlers from '../../ReactionsPopper/useReactionsPopperHandlers';
import CommentDisplay from './CommentDisplay';
import CommentEdit from './CommentEdit';
import { CommentProps } from './types';

export default function Comment({
  element,
  comment,
  elementType,
  refetchElement,
  sx,
  ...rootProps
}: CommentProps) {
  const theme = useTheme();
  const { data: loggedUser } = useGetLoggedUserQuery({});
  const commentOwner = useGetUserBasicInfo(comment.ownerId);

  const {
    isPopperOpen,
    popperAnchorElRef,
    handlePopperOpen,
    handlePopperClose,
    handleTouchStart,
    handleTouchEnd,
  } = useReactionsPopperHandlers();

  const [isInEditMode, setIsInEditMode] = useState(false);

  const userReaction = comment.reactions && comment.reactions[loggedUser?.id || ''];

  async function handleUpdateCommentReaction(reaction: TLocalUserReaction) {
    if (!loggedUser || !element) return;
    await updateCommentReaction({
      commentId: comment.id,
      elementId: element.id,
      elementOwnerId: element.ownerId,
      loggedUserId: loggedUser.id,
      reaction: reaction,
      elementType: elementType,
    });
    await refetchElement();
    handlePopperClose();
  }

  function handleLikeClick() {
    if (!loggedUser || !element) return;
    handlePopperClose();
    if (!userReaction) {
      handleUpdateCommentReaction('like');
    } else {
      handleUpdateCommentReaction(null);
    }
  }

  function handleOpenEditMode() {
    setIsInEditMode(true);
  }
  function handleCloseEditMode() {
    setIsInEditMode(false);
  }

  return (
    <>
      <StyledRoot sx={sx} {...rootProps}>
        <Stack direction='row' spacing={1} alignItems='center'>
          <UserAvatar userId={comment.ownerId} sx={{ alignSelf: 'start' }} size={32} />

          {commentOwner &&
            (isInEditMode && loggedUser?.id === comment.ownerId ? (
              <CommentEdit
                element={element}
                elementType={elementType}
                refetchElement={refetchElement}
                handleCloseEditMode={handleCloseEditMode}
                comment={comment}
              />
            ) : (
              <CommentDisplay
                element={element}
                elementType={elementType}
                refetchElement={refetchElement}
                comment={comment}
                commentOwner={commentOwner}
                handleOpenEditMode={handleOpenEditMode}
              />
            ))}
        </Stack>
        <Stack ml={theme.spacing(6)} direction='row' alignItems='center' spacing={1}>
          <InteractButton
            data-testid='like-comment-button'
            buttonRef={popperAnchorElRef}
            onMouseOver={handlePopperOpen}
            onMouseOut={handlePopperClose}
            onClick={handleLikeClick}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            sx={{
              textTransform: 'capitalize',
              color: theme.palette.common.reactionTypes[userReaction || 'default'],
            }}>
            <Typography variant='body2' fontWeight={650}>
              {userReaction ? userReaction : 'Like'}
            </Typography>
          </InteractButton>

          <InteractButton disabled>
            <Typography variant='body2' fontWeight={650}>
              Reply
            </Typography>
          </InteractButton>

          <Typography variant='body2' color={theme.palette.text.secondary}>
            {getShortDate(comment.createdAt?.seconds)}
          </Typography>
        </Stack>
      </StyledRoot>
      <ReactionsPopper
        updateDocHandler={(type) => {
          handleUpdateCommentReaction(type);
        }}
        open={isPopperOpen}
        placement='top-start'
        modifiers={[{ name: 'offset', options: { offset: [-30, 0] } }]}
        anchorEl={popperAnchorElRef.current}
        handleMouseOver={handlePopperOpen}
        handleMouseOut={handlePopperClose}
      />
    </>
  );
}
