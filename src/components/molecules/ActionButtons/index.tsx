import { IconButton, Menu, Stack, Typography, useTheme } from '@mui/material';

import { StyledActionButton, StyledActionIcon, StyledReactionsMenu, StyledRoot } from './styles';

import { LikeIcon } from '@/assets/reactionIcons';
import ReactionIcon from '@/components/atoms/ReactionIcon';
import { TReactionType } from '@/types/reaction';
import { MouseEvent, useRef, useState } from 'react';
import { ActionButtonsProps } from './types';

export default function ActionButtons({ post, sx, ...rootProps }: ActionButtonsProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();

  function handleClose() {
    setAnchorEl(null);
  }
  function openReactionsMenu() {
    setAnchorEl(likeButtonRef.current);
  }
  const likeButtonRef = useRef<HTMLButtonElement>(null);

  const reactionTypes: TReactionType[] = ['like', 'love', 'care', 'haha', 'wow', 'sad', 'angry'];

  const [hoveredIcon, setHoveredIcon] = useState<TReactionType>('like');
  return (
    <StyledRoot {...rootProps} sx={sx}>
      <StyledActionButton
        value='like'
        ref={likeButtonRef}
        onMouseOver={() => openReactionsMenu()}
        onClick={() => openReactionsMenu()}
      >
        <StyledActionIcon icon={['far', 'thumbs-up']} />
        <Typography variant='subtitle2' fontWeight='500'>
          Like
        </Typography>
      </StyledActionButton>
      <StyledActionButton value='comment' sx={{ mr: theme.spacing(0.3), ml: theme.spacing(0.3) }}>
        <StyledActionIcon icon={['far', 'comment']} />
        <Typography variant='subtitle2' fontWeight='500'>
          Comment
        </Typography>
      </StyledActionButton>
      <StyledActionButton value='share'>
        <StyledActionIcon icon={['far', 'share-square']} />
        <Typography variant='subtitle2' fontWeight='500'>
          Share
        </Typography>
      </StyledActionButton>
      <StyledReactionsMenu
        disableScrollLock
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleClose()}
        sx={{ '& .MuiMenu-root': { borderRadius: '30px !important', backgroundColor: 'red' } }}
      >
        <Stack direction='row'>
          {reactionTypes.map((reactionType) => {
            const isHovered = hoveredIcon === reactionType;
            return (
              <IconButton
                key={reactionType}
                onMouseOver={() => setHoveredIcon(reactionType)}
                sx={{
                  width: '42px',
                  height: '42px',
                  margin: theme.spacing(0, 0.3),
                  transform: isHovered ? 'scale(1.2)' : 'scale(1)',
                  transition: 'transform 0.1s ease-in-out',
                }}
              >
                <ReactionIcon size={36} type={reactionType} showBorder={false} overlap={false} />
              </IconButton>
            );
          })}
        </Stack>
      </StyledReactionsMenu>
    </StyledRoot>
  );
}
