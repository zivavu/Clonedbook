import { db } from '@/config/firebase.config';
import { IPost } from '@/types/post';
import {
  DocumentData,
  Query,
  QueryDocumentSnapshot,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';

interface IUsePostFeedInfiniteScrolling {
  type: 'homeWall' | 'profileFeed';
  id?: string;
}

export default function usePostsInfiniteScrolling({ type, id }: IUsePostFeedInfiniteScrolling) {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot<DocumentData>>();
  const canLoadMore = useRef(true);
  const ref = collection(db, 'posts');
  const initialQuery = query(ref, orderBy('createdAt', 'desc'), limit(5));

  const fetchPosts = async (querySnapshot: Query<DocumentData>) => {
    try {
      setIsLoading(true);
      const res = await getDocs(querySnapshot);
      if (res.empty) {
        setIsError(true);
        return;
      }
      setLastDoc(res.docs[res.docs.length - 1]);
      const postsData = res.docs.map((doc) => doc.data()) as IPost[];
      setPosts((currentPosts) => currentPosts.concat(postsData));
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (posts[0] || isLoading || isError) return;
    fetchPosts(initialQuery);
  }, []);

  useEffect(() => {
    const scrollElement = document.getElementsByTagName('html')[0];
    const handleScroll = () => {
      const target = scrollElement;
      const { scrollTop, scrollHeight, clientHeight } = target;
      const scrollMax = scrollHeight - clientHeight;
      if (scrollTop > scrollMax - 1200) {
        if (!isLoading && !isError && canLoadMore.current && lastDoc) {
          canLoadMore.current = false;
          const nextQuery = query(
            ref,
            orderBy('createdAt', 'desc'),
            limit(10),
            startAfter(lastDoc),
          );
          fetchPosts(nextQuery);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window?.removeEventListener('scroll', handleScroll);
    };
  }, [lastDoc, isLoading, isError, fetchPosts]);

  useEffect(() => {
    canLoadMore.current = true;
  }, [posts.length]);

  return { posts, isLoading, isError };
}
