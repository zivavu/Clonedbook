import { db } from '@/config/firebase.config';
import { IPicturesMap } from '@/types/picture';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';

export default function useFetchUsersPictures(id: string) {
  const [picturesMap, setPicturesMap] = useState<IPicturesMap>({});
  const [isLoading, setisLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    try {
      const getPictures = async () => {
        const picturesRef = collection(db, `users/${id}/pictures`);
        const picturesSnapshot = await getDocs(picturesRef);
        if (picturesSnapshot.empty) throw 'There are no pictures in the database';
        const picturesData = picturesSnapshot.docs[0].data() as IPicturesMap;
        setPicturesMap(picturesData);
      };
      getPictures();
    } catch {
      setError(true);
    } finally {
      setisLoading(false);
    }
  }, [id]);

  return { picturesMap, isLoading, error };
}
