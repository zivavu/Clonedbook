import { db } from '@/config/firebase.config';
import { IUser } from '@/types/user';
import { uuidv4 } from '@firebase/util';
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { collection, doc, getDoc, getDocs, limit, query, where } from 'firebase/firestore';

export const loggedUser = createApi({
  reducerPath: 'userApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['user'],
  endpoints: (builder) => ({
    fetchLoggedUser: builder.query({
      async queryFn() {
        try {
          const userIdStorageItem = localStorage.getItem('loggedUser');
          const loggedUserId = userIdStorageItem ? JSON.parse(userIdStorageItem) : undefined;
          let loggedUser: IUser | undefined = undefined;

          if (loggedUserId) {
            const userDocRef = doc(db, 'users', loggedUserId);
            const userDoc = await getDoc(userDocRef);
            loggedUser = userDoc.data() as IUser;
          }
          if (!loggedUser) {
            //Always fetches random user
            const randomId = uuidv4();
            const usersRef = collection(db, 'users');
            const greaterQuery = query(usersRef, where('__name__', '>=', randomId), limit(1));
            const lesserQuery = query(usersRef, where('__name__', '<=', randomId), limit(1));
            let data = await getDocs(greaterQuery);
            if (data.empty) {
              data = await getDocs(lesserQuery);
            }
            const user = data.docs.map((doc) => doc.data())[0] as IUser;

            loggedUser = user;
            localStorage.setItem('loggedUser', JSON.stringify(user.id));
          }

          return { data: loggedUser };
        } catch (err) {
          console.log(err);
          localStorage.removeItem('loggedUser');
          return { error: 'Couldnt fetch the user' };
        }
      },
      providesTags: ['user'],
    }),
  }),
});

export const { useFetchLoggedUserQuery } = loggedUser;