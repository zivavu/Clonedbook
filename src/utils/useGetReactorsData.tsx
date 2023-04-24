import { db } from '@/config/firebase.config';
import { IReactionReference, IUserReaction } from '@/types/reaction';
import { IBasicUserInfo } from '@/types/user';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';

const useGetReactorsData = (reactions: IReactionReference[]) => {
  const [usersReactions, setUsersReactions] = useState<IUserReaction[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>(undefined);

  useEffect(() => {
    const loadReactions = async () => {
      try {
        const usersIds = reactions?.map((reaction) => reaction.userId) || [];
        const usersDataRef = collection(db, 'usersPublicData');
        const queries = [];
        for (let i = 0; i < usersIds.length; i += 10) {
          const batch = usersIds.slice(i, i + 10);
          const q = query(usersDataRef, where('__name__', 'in', batch));
          queries.push(q);
        }
        const reads = queries.map((query) => getDocs(query));
        const result = await Promise.all(reads);
        const usersData = result.flatMap((doc) =>
          doc.docs.map((doc) => doc.data()),
        ) as IBasicUserInfo[];
        const reactionsData: IUserReaction[] = usersData.map((user) => {
          const reaction = reactions.find(
            (reaction) => reaction.userId === user.profileId,
          ) as IReactionReference;
          return { userInfo: user, ...reaction };
        });

        setUsersReactions(reactionsData);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };
    loadReactions();
  }, [reactions]);

  return { usersReactions, isLoading, error };
};

export default useGetReactorsData;
