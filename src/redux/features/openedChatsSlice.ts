import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export const openedChatsSlice = createSlice({
  name: 'openedChats',
  initialState: [] as string[],
  reducers: {
    openChat: (state, action: PayloadAction<string>) => {
      if (state.includes(action.payload)) return;
      if (state.length >= 3) state.shift();
      state.push(action.payload);
    },
    closeChat: (state, action: PayloadAction<string>) => {
      return state.filter((chatId) => chatId !== action.payload);
    },
    closeAllChats: () => {
      return [];
    },
  },
});

export const { openChat, closeChat, closeAllChats } = openedChatsSlice.actions;

export default openedChatsSlice.reducer;
