import { db } from '@/config/firebase.config';
import { IPost } from '@/types/post';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';

export default function useFetchUsersPosts(id: string) {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const q = query(collection(db, 'posts'), where('owner.profileId', '==', id));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as IPost[];
        setPosts(data);
      } catch (err) {
        setError('Something went wrong');
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, [id]);
  return { posts, isLoading, error };
}
