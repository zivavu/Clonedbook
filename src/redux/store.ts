import { configureStore } from '@reduxjs/toolkit';
import themeModeSlice from './features/themeSlice';
import { loggedUser } from './services/loggedUserAPI';

import { allUsersPublicData } from './services/allUsersPublicData';
import { userData } from './services/userData';

export const store = configureStore({
  reducer: {
    [loggedUser.reducerPath]: loggedUser.reducer,
    [allUsersPublicData.reducerPath]: allUsersPublicData.reducer,
    [userData.reducerPath]: userData.reducer,
    theme: themeModeSlice,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      loggedUser.middleware,
      allUsersPublicData.middleware,
      userData.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
