import { db } from '@/config/firebase.config';
import { IUser } from '@/types/user';
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { collection, getDocs, limit, query } from 'firebase/firestore';

//!Placeholder for the user API, just to get the data from the server for now
export const user = createApi({
  reducerPath: 'userApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['user'],
  endpoints: (builder) => ({
    fetchLoggedUser: builder.query({
      async queryFn() {
        try {
          const usersRef = collection(db, 'users');
          const usersSnapshot = query(usersRef, limit(10));
          const data = await getDocs(usersSnapshot);
          const users = data.docs.map((doc) => doc.data()) as IUser[];
          const selectedUser = users[1];
          return { data: selectedUser };
        } catch {
          return { error: 'Couldnt fetch the user' };
        }
      },
      providesTags: ['user'],
    }),
  }),
});

export const { useFetchLoggedUserQuery } = user;
