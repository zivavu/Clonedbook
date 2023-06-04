import { db } from '@/config/firebase.config';
import { IPost } from '@/types/post';
import {
  DocumentData,
  Query,
  QueryDocumentSnapshot,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from 'firebase/firestore';
import { useCallback, useEffect, useRef, useState } from 'react';

interface IUsePostFeedInfiniteScrolling {
  type: 'homeWall' | 'profileFeed';
  id?: string;
}

export default function usePostsInfiniteScrolling({ type, id }: IUsePostFeedInfiniteScrolling) {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot<DocumentData>>();
  const scrollElementRef = useRef<HTMLHtmlElement | null>(null);
  const canLoadMore = useRef(true);
  const collectionRef = collection(db, 'posts');
  const initialQuery = query(collectionRef, orderBy('createdAt', 'desc'), limit(5));

  async function fetchPosts(querySnapshot: Query<DocumentData>) {
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
  }

  async function refetchPost(id: string) {
    const postRef = doc(db, 'posts', id);
    const postSnap = await getDoc(postRef);
    if (postSnap.exists()) {
      const refetchedPost = postSnap.data() as IPost;
      const newPosts = posts.map((post) => {
        if (post.id === id) {
          return refetchedPost;
        }
        return post;
      });
      setPosts(newPosts);
    }
  }

  const handleScroll = useCallback(() => {
    const target = scrollElementRef.current;
    if (!target) return;
    const { scrollTop, scrollHeight, clientHeight } = target;
    const scrollMax = scrollHeight - clientHeight;
    if (scrollTop > scrollMax - 1200) {
      if (!isLoading && !isError && canLoadMore.current && lastDoc) {
        canLoadMore.current = false;
        const nextQuery = query(
          collectionRef,
          orderBy('createdAt', 'desc'),
          limit(10),
          startAfter(lastDoc),
        );
        fetchPosts(nextQuery);
      }
    }
  }, [posts.length, scrollElementRef]);

  useEffect(() => {
    scrollElementRef.current = document.getElementsByTagName('html')[0];
  }, []);

  useEffect(() => {
    if (posts[0] || isLoading || isError) return;
    fetchPosts(initialQuery);
  }, []);

  useEffect(() => {
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => {
      window?.removeEventListener('scroll', handleScroll);
    };
  }, [lastDoc, isLoading, isError]);

  useEffect(() => {
    canLoadMore.current = true;
  }, [posts.length]);

  return { posts, isLoading, isError, refetchPost };
}
