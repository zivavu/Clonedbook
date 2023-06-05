import { db } from '@/config/firebase.config';
import { IPicturesMap } from '@/types/picture';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';

export default function useFetchUsersPictures(id: string) {
  const [picturesMap, setPicturesMap] = useState<IPicturesMap>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  function refetchPictures() {
    fetchPictures();
  }

  async function fetchPictures() {
    const picturesRef = doc(db, `users/${id}/pictures/pictures`);
    const picturesSnapshot = await getDoc(picturesRef);
    const picturesData = picturesSnapshot.data() as IPicturesMap;
    if (!picturesSnapshot.exists || !picturesData) {
      setIsError(true);
      return;
    }
    setPicturesMap(picturesData);
  }

  useEffect(() => {
    try {
      fetchPictures();
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  return { picturesMap, isLoading, isError, refetchPictures };
}
