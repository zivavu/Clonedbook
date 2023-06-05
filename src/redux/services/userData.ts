import { db } from '@/config/firebase.config';
import { IPicturesMap } from '@/types/picture';
import { IUser } from '@/types/user';
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { doc, getDoc } from 'firebase/firestore';

export const userData = createApi({
  reducerPath: 'userDataAPI',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['userData', 'userPictures'],
  endpoints: (builder) => ({
    userDataById: builder.query<IUser, string>({
      async queryFn(userId) {
        try {
          const allUserData = await getDoc(doc(db, 'users', userId));
          const userData = allUserData.data() as IUser;
          return { data: userData };
        } catch {
          return { error: 'Couldnt fetch users data' };
        }
      },
      providesTags: ['userData'],
    }),
    userPicturesById: builder.query<IPicturesMap, string>({
      async queryFn(userId) {
        try {
          const picturesRef = doc(db, `users/${userId}/pictures/pictures`);
          const picturesSnapshot = await getDoc(picturesRef);
          const picturesData = picturesSnapshot.data() as IPicturesMap;
          return { data: picturesData };
        } catch {
          return { error: 'Couldnt fetch users data' };
        }
      },
      providesTags: ['userPictures'],
    }),
  }),
});

export const { useUserDataByIdQuery, useUserPicturesByIdQuery } = userData;
