import { IconButton, Stack, Typography, useTheme } from '@mui/material';

import { StyledRoot, StyledTextContent } from './styles';

import { deleteUserComment } from '@/common/firebase/comments/deleteUserComment';
import { updateCommentReaction } from '@/common/firebase/reactions/updateCommentReaction';
import getShortDate from '@/common/misc/dateManagment/getShortDate';
import isObjectEmpty from '@/common/misc/objectManagment/isObjectEmpty';
import useGetUserBasicInfo from '@/common/misc/userDataManagment/useGetUsersPublicData';
import Icon from '@/components/atoms/Icon/Icon';
import InteractButton from '@/components/atoms/InteractButton';
import UserAvatar from '@/components/atoms/UserAvatar';
import UserLink from '@/components/atoms/UserLink';
import { useGetLoggedUserQuery } from '@/redux/services/loggedUserAPI';
import { TLocalUserReaction } from '@/types/reaction';
import { useRef, useState } from 'react';
import ReactionsDisplayBox from '../../ReactionsDisplay';
import ReactionsPopper from '../../ReactionsPopper';
import useReactionsPopperHandlers from '../../ReactionsPopper/useReactionsPopperHandlers';
import CommentManageMenu from './CommentManageMenu';
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
  const ownerData = useGetUserBasicInfo(comment.ownerId);

  const commentManageAnchor = useRef<HTMLButtonElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isInEditMode, setIsInEditMode] = useState(false);

  const {
    isPopperOpen,
    popperAnchorElRef,
    handlePopperOpen,
    handlePopperClose,
    handleTouchStart,
    handleTouchEnd,
  } = useReactionsPopperHandlers();

  const userReaction = comment.reactions && comment.reactions[loggedUser?.id || ''];
  //determines if reactions should be displayed on right side of comment(when comment text is short)
  const reactionsOnRightSite = comment.commentText.length < 25;
  const isOwner = loggedUser?.id === comment.ownerId;

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

  async function handleCommentDelete() {
    setIsMenuOpen(false);
    await deleteUserComment({
      elementType: elementType,
      elementId: element.id,
      elementOwnerId: element.ownerId,
      commentId: comment.id,
    });
    refetchElement();
  }
  return (
    <>
      <StyledRoot sx={sx} {...rootProps}>
        <Stack direction='row' spacing={1} alignItems='center'>
          <UserAvatar userId={comment.ownerId} sx={{ alignSelf: 'start' }} size={32} />
          <Stack direction='row' position='relative'>
            <StyledTextContent>
              {!!ownerData && (
                <>
                  <UserLink userId={ownerData.id} usePopper />
                  <Typography variant='body1'>{comment.commentText}</Typography>
                </>
              )}
            </StyledTextContent>
            <Stack
              direction='row'
              sx={{
                zIndex: 1,
                position: 'absolute',
                alignItems: 'center',
                height: '100%',
                right: reactionsOnRightSite || !isOwner ? theme.spacing(0.5) : theme.spacing(-3),
                transform: reactionsOnRightSite ? 'translateX(100%)' : 'none',
              }}>
              {comment.reactions && !isObjectEmpty(comment?.reactions) && (
                <ReactionsDisplayBox
                  reactions={comment.reactions}
                  emotesCount={2}
                  displayNames={false}
                  displayCount={true}
                  sx={{
                    backgroundColor: theme.palette.background.paper,
                    boxShadow: theme.shadows[7],
                    borderRadius: '10px',
                    height: 'min-content',
                    alignSelf: reactionsOnRightSite ? 'center' : 'flex-end',
                    transform: reactionsOnRightSite ? 'none' : 'translateY(70%)',
                  }}
                />
              )}

              {isOwner && (
                <>
                  <IconButton
                    ref={commentManageAnchor}
                    onClick={() => setIsMenuOpen(true)}
                    size='small'
                    sx={{
                      width: '28px',
                      height: '28px',
                      transform: 'translateX(25%)',
                    }}>
                    <Icon icon='ellipsis' fontSize={16} color={theme.palette.text.secondary} />
                  </IconButton>
                  <CommentManageMenu
                    commentId={comment.id}
                    anchorEl={commentManageAnchor.current}
                    open={isMenuOpen}
                    handleClose={() => setIsMenuOpen(false)}
                    onClose={() => setIsMenuOpen(false)}
                    handleOpenEditMode={() => {
                      setIsInEditMode(true);
                      setIsMenuOpen(false);
                    }}
                    handleCommentDelete={handleCommentDelete}
                  />
                </>
              )}
            </Stack>
          </Stack>
        </Stack>
        <Stack ml={theme.spacing(6)} direction='row' alignItems='center' spacing={1}>
          <InteractButton
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

          <InteractButton>
            <Typography variant='body2' fontWeight={650}>
              Reply
            </Typography>
          </InteractButton>

          <Typography variant='body2' color={theme.palette.text.secondary}>
            {getShortDate(comment.createdAt.seconds)}
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
