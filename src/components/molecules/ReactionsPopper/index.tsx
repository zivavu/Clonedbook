import { Box, Button, Fade, IconButton, keyframes, Popover, Slider, Typography, useTheme } from '@mui/material';

import { StyledAnimationWrapper, StyledPopperBody, StyledReactionsPopper } from './styles';

import ReactionIcon from '@/components/atoms/ReactionIcon';
import { useAllUsersBasicInfoQuery } from '@/redux/services/allUsersPublicDataAPI';
import { useGetLoggedUserQuery } from '@/redux/services/loggedUserAPI';
import { TReactionType } from '@/types/reaction';
import React, { useState } from 'react';
import { ReactionsPopperProps } from './types';

export default function ReactionsPopper({
  anchorEl,
  open,
  handleMouseOver,
  handleMouseOut,
  updateDocHandler,
  sx,
  element, // expects { ownerId: string }
  sliderAnchor,
  onSliderClose,
  ...rootProps
}: ReactionsPopperProps & { element?: { ownerId: string }, sliderAnchor?: HTMLElement | null, onSliderClose?: () => void }) {
  const theme = useTheme();
  const { data: user } = useGetLoggedUserQuery({});
  const { data: allUsers } = useAllUsersBasicInfoQuery({});
  const totalUsers = allUsers ? Object.keys(allUsers).length : 1;

  const reactionTypes: TReactionType[] = ['like', 'love', 'care', 'haha', 'wow', 'sad', 'angry'];

  const [customLikeAmount, setCustomLikeAmount] = useState(1);

  const isOwner = user && element && user.id === element.ownerId;

  function handleReaction(type: TReactionType, event?: React.MouseEvent) {
    if (!user) return;
    if (type === 'like' && isOwner && event?.type === 'click') {
      // Do nothing, double-click will handle slider
    } else {
      updateDocHandler(type);
    }
  }

  function handleCustomLikeSubmit() {
    // TODO: Pass customLikeAmount to parent handler if needed
    updateDocHandler('like');
    if (onSliderClose) onSliderClose();
  }

  return (
    <StyledReactionsPopper
      {...rootProps}
      anchorEl={anchorEl}
      open={open}
      sx={sx}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      transition>
      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={250}>
          <StyledPopperBody>
            <StyledAnimationWrapper>
              {reactionTypes.map((reactionType, i) => {
                const slidein = keyframes`
                    from {
                      transform: translateX(${i * 25 - 50}px) scale(0.6);
                    }
                    to {
                      transform: translateX(0px) scale(1);
                    }`;
                return (
                  <IconButton
                    key={reactionType}
                    onClick={(e) => handleReaction(reactionType, e)}
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
            <Popover
              open={!!sliderAnchor}
              anchorEl={sliderAnchor}
              onClose={onSliderClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
              transformOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
              <Box sx={{ p: 2, width: 240 }}>
                <Typography gutterBottom variant="subtitle1" fontWeight={600}>
                  Set custom like amount
                </Typography>
                <Slider
                  value={customLikeAmount}
                  min={1}
                  max={totalUsers}
                  step={1}
                  marks={[{ value: 1, label: '1' }, { value: totalUsers, label: `${totalUsers}` }]}
                  onChange={(_, val) => setCustomLikeAmount(val as number)}
                  valueLabelDisplay="on"
                  sx={{ mb: 2 }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleCustomLikeSubmit}
                >
                  Like x{customLikeAmount}
                </Button>
              </Box>
            </Popover>
          </StyledPopperBody>
        </Fade>
      )}
    </StyledReactionsPopper>
  );
}
