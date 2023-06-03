import {
  AngryIcon,
  CareIcon,
  HeartIcon,
  LaughIcon,
  LikeIcon,
  SadIcon,
  WowIcon,
} from '@/assets/reactionIcons';
import { useFetchUsersBasicInfoQuery } from '@/redux/services/usersBasicInfoAPI';
import { IReactionWithBasicInfo, IReactionsMap, TReactionType } from '@/types/reaction';
import { IUserBasicInfo } from '@/types/user';

type TReactionsByTypes = {
  //eslint-disable-next-line no-unused-vars
  [key in TReactionType]: { count: number; icon: string };
};

export default function useDeserializeReactions(reactions: IReactionsMap) {
  const { data, isLoading } = useFetchUsersBasicInfoQuery({});

  const usersPublicData: IUserBasicInfo[] | [] = data
    ? Object.entries(data).map(([id, profileData]) => ({
        id,
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        picture: profileData.pictureUrl,
      }))
    : [];

  const reactingUsers: IReactionWithBasicInfo[] = Object.entries(reactions)
    .filter(([userId, type]) => userId && type)
    .map(([userId, type]) => {
      const info = usersPublicData?.find((user) => user.id === userId) as IUserBasicInfo;
      return { userId, type, info } as IReactionWithBasicInfo;
    });

  const reactionsCount = Object.keys(reactions).length || 0;
  const reactionsByTypes: TReactionsByTypes = {
    like: { count: 0, icon: LikeIcon },
    love: { count: 0, icon: HeartIcon },
    haha: { count: 0, icon: LaughIcon },
    wow: { count: 0, icon: WowIcon },
    sad: { count: 0, icon: SadIcon },
    angry: { count: 0, icon: AngryIcon },
    care: { count: 0, icon: CareIcon },
  };

  for (const reactionType of Object.values(reactions)) {
    if (!reactionType || !reactionsByTypes[reactionType]) continue;
    reactionsByTypes[reactionType].count += 1;
  }

  const largestByType = Object.entries(reactionsByTypes)
    .map(([type, { count, icon }]) => ({ type, count, icon }))
    .sort((a, b) => b.count - a.count);

  const usedReactions = Object.entries(reactionsByTypes).filter(
    (reaction) => reaction[1].count > 0,
  );

  return {
    isLoading,
    reactingUsers,
    reactionsCount,
    largestByType,
    reactionsByTypes,
    usedReactions,
  };
}
