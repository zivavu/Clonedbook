import { db } from '@/config/firebase.config';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';

export function useFetchAllUserData(userId: string) {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [allUserData, setAllUserData] = useState();
  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const allUserData = await getDoc(doc(db, 'users', userId));
        const data = allUserData.data();
        if (data) {
          console.log(data.pictures);
        }
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [userId]);
}
