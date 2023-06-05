import { db } from '@/config/firebase.config';
import { IServerUserBasicInfo, IServerUserPublicFriends } from '@/types/user';
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { doc, getDoc } from 'firebase/firestore';

export const allUsersPublicData = createApi({
  reducerPath: 'allUsersBasicInfoAPI',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['allUsersBasicInfo', 'allUserPublicFriends'],
  endpoints: (builder) => ({
    allUsersBasicInfo: builder.query({
      async queryFn() {
        try {
          const usersDataRef = doc(db, 'usersPublicData', 'usersBasicInfo');
          const usersResponse = await getDoc(usersDataRef);
          const usersData = usersResponse.data();
          if (!usersData) throw new Error();
          return { data: usersData as IServerUserBasicInfo };
        } catch {
          return { error: 'Couldnt fetch users basic info' };
        }
      },
      providesTags: ['allUsersBasicInfo'],
    }),

    allUsersPublicFriends: builder.query({
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
      providesTags: ['allUserPublicFriends'],
    }),
  }),
});

export const { useAllUsersBasicInfoQuery, useAllUsersPublicFriendsQuery } = allUsersPublicData;
