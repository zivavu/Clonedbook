import { configureStore, createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import { loggedUser } from './services/loggedUserAPI';

import openedChatsSlice, { closeAllChats, closeChat, openChat } from './features/openedChatsSlice';
import themeModeSlice from './features/themeSlice';
import { allUsersPublicDataAPI } from './services/allUsersPublicDataAPI';
import { userDataAPI } from './services/userDataAPI';

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  matcher: isAnyOf(openChat, closeChat, closeAllChats),

  effect: (payload, action) => {
    const state = action.getState() as RootState;
    localStorage.setItem('openedChats', JSON.stringify(state.openedChats));
  },
});

export const store = configureStore({
  reducer: {
    [loggedUser.reducerPath]: loggedUser.reducer,
    [allUsersPublicDataAPI.reducerPath]: allUsersPublicDataAPI.reducer,
    [userDataAPI.reducerPath]: userDataAPI.reducer,
    theme: themeModeSlice,
    openedChats: openedChatsSlice,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
      .concat(loggedUser.middleware, allUsersPublicDataAPI.middleware, userDataAPI.middleware)
      .prepend(listenerMiddleware.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
