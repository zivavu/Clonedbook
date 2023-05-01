import { Box, Stack, Typography, useTheme } from '@mui/material';

import { StyledRoot, StyledTextContent } from './styles';

import StyledInteractButton from '@/components/atoms/StyledInteractButton';
import UserAvatar from '@/components/atoms/UserAvatar';
import { useFetchUserQuery } from '@/features/userAPI';
import { IReactionReference } from '@/types/reaction';
import { separateUserBasicInfo } from '@/utils/separateUserBasicInfo';
import { userCommentReact } from '@/utils/userCommentReact';
import { useRef, useState } from 'react';
import ReactionsPopper from '../../ActionButtons/ReactionsPopper';
import ReactionsDisplay from '../../ReactionsDisplay';
import { CommentProps } from './types';

export default function Comment({ post, comment, ...rootProps }: CommentProps) {
  const theme = useTheme();
  const shouldDisplayOnRightSite = comment.commentText.length < 25;
  const { data: user } = useFetchUserQuery({});
  const [userReaction, setUserReaction] = useState<IReactionReference | null>(
    comment.reactions?.find((reaction) => reaction.userId === user?.profileId) || null,
  );
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mouseOverReactionElements, setMouseOverReactionElements] = useState(false);
  const likeButtonRef = useRef<HTMLButtonElement>(null);
  function handleMouseEnter() {
    setAnchorEl(likeButtonRef.current);
    setMouseOverReactionElements(true);
  }
  function handleMouseLeave() {
    setMouseOverReactionElements(false);
  }

  function handleLikeClick() {
    console.log('handleLikeClick');
    if (!user || !post) return;
    setMouseOverReactionElements(false);
    if (!userReaction) {
      setUserReaction({ userId: user.profileId, type: 'like' });
      userCommentReact(post, comment, separateUserBasicInfo(user), 'like');
    } else {
      setUserReaction(null);
    }
  }

  return (
    <StyledRoot {...rootProps}>
      <ReactionsPopper
        updateDocHandler={(type) => {
          if (!user) return;
          userCommentReact(post, comment, separateUserBasicInfo(user), type);
        }}
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        mouseOver={mouseOverReactionElements}
        setMouseOver={setMouseOverReactionElements}
        setUserReaction={setUserReaction}
      />
      <Box display='flex' alignItems='center'>
        <UserAvatar src={comment.owner.profilePicture} sx={{ alignSelf: 'start' }} size={32} />
        <StyledTextContent>
          <Typography variant='body2' fontWeight='400' lineHeight='1.2rem'>
            {comment.owner.firstName} {comment.owner.lastName}
          </Typography>
          <Typography variant='body2' lineHeight='1.2rem'>
            {comment.commentText}
          </Typography>
          {!!comment?.reactions?.length && (
            <ReactionsDisplay
              reactions={comment.reactions}
              emotesCount={2}
              displayNames={false}
              displayCount={true}
              userReaction={userReaction}
              sx={{
                backgroundColor: theme.palette.secondary.light,
                boxShadow: 'rgba(0, 0, 0, 0.2) 0px 1px 3px 0px',
                borderRadius: '10px',
                zIndex: 1,
                position: 'absolute',
                bottom: shouldDisplayOnRightSite ? theme.spacing(1) : theme.spacing(-2),
                right: shouldDisplayOnRightSite ? theme.spacing(-5.5) : theme.spacing(-1),
              }}
            />
          )}
        </StyledTextContent>
      </Box>
      <Stack ml={theme.spacing(6)} direction='row' alignItems='center'>
        <StyledInteractButton
          buttonRef={likeButtonRef}
          sx={{ mr: theme.spacing(1) }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClickHandler={handleLikeClick}
        >
          Like
        </StyledInteractButton>
        <StyledInteractButton>Reply</StyledInteractButton>
      </Stack>
    </StyledRoot>
  );
}
