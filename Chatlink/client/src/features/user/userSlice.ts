import { LatestChat } from "@/types/chat";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  chats: Array<LatestChat>;
  chatSelected: boolean;
  loading: boolean;
  error: null | string;
}

const initialState: UserState = {
  chats: [],
  chatSelected: false,
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUserChatHistoryStart(state) {
      state.loading = true;
      state.error = null;
    },
    getUserChatHistorySuccess(state, action: PayloadAction<Array<LatestChat>>) {
      state.loading = false;
      state.chats = action.payload;
    },
    getUserChatHistoryFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    toggleChatSelection(state, action: PayloadAction<boolean>) {
      state.chatSelected = action.payload;
    },
  },
});

export const {
  getUserChatHistoryStart,
  getUserChatHistorySuccess,
  getUserChatHistoryFailure,
  toggleChatSelection,
} = userSlice.actions;

export default userSlice.reducer;
