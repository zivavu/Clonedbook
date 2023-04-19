import { Typography, useTheme } from '@mui/material';

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
import { ReactionsByTypes, ReactionsDisplayProps } from './types';

export default function ReactionsDisplay({ reactions, ...rootProps }: ReactionsDisplayProps) {
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
      console.log(reaction);
    }
  });
  const highestReactionCountByType = Object.entries(reactionsByTypes).sort(
    (a, b) => b[1].count - a[1].count,
  )[0];
  return (
    <StyledRoot {...rootProps}>
      <Typography>ReactionsDisplay</Typography>
    </StyledRoot>
  );
}
