import { db } from '@/config/firebase.config';
import { IChat } from '@/types/chat';
import { IUser } from '@/types/user';
import { uuidv4 } from '@firebase/util';
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { collection, doc, getDoc, getDocs, limit, query, where } from 'firebase/firestore';

export const loggedUser = createApi({
  reducerPath: 'loggedUserAPI',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['loggedUser', 'userChats'],
  endpoints: (builder) => ({
    getLoggedUser: builder.query({
      async queryFn() {
        try {
          const userIdStorageItem = localStorage.getItem('loggedUser');
          const loggedUserId = userIdStorageItem ? JSON.parse(userIdStorageItem) : undefined;
          let loggedUserData: IUser | undefined = undefined;

          //Get the user by ID saved in the local storage
          if (loggedUserId) {
            const userDocRef = doc(db, 'users', loggedUserId);
            const userDoc = await getDoc(userDocRef);
            loggedUserData = userDoc.data() as IUser;
          }

          //Or if it doesnt exist, get a random user
          if (!loggedUserData) {
            const randomId = uuidv4();
            const usersRef = collection(db, 'users');
            const greaterQuery = query(usersRef, where('__name__', '>=', randomId), limit(1));
            const lesserQuery = query(usersRef, where('__name__', '<=', randomId), limit(1));
            let data = await getDocs(greaterQuery);
            if (data.empty) {
              data = await getDocs(lesserQuery);
            }
            const user = data.docs.map((doc) => doc.data())[0] as IUser;
            loggedUserData = user;
            localStorage.setItem('loggedUser', JSON.stringify(user.id));
          }

          return { data: loggedUserData };
        } catch (err) {
          localStorage.removeItem('loggedUser');
          return { error: 'Couldnt fetch the user' };
        }
      },
      providesTags: ['loggedUser'],
    }),

    getUserChats: builder.query({
      async queryFn() {
        console.log('fetching chats');
        try {
          const userIdStorageItem = localStorage.getItem('loggedUser');
          const loggedUserId = userIdStorageItem ? JSON.parse(userIdStorageItem) : undefined;
          if (!loggedUserId) return { error: 'Couldnt fetch users chats' };
          const chatsRef = collection(db, 'chats');
          const chatsQuery = query(chatsRef, where('users', 'array-contains', loggedUserId));
          const chatsSnapshot = await getDocs(chatsQuery);
          const chats = chatsSnapshot.docs.map((doc) => doc.data()) as IChat[];
          const nonEmptyChats = chats.filter((chat) => chat.messages.length > 0);

          return { data: nonEmptyChats };
        } catch (err) {
          console.log(err);
          return { error: 'Couldnt fetch users chats' };
        }
      },
      providesTags: ['userChats'],
    }),
  }),
});

export const { useGetLoggedUserQuery, useGetUserChatsQuery } = loggedUser;
