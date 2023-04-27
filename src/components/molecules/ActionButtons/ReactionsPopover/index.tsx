import { IconButton, Stack, useTheme } from '@mui/material';

import { StyledReactionsPopover } from './styles';

import ReactionIcon from '@/components/atoms/ReactionIcon';
import { useFetchUserQuery } from '@/features/userAPI';
import { TReactionType } from '@/types/reaction';
import { userPostReact } from '@/utils/userPostReact';
import { useState } from 'react';
import { ReactionsPopoverProps } from './types';

export default function ReactionsPopover({
  post,
  anchorEl,
  setAnchorEl,
  sx,
}: ReactionsPopoverProps) {
  const { data: user } = useFetchUserQuery({});

  const theme = useTheme();
  const [hoveredIcon, setHoveredIcon] = useState<TReactionType>('like');

  const reactionTypes: TReactionType[] = ['like', 'love', 'care', 'haha', 'wow', 'sad', 'angry'];

  const open = Boolean(anchorEl);
  function handleClose() {
    setAnchorEl(null);
  }

  function handleReaction(type: TReactionType) {
    if (!user) return;
    userPostReact(post, user, type);
  }

  return (
    <StyledReactionsPopover
      sx={sx}
      disableScrollLock
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: -40, horizontal: 'left' }}
      open={open}
      onClose={() => handleClose()}
    >
      <Stack
        bgcolor='transparent'
        direction='row'
        overflow='clip'
        width='120%'
        height='70px'
        alignItems='center'
        onMouseLeave={() => handleClose()}
      >
        {reactionTypes.map((reactionType) => {
          const isHovered = hoveredIcon === reactionType;
          return (
            <IconButton
              key={reactionType}
              onMouseOver={() => setHoveredIcon(reactionType)}
              onClick={() => handleReaction(reactionType)}
              sx={{
                width: '40px',
                height: '40px',
                margin: theme.spacing(0.3, 0.7),
                transform: isHovered ? 'scale(1.2) translateY(-5px)' : 'scale(1)',
                transition: 'transform 0.1s ease-out',
              }}
            >
              <ReactionIcon size={40} type={reactionType} showBorder={false} overlap={false} />
            </IconButton>
          );
        })}
      </Stack>
    </StyledReactionsPopover>
  );
}
