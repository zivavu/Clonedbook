import { db } from '@/config/firebase.config';
import { IServerUserBasicInfo } from '@/types/user';
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { doc, getDoc } from 'firebase/firestore';

export const usersPublicData = createApi({
  reducerPath: 'usersPublicDataAPI',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['usersBasicInfo'],
  endpoints: (builder) => ({
    fetchUsersBasicInfo: builder.query({
      async queryFn() {
        try {
          const usersDataRef = doc(db, 'usersPublicData', 'usersBasicInfo');
          const usersResponse = await getDoc(usersDataRef);
          const usersData = usersResponse.data();
          if (!usersData) throw new Error();
          return { data: usersData as IServerUserBasicInfo };
        } catch {
          return { error: 'Couldnt fetch users' };
        }
      },
      providesTags: ['usersBasicInfo'],
    }),
  }),
});

export const { useFetchUsersBasicInfoQuery } = usersPublicData;
