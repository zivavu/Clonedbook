import { Typography, useTheme } from '@mui/material';

import { StyledActionButton, StyledActionIcon, StyledRoot } from './styles';

import ReactionIcon from '@/components/atoms/ReactionIcon';
import updateElementReaction from '@/utils/updateElementReaction';
import { useRef, useState } from 'react';
import ReactionsPopper from './ReactionsPopper';
import { ActionButtonsProps } from './types';
import { useFetchLoggedUserQuery } from '@/redux/services/userAPI';

export default function ActionButtons({
  elementId,
  ownerId,
  userReaction,
  setUserReaction,
  elementType,
  sx,
  ...rootProps
}: ActionButtonsProps) {
  const { data: loggedUser } = useFetchLoggedUserQuery({});
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mouseOverReactionElements, setMouseOverReactionElements] = useState(false);
  const likeButtonRef = useRef<HTMLButtonElement>(null);

  function handleMouseOver() {
    setAnchorEl(likeButtonRef.current);
    setMouseOverReactionElements(true);
  }
  function handleMouseOut() {
    setMouseOverReactionElements(false);
  }

  function handleReactionClick() {
    if (!loggedUser) return;
    setMouseOverReactionElements(false);
    const loggedUserId = loggedUser.id;
    if (!userReaction) {
      setUserReaction('like');
      updateElementReaction({ elementId, loggedUserId, ownerId, elementType, reaction: 'like' });
    } else {
      setUserReaction(null);
      updateElementReaction({
        elementId,
        loggedUserId,
        ownerId,
        elementType,
        reaction: null,
      });
    }
  }

  return (
    <StyledRoot {...rootProps} sx={sx}>
      <ReactionsPopper
        anchorEl={anchorEl}
        updateDocHandler={(reaction) => {
          if (!loggedUser) return;
          const loggedUserId = loggedUser.id;
          updateElementReaction({
            elementId,
            loggedUserId,
            ownerId,
            elementType,
            reaction,
          });
        }}
        setAnchorEl={setAnchorEl}
        placement='top-start'
        mouseOver={mouseOverReactionElements}
        setMouseOver={setMouseOverReactionElements}
        setUserReaction={setUserReaction}
        open={false}
      />
      <StyledActionButton
        focusRipple
        value='like'
        ref={likeButtonRef}
        onMouseEnter={handleMouseOver}
        onMouseLeave={handleMouseOut}
        onClick={handleReactionClick}>
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
