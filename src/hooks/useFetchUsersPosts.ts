import { db } from '@/config/firebase.config';
import { IPost } from '@/types/post';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';

export default function useFetchUsersPosts(id: string) {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const q = query(collection(db, 'posts'), where('ownerId', '==', id));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as IPost[];
        setPosts(data);
      } catch (err) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, [id]);
  return { posts, isLoading, isError };
}
