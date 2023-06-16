import { Typography, useTheme } from '@mui/material';

import { StyledActionButton, StyledActionIcon, StyledRoot } from './styles';

import ReactionIcon from '@/components/atoms/ReactionIcon';
import { useGetLoggedUserQuery } from '@/redux/services/loggedUserAPI';
import updateElementReaction from '@/services/reactions/updateElementReaction';
import { TLocalUserReaction } from '@/types/reaction';
import ReactionsPopper from '../ReactionsPopper';
import useReactionsPopperHandlers from '../ReactionsPopper/useReactionsPopperHandlers';
import { ActionButtonsProps } from './types';

export default function ActionButtons({
  element,
  elementType,
  refetchElement,
  handleCommentClick,
  sx,
  ...rootProps
}: ActionButtonsProps) {
  const { data: loggedUser } = useGetLoggedUserQuery({});
  const theme = useTheme();

  const userReaction = element.reactions && element.reactions[loggedUser?.id || ''];

  const {
    isPopperOpen,
    popperAnchorElRef,
    handlePopperOpen,
    handlePopperClose,
    handleTouchStart,
    handleTouchEnd,
  } = useReactionsPopperHandlers();

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
    await refetchElement();
    handlePopperClose();
  }

  function handleLikeButtonClick() {
    if (!loggedUser) return;
    handlePopperClose();
    if (!userReaction) {
      handleUpdateElementReaction('like');
    } else {
      handleUpdateElementReaction(null);
    }
  }

  return (
    <StyledRoot {...rootProps} sx={sx}>
      <ReactionsPopper
        anchorEl={popperAnchorElRef.current}
        placement={elementType === 'post' ? 'top-start' : 'top'}
        updateDocHandler={(reaction) => {
          handleUpdateElementReaction(reaction);
        }}
        handleMouseOver={handlePopperOpen}
        handleMouseOut={handlePopperClose}
        open={isPopperOpen}
      />

      <StyledActionButton
        focusRipple
        value='like'
        ref={popperAnchorElRef}
        onMouseEnter={handlePopperOpen}
        onMouseLeave={handlePopperClose}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
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
        onClick={handleCommentClick}
        sx={{ mr: theme.spacing(0.3), ml: theme.spacing(0.3) }}>
        <StyledActionIcon icon={['far', 'comment']} />
        <Typography variant='subtitle2' fontWeight='400'>
          Comment
        </Typography>
      </StyledActionButton>

      <StyledActionButton focusRipple value='share' disabled>
        <StyledActionIcon icon={['far', 'share-square']} color={theme.palette.text.disabled} />
        <Typography variant='subtitle2' fontWeight='400' color={theme.palette.text.disabled}>
          Share
        </Typography>
      </StyledActionButton>
    </StyledRoot>
  );
}
