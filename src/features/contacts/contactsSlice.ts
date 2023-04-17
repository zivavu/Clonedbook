import { firestore } from '@/config/firebase.config';
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { collection, getDocs, limit, query } from 'firebase/firestore';

export const contactsApi = createApi({
  reducerPath: 'contactsApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['contacts'],
  endpoints: (builder) => ({
    fetchContacts: builder.query({
      async queryFn() {
        try {
          const ref = collection(firestore, 'users');
          const querySnapshot = query(ref, limit(30));
          const data = await getDocs(querySnapshot);
          const contacts = data.docs.map((doc) => doc.data());
          return { data: contacts.slice(0, 30) };
        } catch (error: any) {
          return { error: error.message };
        }
      },
      providesTags: ['contacts'],
    }),
  }),
});

export const { useFetchContactsQuery } = contactsApi;
