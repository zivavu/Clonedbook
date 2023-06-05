import { configureStore } from '@reduxjs/toolkit';
import themeModeSlice from './features/themeSlice';
import { loggedUser } from './services/loggedUserAPI';

import { usersPublicData } from './services/usersBasicInfoAPI';
import { userPublicFriends } from './services/usersPublicFriendsAPI';

export const store = configureStore({
  reducer: {
    [loggedUser.reducerPath]: loggedUser.reducer,
    [usersPublicData.reducerPath]: usersPublicData.reducer,
    [userPublicFriends.reducerPath]: userPublicFriends.reducer,
    theme: themeModeSlice,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      loggedUser.middleware,
      usersPublicData.middleware,
      userPublicFriends.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
