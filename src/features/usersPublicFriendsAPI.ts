import { db } from '@/config/firebase.config';
import { IServerUserPublicFriends } from '@/types/user';
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { doc, getDoc } from 'firebase/firestore';

export const userPublicFriends = createApi({
  reducerPath: 'userPublicFriendsAPI',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['userPublicFriends'],
  endpoints: (builder) => ({
    fetchUsersPublicFriends: builder.query({
      async queryFn() {
        try {
          const usersDataRef = doc(db, 'usersPublicData', 'usersPublicFriends');
          const usersResponse = await getDoc(usersDataRef);
          const usersData = usersResponse.data();
          if (!usersData) throw new Error();
          return { data: usersData as IServerUserPublicFriends };
        } catch {
          return { error: 'Couldnt fetch users public friends' };
        }
      },
      providesTags: ['userPublicFriends'],
    }),
  }),
});

export const { useFetchUsersPublicFriendsQuery } = userPublicFriends;
