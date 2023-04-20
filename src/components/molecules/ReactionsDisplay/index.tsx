import { Box, Typography, useTheme } from '@mui/material';

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

  const reactionsCount = reactions?.length || 0;

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
  return (
    <StyledRoot {...rootProps} sx={sx}>
      <Box display='flex' sx={{ pr: theme.spacing(0.25) }}>
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
  );
}
