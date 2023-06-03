import { db } from '@/config/firebase.config';
import { IPost } from '@/types/post';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';

export default function useFetchPostData(postId: string) {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [postData, setPostData] = useState<IPost>();
  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const postData = await getDoc(doc(db, 'posts', postId));
        setPostData(postData.data() as IPost);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [postId]);

  return { isLoading, isError, postData };
}
