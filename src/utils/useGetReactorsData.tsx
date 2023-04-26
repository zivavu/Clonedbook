import { db } from '@/config/firebase.config';
import { IReactionReference, IUserReaction } from '@/types/reaction';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';

const useGetReactorsData = (reactions: IReactionReference[]) => {
  const [usersReactions, setUsersReactions] = useState<IUserReaction[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>(undefined);

  useEffect(() => {
    const loadReactions = async () => {
      try {
        const usersDataRef = collection(db, 'usersPublicData');
        const usersResponse = await getDocs(usersDataRef);
        const usersData = usersResponse.docs.map((doc) => doc.data())[0];

        const reactionsData: IUserReaction[] = reactions.map((reaction) => {
          const user = usersData[reaction.userId];
          return { userInfo: { ...user, profileId: reaction.userId }, ...reaction };
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
