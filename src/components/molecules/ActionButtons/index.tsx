import { Typography, useTheme } from '@mui/material';

import { StyledActionButton, StyledActionIcon, StyledRoot } from './styles';

import updateElementReaction from '@/common/updateData/reactions/updateElementReaction';
import ReactionIcon from '@/components/atoms/ReactionIcon';
import { useFetchLoggedUserQuery } from '@/redux/services/userAPI';
import { TLocalUserReaction } from '@/types/reaction';
import { useRef, useState } from 'react';
import ReactionsPopper from './ReactionsPopper';
import { ActionButtonsProps } from './types';

export default function ActionButtons({
  element,
  refetchElement,
  elementType,
  sx,
  ...rootProps
}: ActionButtonsProps) {
  const { data: loggedUser } = useFetchLoggedUserQuery({});
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mouseOverReactionElements, setMouseOverReactionElements] = useState(false);
  const likeButtonRef = useRef<HTMLButtonElement>(null);

  const userReaction = element.reactions && element.reactions[loggedUser?.id || ''];

  function handleMouseOver() {
    setAnchorEl(likeButtonRef.current);
    setMouseOverReactionElements(true);
  }
  function handleMouseOut() {
    setMouseOverReactionElements(false);
  }

  async function handleUpdateElementReaction(reaction: TLocalUserReaction) {
    if (!loggedUser) return;
    const loggedUserId = loggedUser.id;
    await updateElementReaction({
      elementId: element.id,
      loggedUserId,
      elementOwnerId: element.ownerId,
      elementType,
      reaction,
    });
    refetchElement();
  }

  function handleLikeButtonClick() {
    if (!loggedUser) return;
    setMouseOverReactionElements(false);
    if (!userReaction) {
      handleUpdateElementReaction('like');
    } else {
      handleUpdateElementReaction(null);
    }
  }

  return (
    <StyledRoot {...rootProps} sx={sx}>
      <ReactionsPopper
        anchorEl={anchorEl}
        updateDocHandler={(reaction) => {
          handleUpdateElementReaction(reaction);
        }}
        setAnchorEl={setAnchorEl}
        placement='top-start'
        mouseOver={mouseOverReactionElements}
        setMouseOver={setMouseOverReactionElements}
        open={false}
      />
      <StyledActionButton
        focusRipple
        value='like'
        ref={likeButtonRef}
        onMouseEnter={handleMouseOver}
        onMouseLeave={handleMouseOut}
        onClick={handleLikeButtonClick}>
        {userReaction ? (
          <ReactionIcon
            type={userReaction}
            size={20}
            showBorder={false}
            overlap={false}
            sx={{ m: theme.spacing(0, 1) }}
          />
        ) : (
          <StyledActionIcon icon={['far', 'thumbs-up']} />
        )}
        <Typography
          variant='subtitle2'
          fontWeight='400'
          textTransform='capitalize'
          color={theme.palette.common.reactionTypes[userReaction || 'default']}>
          {userReaction || 'Like'}
        </Typography>
      </StyledActionButton>

      <StyledActionButton
        focusRipple
        value='comment'
        sx={{ mr: theme.spacing(0.3), ml: theme.spacing(0.3) }}>
        <StyledActionIcon icon={['far', 'comment']} />
        <Typography variant='subtitle2' fontWeight='400'>
          Comment
        </Typography>
      </StyledActionButton>

      <StyledActionButton focusRipple value='share'>
        <StyledActionIcon icon={['far', 'share-square']} />
        <Typography variant='subtitle2' fontWeight='400'>
          Share
        </Typography>
      </StyledActionButton>
    </StyledRoot>
  );
}
