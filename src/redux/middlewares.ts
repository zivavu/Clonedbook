import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import { closeAllChats, closeChat, openChat } from './features/openedChatsSlice';
import { RootState } from './store';

export const openedChatsListener = createListenerMiddleware();
openedChatsListener.startListening({
  matcher: isAnyOf(openChat, closeChat, closeAllChats),

  effect: (payload, action) => {
    const state = action.getState() as RootState;
    localStorage.setItem('openedChats', JSON.stringify(state.openedChats.chatIds));
  },
});
