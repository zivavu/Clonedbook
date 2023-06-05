import { configureStore } from '@reduxjs/toolkit';
import themeModeSlice from './features/themeSlice';
import { loggedUser } from './services/loggedUserAPI';

import { allUsersBasicInfo } from './services/allUsersPublicData';

export const store = configureStore({
  reducer: {
    [loggedUser.reducerPath]: loggedUser.reducer,
    [allUsersBasicInfo.reducerPath]: allUsersBasicInfo.reducer,
    theme: themeModeSlice,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      loggedUser.middleware,
      allUsersBasicInfo.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
