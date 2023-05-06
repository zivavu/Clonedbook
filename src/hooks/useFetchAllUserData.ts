import { db } from '@/config/firebase.config';
import { IUser } from '@/types/user';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';

export function useFetchAllUserData(userId: string) {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [userData, setUserData] = useState<IUser>();
  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const allUserData = await getDoc(doc(db, 'users', userId));
        const data = allUserData.data() as IUser;
        if (data) {
          setUserData(data);
        } else {
          setIsError(true);
        }
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [userId]);
  return { isLoading, isError, userData };
}
