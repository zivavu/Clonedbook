import { configureStore } from '@reduxjs/toolkit';
import { user } from './features/userAPI';

export const store = configureStore({
  reducer: { [user.reducerPath]: user.reducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(user.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
