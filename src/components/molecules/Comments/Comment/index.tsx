import { Box, Stack, Typography, useTheme } from '@mui/material';

import { StyledRoot, StyledTextContent } from './styles';

import { updateCommentReaction } from '@/common/firebase/updateData/reactions/updateCommentReaction';
import getShortDate from '@/common/misc/dateManagment/getShortDate';
import isObjectEmpty from '@/common/misc/objectManagment/isObjectEmpty';
import useGetUserBasicInfo from '@/common/misc/userDataManagment/useGetUsersPublicData';
import InteractButton from '@/components/atoms/InteractButton';
import UserAvatar from '@/components/atoms/UserAvatar';
import UserLink from '@/components/atoms/UserLink';
import { useGetLoggedUserQuery } from '@/redux/services/loggedUserAPI';
import { TLocalUserReaction } from '@/types/reaction';
import { useRef, useState } from 'react';
import ReactionsDisplayBox from '../../ReactionsDisplay';
import ReactionsPopper from '../../ReactionsPopper';
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

  const [isPopperOpen, setIsPopperOpen] = useState(false);
  const likeButtonRef = useRef<HTMLButtonElement>(null);

  function handleMouseOver() {
    setIsPopperOpen(true);
  }
  function handleMouseOut() {
    setIsPopperOpen(false);
  }

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  function startPressTimer() {
    timerRef.current = setTimeout(() => {
      setIsPopperOpen(true);
    }, 400);
  }
  function stopPressTimer() {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }

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
    setIsPopperOpen(false);
  }

  function handleLikeClick() {
    if (!loggedUser || !element) return;
    setIsPopperOpen(false);
    if (!userReaction) {
      handleUpdateCommentReaction('like');
    } else {
      handleUpdateCommentReaction(null);
    }
  }

  const userReaction = comment.reactions && comment.reactions[loggedUser?.id || ''];
  const shouldDisplayOnRightSite = comment.commentText.length < 25;

  return (
    <StyledRoot sx={sx} {...rootProps}>
      <Box display='flex' alignItems='center'>
        <UserAvatar userId={comment.ownerId} sx={{ alignSelf: 'start' }} size={32} />
        <StyledTextContent>
          {!!ownerData && (
            <>
              <UserLink userId={ownerData.id} usePopper />

              <Typography variant='body1'>{comment.commentText}</Typography>
            </>
          )}
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
                zIndex: 1,
                position: 'absolute',
                bottom: shouldDisplayOnRightSite ? theme.spacing(1) : theme.spacing(-2),
                right: shouldDisplayOnRightSite ? theme.spacing(1) : theme.spacing(-1),
                transform: shouldDisplayOnRightSite ? 'translateX(100%)' : 'none',
              }}
            />
          )}
        </StyledTextContent>
      </Box>
      <Stack ml={theme.spacing(6)} direction='row' alignItems='center' spacing={1}>
        <InteractButton
          buttonRef={likeButtonRef}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          onClick={handleLikeClick}
          onTouchStart={() => startPressTimer()}
          onTouchEnd={() => stopPressTimer()}
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
      <ReactionsPopper
        updateDocHandler={(type) => {
          handleUpdateCommentReaction(type);
        }}
        open={isPopperOpen}
        placement='top-start'
        modifiers={[{ name: 'offset', options: { offset: [-30, 0] } }]}
        anchorEl={likeButtonRef.current}
        handleMouseOver={handleMouseOver}
        handleMouseOut={handleMouseOut}
      />
    </StyledRoot>
  );
}
