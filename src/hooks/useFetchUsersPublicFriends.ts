import { db } from '@/config/firebase.config';
import { IPublicFriendsMap } from '@/types/firend';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';

export default function useFetchUsersPublicFriends(userId: string) {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [publicFriends, setPublicFriends] = useState<IPublicFriendsMap>();
  useEffect(() => {
    try {
      const getData = async () => {
        const picturesRef = collection(db, `users/${userId}/publicFriends`);
        const picturesSnapshot = await getDocs(picturesRef);
        const friendsData = picturesSnapshot.docs[0].data();
        if (picturesSnapshot.empty || !friendsData) {
          setIsError(true);
          return;
        }
        console.log(friendsData);
        setPublicFriends(friendsData);
      };
      getData();
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  return { isLoading, isError, publicFriends };
}
