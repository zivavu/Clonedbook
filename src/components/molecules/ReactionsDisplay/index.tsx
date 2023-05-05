import { Box, ButtonBase, Typography, useTheme } from '@mui/material';

import { StyledRoot } from './styles';

import ReactionIcon from '@/components/atoms/ReactionIcon';
import { useFetchUserQuery } from '@/features/userAPI';
import useDeserializeReactions from '@/utils/useDeserializeReactions';
import { useState } from 'react';
import ReactionsPortal from '../../organisms/ReactionsModal';
import { ReactionsDisplayProps } from './types';

export default function ReactionsDisplay({
  reactions,
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
  const userId = user?.profileId || '';
  const [showModal, setShowModal] = useState(false);

  reactions = userReaction ? { ...reactions, [userId]: userReaction } : reactions;

  const { isLoading, reactingUsers, largestByType, reactionsCount, usedReactions } =
    useDeserializeReactions(reactions);

  const otherUsersCount = reactionsCount;
  emotesCount = emotesCount > usedReactions.length ? usedReactions.length : emotesCount;
  const reactorsToDisplay = reactingUsers.slice(0, 3);

  const handleShowModal = () => {
    setShowModal(true);
  };

  return isLoading ? null : (
    <>
      {showModal && <ReactionsPortal setShowModal={setShowModal} reactions={reactions} />}
      <StyledRoot {...rootProps} sx={sx}>
        <ButtonBase
          onClick={() => handleShowModal()}
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
              <ReactionIcon key={reaction.type} src={reaction.icon} zIndex={3 - i} size={size} />
            );
          })}
        </Box>
        <Box
          display='flex'
          ml={theme.spacing(0.5)}
          mt={theme.spacing(0.2)}
          color={theme.palette.text.secondary}>
          {displayNames && (
            <>
              {userReaction ? (
                <Typography variant='subtitle2'>
                  You {reactionsCount > 1 ? `and ${otherUsersCount} others` : ''}
                </Typography>
              ) : (
                reactorsToDisplay.map((reactor, i) => {
                  const isLast = reactorsToDisplay.length === i + 1;
                  const userText = [reactor.info.firstName, reactor.info.lastName].join(' ');
                  return (
                    <Box key={reactor.info.profileId}>
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
