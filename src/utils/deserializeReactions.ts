import {
  AngryIcon,
  CareIcon,
  HeartIcon,
  LaughIcon,
  LikeIcon,
  SadIcon,
  WowIcon,
} from '@/assets/reactionIcons';
import { IReactionReference, TReactionType } from '@/types/reaction';

type ReactionsByTypes = {
  //eslint-disable-next-line no-unused-vars
  [key in TReactionType]: { count: number; icon: string };
};

const deserializeReactions = (reactions: IReactionReference[]) => {
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

  const largestByType = Object.entries(reactionsByTypes)
    .map(([type, { count, icon }]) => ({ type, count, icon }))
    .sort((a, b) => b.count - a.count);

  return { reactionsCount, largestByType, reactionsByTypes };
};

export default deserializeReactions;
