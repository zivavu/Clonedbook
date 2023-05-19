import { db } from '@/config/firebase.config';
import { IPost } from '@/types/post';
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';

export const posts = createApi({
  reducerPath: 'postsApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['posts'],
  endpoints: (builder) => ({
    fetchPosts: builder.query({
      async queryFn() {
        try {
          const ref = collection(db, 'posts');
          const querySnapshot = query(ref, orderBy('createdAt', 'desc'), limit(10));
          const docs = await getDocs(querySnapshot);
          const posts = docs.docs.map((doc) => doc.data()) as IPost[];
          return {
            data: posts.sort((a, b) => {
              const commentsArr = Object.values(a.comments);
              const commentsArr2 = Object.values(b.comments);
              return commentsArr2.length - commentsArr.length;
            }),
          };
        } catch (error: any) {
          return { error: error.message };
        }
      },
      providesTags: ['posts'],
    }),
  }),
});

export const { useFetchPostsQuery } = posts;
