import { db } from '@/config/firebase.config';
import { IUserServerData } from '@/types/userServerData';
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { collection, getDocs, limit, query } from 'firebase/firestore';

export const user = createApi({
  reducerPath: 'userApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['user'],
  endpoints: (builder) => ({
    fetchUser: builder.query({
      async queryFn() {
        try {
          const ref = collection(db, 'users');
          const querySnapshot = query(ref, limit(10));
          const data = await getDocs(querySnapshot);
          const users = data.docs.map((doc) => doc.data()) as IUserServerData[];
          return { data: users[1] };
        } catch (error: any) {
          return { error: error.message };
        }
      },
      providesTags: ['user'],
    }),
  }),
});

export const { useFetchUserQuery } = user;
