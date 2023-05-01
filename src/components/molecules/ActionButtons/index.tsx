import { Typography, useTheme } from '@mui/material';

import { StyledActionButton, StyledActionIcon, StyledRoot } from './styles';

import ReactionIcon from '@/components/atoms/ReactionIcon';
import { useFetchUserQuery } from '@/features/userAPI';
import { userPostReact } from '@/utils/userPostReact';
import { useRef, useState } from 'react';
import ReactionsPopper from './ReactionsPopper';
import { ActionButtonsProps } from './types';

export default function ActionButtons({
  post,
  userReaction,
  setUserReaction,
  sx,
  ...rootProps
}: ActionButtonsProps) {
  const { data: user } = useFetchUserQuery({});
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
    if (!user) return;
    setMouseOverReactionElements(false);
    if (!userReaction) {
      setUserReaction({ userId: user.profileId, type: 'like' });
      userPostReact(post, user, 'like');
    } else {
      setUserReaction(null);
      userPostReact(post, user, null);
    }
  }

  const typesColors = {
    like: theme.palette.primary.main,
    love: '#F44336',
    care: '#d49820',
    haha: '#d49820',
    wow: '#d49820',
    sad: '#d49820',
    angry: '#F44336',
    default: theme.palette.text.secondary,
  };

  return (
    <StyledRoot {...rootProps} sx={sx}>
      <ReactionsPopper
        post={post}
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        mouseOver={mouseOverReactionElements}
        setMouseOver={setMouseOverReactionElements}
        setUserReaction={setUserReaction}
      />
      <StyledActionButton
        value='like'
        ref={likeButtonRef}
        onMouseEnter={handleMouseOver}
        onMouseLeave={handleMouseOut}
        onClick={handleReactionClick}
      >
        {userReaction ? (
          <ReactionIcon
            type={userReaction.type}
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
          color={typesColors[userReaction?.type || 'default']}
        >
          {userReaction?.type || 'Like'}
        </Typography>
      </StyledActionButton>

      <StyledActionButton value='comment' sx={{ mr: theme.spacing(0.3), ml: theme.spacing(0.3) }}>
        <StyledActionIcon icon={['far', 'comment']} />
        <Typography variant='subtitle2' fontWeight='400'>
          Comment
        </Typography>
      </StyledActionButton>

      <StyledActionButton value='share'>
        <StyledActionIcon icon={['far', 'share-square']} />
        <Typography variant='subtitle2' fontWeight='400'>
          Share
        </Typography>
      </StyledActionButton>
    </StyledRoot>
  );
}
