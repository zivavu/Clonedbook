import { db } from '@/config/firebase.config';
import { IPicturesMap } from '@/types/picture';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';

export default function useFetchUsersPictures(id: string) {
  const [picturesMap, setPicturesMap] = useState<IPicturesMap>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  useEffect(() => {
    try {
      const getPictures = async () => {
        const picturesRef = collection(db, `users/${id}/pictures`);
        const picturesSnapshot = await getDocs(picturesRef);
        const picturesData = picturesSnapshot.docs[0].data() as IPicturesMap;
        if (picturesSnapshot.empty || !picturesData) {
          setIsError(true);
          return;
        }
        setPicturesMap(picturesData);
      };
      getPictures();
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  return { picturesMap, isLoading, isError };
}
