import { Box, ButtonBase, Typography, useTheme } from '@mui/material';

import { StyledRoot } from './styles';

import {
  AngryIcon,
  CareIcon,
  HeartIcon,
  LaughIcon,
  LikeIcon,
  SadIcon,
  WowIcon,
} from '@/assets/reactionIcons';
import ReactionIcon from '@/components/atoms/ReactionIcon';
import { db } from '@/config/firebase.config';
import { IUserReaction } from '@/types/reaction';
import { IBasicUserInfo } from '@/types/user';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import ReactionsPortal from './ReactionsPortal';
import { ReactionsByTypes, ReactionsDisplayProps } from './types';

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

  const [reactingUsers, setReactingUsers] = useState<IBasicUserInfo[] | undefined>(undefined);
  const [shouldLoadReactions, setShouldLoadReactions] = useState(false);

  useEffect(() => {
    const loadReactions = async () => {
      if (!shouldLoadReactions || reactingUsers) return;

      const usersIds = reactions?.map((reaction) => reaction.userId) || [];
      const usersDataRef = collection(db, 'usersPublicData');

      const reads = usersIds.map((userId) => getDoc(doc(usersDataRef, userId)));
      const result = await Promise.all(reads);
      const usersData = result.map((doc) => doc.data());
      setReactingUsers(usersData as IBasicUserInfo[]);
    };
    loadReactions();
  }, [shouldLoadReactions, reactingUsers, reactions]);

  const [showPortal, setShowPortal] = useState(false);

  const reactionsCount = reactions?.length || 0;
  if (!reactions || !reactionsCount) return null;

  const reactionsByTypes: ReactionsByTypes = {
    like: { count: 0, icon: LikeIcon },
    love: { count: 0, icon: HeartIcon },
    haha: { count: 0, icon: LaughIcon },
    wow: { count: 0, icon: WowIcon },
    sad: { count: 0, icon: SadIcon },
    angry: { count: 0, icon: AngryIcon },
    care: { count: 0, icon: CareIcon },
  };

  reactions?.forEach((reaction) => {
    const { type } = reaction;
    if (type in reactionsByTypes) {
      reactionsByTypes[type].count += 1;
    }
  });

  const highestReactionCountsByType = Object.entries(reactionsByTypes)
    .map(([type, { count, icon }]) => ({ type, count, icon }))
    .sort((a, b) => b.count - a.count);

  const reactorsToDisplay = exampleReactors?.slice(0, emotesCount) || [];

  const handleShowPortal = () => {
    setShouldLoadReactions(true);
    setShowPortal(true);
  };

  return (
    <>
      {showPortal && <ReactionsPortal setShowPortal={setShowPortal} reactionsArr={reactions} />}
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
          {highestReactionCountsByType.slice(0, emotesCount).map((reaction, i) => {
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
