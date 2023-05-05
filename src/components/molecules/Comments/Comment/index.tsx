import { Box, Stack, Typography, useTheme } from '@mui/material';

import { StyledRoot, StyledTextContent } from './styles';

import StyledInteractButton from '@/components/atoms/StyledInteractButton';
import UserAvatar from '@/components/atoms/UserAvatar';
import { useFetchUserQuery } from '@/features/userAPI';
import { useFetchUsersPublicDataQuery } from '@/features/usersPublicDataAPI';
import { TReactionType } from '@/types/reaction';
import isObjectEmpty from '@/utils/objectManagment/isObjectEmpty';
import { separateUserBasicInfo } from '@/utils/separateUserBasicInfo';
import { userCommentReact } from '@/utils/userCommentReact';
import { useEffect, useRef, useState } from 'react';
import ReactionsPopper from '../../ActionButtons/ReactionsPopper';
import ReactionsDisplay from '../../ReactionsDisplay';
import { CommentProps } from './types';

export default function Comment({ post, comment, ...rootProps }: CommentProps) {
  const theme = useTheme();
  const { data: user } = useFetchUserQuery({});
  const { data: allUsersBasicInfo } = useFetchUsersPublicDataQuery({});
  const [ownerData, setOwnerData] = useState(
    (allUsersBasicInfo && allUsersBasicInfo[comment.ownerId]) || null,
  );

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mouseOverReactionElements, setMouseOverReactionElements] = useState(false);
  const likeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!allUsersBasicInfo) return;
    setOwnerData(allUsersBasicInfo[comment.ownerId]);
  }, [allUsersBasicInfo]);

  const shouldDisplayOnRightSite = comment.commentText.length < 25;
  const [userReaction, setUserReaction] = useState<TReactionType | null>(
    (comment.reactions && comment.reactions[user?.profileId || '']) || null,
  );

  function handleMouseEnter() {
    setAnchorEl(likeButtonRef.current);
    setMouseOverReactionElements(true);
  }
  function handleMouseLeave() {
    setMouseOverReactionElements(false);
  }

  function handleLikeClick() {
    if (!user || !post) return;
    setMouseOverReactionElements(false);
    if (!userReaction) {
      setUserReaction('like');
      userCommentReact(post, comment, separateUserBasicInfo(user), 'like');
    } else {
      setUserReaction(null);
    }
  }
  return (
    <StyledRoot {...rootProps}>
      <Box display='flex' alignItems='center'>
        <UserAvatar src={ownerData?.profilePicture || ''} sx={{ alignSelf: 'start' }} size={32} />
        <StyledTextContent>
          {!!ownerData && (
            <>
              <Typography variant='body2' fontWeight='400' lineHeight='1.2rem'>
                {ownerData.firstName} {ownerData.lastName}
              </Typography>
              <Typography variant='body2' lineHeight='1.2rem'>
                {comment.commentText}
              </Typography>
            </>
          )}
          {comment.reactions && !isObjectEmpty(comment.reactions) && (
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
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClickHandler={handleLikeClick}
          sx={{
            mr: theme.spacing(1),
            textTransform: 'capitalize',
            color: theme.palette.reactionTypes[userReaction || 'default'],
          }}>
          {userReaction ? userReaction : 'Like'}
        </StyledInteractButton>
        <StyledInteractButton>Reply</StyledInteractButton>
      </Stack>
      <ReactionsPopper
        updateDocHandler={(type) => {
          if (!user) return;
          userCommentReact(post, comment, separateUserBasicInfo(user), type);
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
