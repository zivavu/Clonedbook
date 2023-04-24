import { Box, ButtonBase, Typography, useTheme } from '@mui/material';

import { StyledRoot } from './styles';

import ReactionIcon from '@/components/atoms/ReactionIcon';
import deserializeReactions from '@/utils/deserializeReactions';
import { useState } from 'react';
import ReactionsPortal from '../../organisms/ReactionsModal';
import { ReactionsDisplayProps } from './types';

export default function ReactionsDisplay({
  reactions,
  exampleReactors,
  sx,
  emotesCount = 3,
  displayNames = true,
  displayCount = false,
  size = 22,
  ...rootProps
}: ReactionsDisplayProps) {
  const theme = useTheme();
  const [showModal, setShowModal] = useState(false);

  const { reactionsByTypes, largestByType, reactionsCount } = deserializeReactions(reactions);

  const reactorsToDisplay = exampleReactors?.slice(0, emotesCount) || [];

  const handleShowPortal = () => {
    setShowModal(true);
  };

  return (
    <>
      {showModal && <ReactionsPortal setShowModal={setShowModal} reactionsArr={reactions} />}
      <StyledRoot {...rootProps} sx={sx}>
        <ButtonBase
          onClick={() => handleShowPortal()}
          TouchRippleProps={{
            style: { color: theme.palette.primary.main },
          }}
          sx={{
            borderRadius: theme.spacing(2),
            padding: displayNames ? theme.spacing(2) : 0,
            position: 'absolute',
            left: '-2%',
            width: '104%',
            height: '100%',
            zIndex: 3,
          }}
        />
        <Box display='flex' sx={{ pr: theme.spacing(0.25), pointerEvents: 'none' }}>
          {largestByType.slice(0, emotesCount).map((reaction, i) => {
            return (
              <ReactionIcon key={reaction.type} src={reaction.icon} zIndex={10 - i} size={size} />
            );
          })}
        </Box>
        <Box
          display='flex'
          ml={theme.spacing(0.5)}
          mt={theme.spacing(0.2)}
          color={theme.palette.text.secondary}
        >
          {displayNames &&
            reactorsToDisplay.map((reactor, i) => {
              const isLast = reactorsToDisplay.length === i + 1;
              const userText = [reactor.firstName, reactor.lastName].join(' ');
              return (
                <Box key={reactor.profileId}>
                  {!isLast ? (
                    <Typography variant='subtitle2'>{userText},&nbsp;</Typography>
                  ) : (
                    <>
                      <Typography variant='subtitle2'>
                        {userText}&nbsp;and {reactionsCount - reactorsToDisplay.length} others
                      </Typography>
                    </>
                  )}
                </Box>
              );
            })}
          {displayCount && (
            <Typography pr={theme.spacing(0.5)} variant='caption'>
              {reactionsCount}
            </Typography>
          )}
        </Box>
      </StyledRoot>
    </>
  );
}
