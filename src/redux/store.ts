import { configureStore } from '@reduxjs/toolkit';
import themeModeSlice from './features/themeSlice';
import { posts } from './services/postsAPI';
import { user } from './services/userAPI';
import { usersPublicData } from './services/usersBasicInfoAPI';
import { userPublicFriends } from './services/usersPublicFriendsAPI';

export const store = configureStore({
  reducer: {
    [user.reducerPath]: user.reducer,
    [posts.reducerPath]: posts.reducer,
    [usersPublicData.reducerPath]: usersPublicData.reducer,
    [userPublicFriends.reducerPath]: userPublicFriends.reducer,
    theme: themeModeSlice,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      user.middleware,
      posts.middleware,
      usersPublicData.middleware,
      userPublicFriends.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
