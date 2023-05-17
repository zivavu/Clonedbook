import { IconButton, keyframes, useTheme } from '@mui/material';

import { StyledContentWrapper, StyledReactionsPopover as StyledReactionsPopper } from './styles';

import ReactionIcon from '@/components/atoms/ReactionIcon';
import { useFetchLoggedUserQuery } from '@/features/userAPI';
import { TReactionType } from '@/types/reaction';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ReactionsPopperProps } from './types';

export default function ReactionsPopper({
  anchorEl,
  setAnchorEl,
  updateDocHandler,
  open = false,
  mouseOver,
  setMouseOver,
  setUserReaction,
  sx,
  ...rootProps
}: ReactionsPopperProps) {
  const theme = useTheme();
  const { data: user } = useFetchLoggedUserQuery({});

  const [isOpen, setIsOpen] = useState(open);
  const popperRef = useRef<HTMLDivElement | null>(null);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setAnchorEl(null);
  }, [setAnchorEl]);

  // Opening the popper
  useEffect(() => {
    const openTimeout = setTimeout(() => {
      if (anchorEl && mouseOver) {
        setIsOpen(true);
      }
    }, 200);
    return () => clearTimeout(openTimeout);
  }, [anchorEl, mouseOver]);

  // Closing and fading out the popper
  useEffect(() => {
    const closeTimeout = setTimeout(() => {
      if (!mouseOver) {
        handleClose();
      }
    }, 500);
    const fadeTimeout = setTimeout(() => {
      if (!mouseOver) {
        popperRef.current?.classList.add('fade-out');
      }
    }, 350);
    return () => {
      clearTimeout(fadeTimeout);
      clearTimeout(closeTimeout);
    };
  }, [mouseOver, handleClose]);

  const reactionTypes: TReactionType[] = ['like', 'love', 'care', 'haha', 'wow', 'sad', 'angry'];

  function handleReaction(type: TReactionType) {
    if (!user) return;
    setUserReaction(type);
    updateDocHandler(type);
    setIsOpen(false);
  }

  return (
    <StyledReactionsPopper
      {...rootProps}
      anchorEl={anchorEl}
      open={isOpen}
      ref={popperRef}
      sx={sx}
      onMouseEnter={() => setMouseOver(true)}
      onMouseLeave={() => setMouseOver(false)}>
      <StyledContentWrapper>
        {reactionTypes.map((reactionType, i) => {
          const slidein = keyframes`
          from {
            transform: translateX(${i * 20 - 40}px) scale(0.7);
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
              <ReactionIcon size={40} type={reactionType} showBorder={false} overlap={false} />
            </IconButton>
          );
        })}
      </StyledContentWrapper>
    </StyledReactionsPopper>
  );
}
