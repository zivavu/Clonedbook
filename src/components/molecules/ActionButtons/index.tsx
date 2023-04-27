import { Typography, useTheme } from '@mui/material';

import { StyledActionButton, StyledActionIcon, StyledRoot } from './styles';

import { useRef, useState } from 'react';
import ReactionsPopover from './ReactionsPopover';
import { ActionButtonsProps } from './types';

export default function ActionButtons({ post, sx, ...rootProps }: ActionButtonsProps) {
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const likeButtonRef = useRef<HTMLButtonElement>(null);
  function openReactionsMenu() {
    setAnchorEl(likeButtonRef.current);
  }

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
      <ReactionsPopover post={post} anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
    </StyledRoot>
  );
}
