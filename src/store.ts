import { configureStore } from '@reduxjs/toolkit';
import { posts } from './features/postsAPI';
import { user } from './features/userAPI';

export const store = configureStore({
  reducer: { [user.reducerPath]: user.reducer, [posts.reducerPath]: posts.reducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(user.middleware, posts.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
