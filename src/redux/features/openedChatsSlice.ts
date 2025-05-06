import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface OpenedChatsState {
  chatIds: string[];
  maxChats: number;
  activeLink: string | null;
}

const getInitialState = (): OpenedChatsState => {
  if (typeof window === 'undefined')
    return {
      chatIds: [],
      maxChats: 3,
      activeLink: null,
    };
  const allChats: string[] = JSON.parse(localStorage.getItem('openedChats') || '[]');
  const initState: OpenedChatsState = { chatIds: allChats.slice(0, 3), maxChats: 3, activeLink: null };
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

    //Used for limiting the number of maximum opened chats on mobile devices
    setMaxChats: (state, action: PayloadAction<number>) => {
      state.maxChats = action.payload;
      if (state.chatIds.length > action.payload) {
        state.chatIds = state.chatIds.slice(0, action.payload);
      }
    },

    setActiveLink: (state, action: PayloadAction<string | null>) => {
      state.activeLink = action.payload;
    },
  },
});

export const { openChat, closeChat, closeAllChats, setMaxChats, setActiveLink } = openedChatsSlice.actions;

export default openedChatsSlice.reducer;
