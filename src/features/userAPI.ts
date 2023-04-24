import { db } from '@/config/firebase.config';
import { IUser } from '@/types/user';
import { IUserServerData } from '@/types/userServerData';
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { collection, doc, getDoc, getDocs, limit, query } from 'firebase/firestore';

//!Placeholder for the user API, just to get the data from the server for now
export const user = createApi({
  reducerPath: 'userApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['user'],
  endpoints: (builder) => ({
    fetchUser: builder.query({
      async queryFn() {
        try {
          const usersRef = collection(db, 'users');
          const usersSnapshot = query(usersRef, limit(10));
          const data = await getDocs(usersSnapshot);
          const users = data.docs.map((doc) => doc.data()) as IUser[];
          const selectedUser = users[1];
          const friendsSnapshot = await getDocs(
            collection(db, 'users', selectedUser.profileId, 'friends'),
          );
          const friendsData = friendsSnapshot.docs[0].data();
          const frinedsArr = Object.values(friendsData).map((friend) => friend);
          return { data: { data: selectedUser, friends: frinedsArr } };
        } catch (error: any) {
          return { error: error.message };
        }
      },
      providesTags: ['user'],
    }),
  }),
});

export const { useFetchUserQuery } = user;
