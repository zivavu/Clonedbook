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
  where,
} from 'firebase/firestore';
import { useCallback, useEffect, useRef, useState } from 'react';

interface IUsePostFeedInfiniteScrolling {
  type: 'homeWall' | 'profileFeed';
  wallOwnerId?: string;
}

export default function usePostsInfiniteScrolling({
  type,
  wallOwnerId,
}: IUsePostFeedInfiniteScrolling) {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot<DocumentData>>();
  const scrollElementRef = useRef<HTMLHtmlElement | null>(null);
  const canLoadMore = useRef(true);
  const collectionRef = collection(db, 'posts');

  function getInitialQuery() {
    switch (type) {
      case 'homeWall':
        return query(collectionRef, orderBy('createdAt', 'desc'), limit(5));
      case 'profileFeed':
        return query(
          collectionRef,
          where('ownerId', '==', wallOwnerId),
          orderBy('createdAt', 'desc'),
          limit(5),
        );
    }
  }
  function getNextQuery() {
    switch (type) {
      case 'homeWall':
        return query(collectionRef, orderBy('createdAt', 'desc'), limit(10), startAfter(lastDoc));
      case 'profileFeed':
        return query(
          collection(db, 'posts'),
          where('ownerId', '==', wallOwnerId),
          orderBy('createdAt', 'desc'),
          startAfter(lastDoc),
          limit(5),
        );
    }
  }

  async function fetchPosts(querySnapshot: Query<DocumentData>) {
    try {
      setIsLoading(true);
      const res = await getDocs(querySnapshot);
      setLastDoc(res.docs[res.docs.length - 1]);
      const newPosts = res.docs.map((doc) => doc.data()) as IPost[];
      setPosts((currentPosts) => currentPosts.concat(newPosts));
    } catch (err) {
      console.log(err);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }

  async function refetchPostById(id: string) {
    const postRef = doc(db, 'posts', id);
    const postSnap = await getDoc(postRef);
    if (postSnap.exists()) {
      const refetchedPost = postSnap.data() as IPost;
      if (posts.some((post) => post.id === id)) {
        const newPosts = posts.map((post) => {
          if (post.id === id) {
            return refetchedPost;
          }
          return post;
        });
        setPosts(newPosts);
      } else {
        setPosts((currentPosts) => [refetchedPost, ...currentPosts]);
      }
    } else {
      setPosts((currentPosts) => currentPosts.filter((post) => post.id !== id));
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
        fetchPosts(getNextQuery());
      }
    }
  }, [posts.length, scrollElementRef]);

  useEffect(() => {
    scrollElementRef.current = document.getElementsByTagName('html')[0];
  }, []);

  useEffect(() => {
    if (posts[0] || isError) return;
    fetchPosts(getInitialQuery());
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

  return { posts, isLoading, isError, refetchPostById };
}
