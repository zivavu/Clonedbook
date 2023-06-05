import { Fade, IconButton, keyframes, useTheme } from '@mui/material';

import { StyledAnimationWrapper, StyledPopperBody, StyledReactionsPopper } from './styles';

import ReactionIcon from '@/components/atoms/ReactionIcon';
import { useLoggedUserQuery } from '@/redux/services/loggedUserAPI';
import { TReactionType } from '@/types/reaction';
import { useRef } from 'react';
import { ReactionsPopperProps } from './types';

export default function ReactionsPopper({
  anchorEl,
  open,
  setOpen,
  handleMouseOver,
  handleMouseOut,
  updateDocHandler,
  sx,
  ...rootProps
}: ReactionsPopperProps) {
  const theme = useTheme();
  const { data: user } = useLoggedUserQuery({});

  const popperRef = useRef<HTMLDivElement | null>(null);

  const reactionTypes: TReactionType[] = ['like', 'love', 'care', 'haha', 'wow', 'sad', 'angry'];

  function handleReaction(type: TReactionType) {
    if (!user) return;
    updateDocHandler(type);
    setOpen(false);
  }

  return (
    <StyledReactionsPopper
      {...rootProps}
      anchorEl={anchorEl}
      open={open}
      ref={popperRef}
      sx={sx}
      transition
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}>
      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={350}>
          <StyledPopperBody>
            <StyledAnimationWrapper>
              {reactionTypes.map((reactionType, i) => {
                const slidein = keyframes`
              from {
                transform: translateX(${i * 25 - 50}px) scale(0.7);
              }
              to {
                transform: translateX(0px) scale(1);
              }`;
                return (
                  <IconButton
                    key={reactionType}
                    onClick={() => handleReaction(reactionType)}
                    sx={{
                      width: '40px',
                      height: '40px',
                      margin: theme.spacing(0.3, 0.4),
                      transition: 'transform 0.1s ease-out',
                      animation: `${slidein} 0.2s ease-out`,
                      '&:hover': {
                        transform: 'scale(1.2) translateY(-5px)',
                      },
                    }}>
                    <ReactionIcon
                      size={40}
                      type={reactionType}
                      showBorder={false}
                      overlap={false}
                    />
                  </IconButton>
                );
              })}
            </StyledAnimationWrapper>
          </StyledPopperBody>
        </Fade>
      )}
    </StyledReactionsPopper>
  );
}
