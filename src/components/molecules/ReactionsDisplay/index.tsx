import { Box, ButtonBase, Typography, useTheme } from '@mui/material';

import { StyledRoot } from './styles';

import ReactionIcon from '@/components/atoms/ReactionIcon';
import { useFetchUserQuery } from '@/features/userAPI';
import deserializeReactions from '@/utils/deserializeReactions';
import { useState } from 'react';
import ReactionsPortal from '../../organisms/ReactionsModal';
import { ReactionsDisplayProps } from './types';

export default function ReactionsDisplay({
  reactions,
  exampleReactors,
  userReaction,
  sx,
  emotesCount = 3,
  displayNames = true,
  displayCount = false,
  size = 22,
  ...rootProps
}: ReactionsDisplayProps) {
  const theme = useTheme();
  const { data: user } = useFetchUserQuery({});
  const [showModal, setShowModal] = useState(false);

  reactions = userReaction
    ? [...reactions.filter((reaction) => reaction.userId !== userReaction.userId), userReaction]
    : reactions;

  const { largestByType, reactionsCount, usedReactions } = deserializeReactions(reactions);

  emotesCount = emotesCount > usedReactions.length ? usedReactions.length : emotesCount;

  const exampleReactorsSlice = exampleReactors?.slice(0, 2) || [];
  const reactorsToDisplay = userReaction
    ? exampleReactorsSlice.filter((reactor) => reactor.profileId !== user?.profileId)
    : exampleReactorsSlice;
  const otherUsersCount = reactionsCount - reactorsToDisplay.length;
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
          focusRipple
          sx={{
            borderRadius: theme.spacing(3),
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
          {displayNames && (
            <>
              {userReaction ? (
                <Typography variant='subtitle2'>
                  You {reactionsCount > 1 ? `and ${otherUsersCount} others` : ''}
                </Typography>
              ) : (
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
                            {userText}&nbsp;
                            {otherUsersCount === 1 ? `and 1 other` : ''}
                            {otherUsersCount > 1 ? `and ${otherUsersCount} others` : ''}
                          </Typography>
                        </>
                      )}
                    </Box>
                  );
                })
              )}
            </>
          )}
          {displayCount && (
            <Typography pr={theme.spacing(0.7)} variant='caption'>
              {reactionsCount}
            </Typography>
          )}
        </Box>
      </StyledRoot>
    </>
  );
}
