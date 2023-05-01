import { IconButton, keyframes, useTheme } from '@mui/material';

import { StyledContentWrapper, StyledReactionsPopover as StyledReactionsPopper } from './styles';

import ReactionIcon from '@/components/atoms/ReactionIcon';
import { useFetchUserQuery } from '@/features/userAPI';
import { TReactionType } from '@/types/reaction';
import { userPostReact } from '@/utils/userPostReact';
import { Ref, useCallback, useEffect, useRef, useState } from 'react';
import { ReactionsPopperProps } from './types';

export default function ReactionsPopper({
  post,
  anchorEl,
  setAnchorEl,
  mouseOver,
  setMouseOver,
  sx,
}: ReactionsPopperProps) {
  const theme = useTheme();
  const { data: user } = useFetchUserQuery({});

  const [open, setOpen] = useState(false);
  const popperRef = useRef<HTMLDivElement | null>(null);

  const handleClose = useCallback(() => {
    setOpen(false);
    setAnchorEl(null);
  }, [setAnchorEl]);

  useEffect(() => {
    const openTimeout = setTimeout(() => {
      if (anchorEl && mouseOver) {
        setOpen(true);
      }
    }, 200);
    return () => clearTimeout(openTimeout);
  }, [anchorEl, mouseOver]);

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
    userPostReact(post, user, type);
    setOpen(false);
  }

  return (
    <StyledReactionsPopper
      sx={sx}
      anchorEl={anchorEl}
      placement='top-start'
      ref={popperRef}
      onMouseEnter={() => setMouseOver(true)}
      onMouseLeave={() => setMouseOver(false)}
      open={open}
    >
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
                margin: theme.spacing(0.3, 0.7),
                transition: 'transform 0.1s ease-out',
                animation: `${slidein} 0.2s ease-out`,
                '&:hover': {
                  transform: 'scale(1.2) translateY(-5px)',
                },
              }}
            >
              <ReactionIcon size={40} type={reactionType} showBorder={false} overlap={false} />
            </IconButton>
          );
        })}
      </StyledContentWrapper>
    </StyledReactionsPopper>
  );
}
