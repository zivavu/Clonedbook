import { db } from '@/config/firebase.config';
import { IServerUserBasicInfo } from '@/types/user';
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { collection, getDocs } from 'firebase/firestore';

export const usersPublicData = createApi({
  reducerPath: 'usersPublicDataAPI',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['usersPublicData'],
  endpoints: (builder) => ({
    fetchUsersPublicData: builder.query({
      async queryFn() {
        try {
          const usersDataRef = collection(db, 'usersPublicData');
          const usersResponse = await getDocs(usersDataRef);
          const usersData = usersResponse.docs.map((doc) => doc.data())[0];

          return { data: usersData as IServerUserBasicInfo };
        } catch (error: any) {
          return { error: error.message };
        }
      },
      providesTags: ['usersPublicData'],
    }),
  }),
});

export const { useFetchUsersPublicDataQuery } = usersPublicData;
