import { Box, Stack, Typography, useTheme } from '@mui/material';

import { StyledRoot, StyledTextContent } from './styles';

import getShortDate from '@/common/misc/dateManagment/getShortDate';
import isObjectEmpty from '@/common/misc/objectManagment/isObjectEmpty';
import { userCommentReact } from '@/common/updateData/reactions/userCommentReact';
import InteractButton from '@/components/atoms/InteractButton';
import Link from '@/components/atoms/Link';
import UserAvatar from '@/components/atoms/UserAvatar';
import { useFetchLoggedUserQuery } from '@/redux/services/userAPI';
import { useFetchUsersBasicInfoQuery } from '@/redux/services/usersBasicInfoAPI';
import { TLocalUserReaction } from '@/types/reaction';
import { useEffect, useRef, useState } from 'react';
import ReactionsPopper from '../../ActionButtons/ReactionsPopper';
import ReactionsDisplay from '../../ReactionsDisplay';
import { CommentProps } from './types';

export default function Comment({ element, comment, elementType, sx, ...rootProps }: CommentProps) {
  const theme = useTheme();
  const { data: user } = useFetchLoggedUserQuery({});
  const { data: allUsersBasicInfo } = useFetchUsersBasicInfoQuery({});
  const [ownerData, setOwnerData] = useState(
    (allUsersBasicInfo && allUsersBasicInfo[comment.ownerId]) || null,
  );

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mouseOverReactionElements, setMouseOverReactionElements] = useState(false);
  const likeButtonRef = useRef<HTMLButtonElement>(null);

  const [userReaction, setUserReaction] = useState<TLocalUserReaction>(
    (comment.reactions && comment.reactions[user?.id || '']) || undefined,
  );

  useEffect(() => {
    if (!allUsersBasicInfo) return;
    setOwnerData(allUsersBasicInfo[comment.ownerId]);
  }, [allUsersBasicInfo, comment.ownerId]);

  const shouldDisplayOnRightSite = comment.commentText.length < 25;

  function handleMouseEnter() {
    setAnchorEl(likeButtonRef.current);
    setMouseOverReactionElements(true);
  }
  function handleMouseLeave() {
    setMouseOverReactionElements(false);
  }

  function handleUserReaction(reaction: TLocalUserReaction) {
    if (!user || !element) return;
    userCommentReact({
      commentId: comment.id,
      elementId: element.id,
      loggedUserId: user.id,
      reaction: reaction,
      elementType: elementType,
    });
  }

  function handleLikeClick() {
    if (!user || !element) return;
    setMouseOverReactionElements(false);
    if (!userReaction) {
      setUserReaction('like');
      handleUserReaction('like');
    } else {
      setUserReaction(null);
      handleUserReaction(null);
    }
  }
  return (
    <StyledRoot sx={sx} {...rootProps}>
      <Box display='flex' alignItems='center'>
        <UserAvatar userId={comment.ownerId} sx={{ alignSelf: 'start' }} size={32} />
        <StyledTextContent>
          {!!ownerData && (
            <>
              <Link href={`/profile/${comment.ownerId}`}>
                <Typography variant='body1' fontWeight='500' lineHeight='1.2rem'>
                  {ownerData.firstName} {ownerData.lastName}
                </Typography>
              </Link>
              <Typography variant='body1'>{comment.commentText}</Typography>
            </>
          )}
          {(!isObjectEmpty(comment?.reactions) || userReaction) && (
            <ReactionsDisplay
              reactions={comment.reactions}
              emotesCount={2}
              displayNames={false}
              displayCount={true}
              userReaction={userReaction}
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
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClickHandler={handleLikeClick}
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
          handleUserReaction(type);
        }}
        disablePortal={true}
        open={false}
        placement='top-start'
        modifiers={[{ name: 'offset', options: { offset: [-30, 0] } }]}
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        mouseOver={mouseOverReactionElements}
        setMouseOver={setMouseOverReactionElements}
        setUserReaction={setUserReaction}
      />
    </StyledRoot>
  );
}
