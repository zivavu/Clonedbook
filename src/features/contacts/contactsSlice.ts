import { db } from '@/config/firebase.config';
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { collection, getDocs } from 'firebase/firestore';

export const contactsApi = createApi({
  reducerPath: 'contactsApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['contacts'],
  endpoints: (builder) => ({
    fetchContacts: builder.query({
      async queryFn() {
        try {
          const ref = collection(db, 'users');
          const querySnapshot = await getDocs(ref);
          const contacts = querySnapshot.docs.map((doc) => doc.data());
          return { data: contacts };
        } catch (error: any) {
          return { error: error.message };
        }
      },
      providesTags: ['contacts'],
    }),
  }),
});

export const { useFetchContactsQuery } = contactsApi;
