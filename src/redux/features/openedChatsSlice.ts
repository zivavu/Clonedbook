import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const getInitialState = () => {
  if (typeof window === 'undefined')
    return {
      chatIds: [],
      maxChats: 3,
    };
  const allChats: string[] = JSON.parse(localStorage.getItem('openedChats') || '[]');
  const initState = { chatIds: allChats.slice(0, 3), maxChats: 3 };
  return initState;
};

export const openedChatsSlice = createSlice({
  name: 'openedChats',
  initialState: getInitialState(),
  reducers: {
    openChat: (state, action: PayloadAction<string>) => {
      if (state.chatIds.includes(action.payload)) return;
      if (state.chatIds.length >= state.maxChats) state.chatIds.shift();
      state.chatIds.push(action.payload);
    },

    closeChat: (state, action: PayloadAction<string>) => {
      state.chatIds = state.chatIds.filter((chatId) => chatId !== action.payload);
    },

    closeAllChats: (state) => {
      state.chatIds = [];
    },

    setMaxChats: (state, action: PayloadAction<number>) => {
      state.maxChats = action.payload;
      if (state.chatIds.length > action.payload) {
        state.chatIds = state.chatIds.slice(0, action.payload);
      }
    },
  },
});

export const { openChat, closeChat, closeAllChats, setMaxChats } = openedChatsSlice.actions;

export default openedChatsSlice.reducer;
