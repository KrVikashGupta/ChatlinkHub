import { SelectedUser } from "@/types/user";
import { Message } from "@/types/chat";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ChatSliceProps {
  selectedUser: null | SelectedUser;
  chats: Message[];
  loading: boolean;
  error: null | string;
}

const initialState: ChatSliceProps = {
  selectedUser: null,
  chats: [],
  loading: false,
  error: null,
};

const chatSlice = createSlice({
  name: "chatSelected",
  initialState,
  reducers: {
    setSelectedUser(state, action: PayloadAction<SelectedUser>) {
      state.selectedUser = {
        ...action.payload,
        isTyping: false,
        isOnline: false,
      };
    },
    getChatsStart(state) {
      state.loading = true;
      state.error = null;
    },
    getChatsSuccess(state, action: PayloadAction<Message[]>) {
      state.loading = false;
      state.chats = action.payload;
    },
    getChatsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    addMessage(state, action: PayloadAction<Message>) {
      state.chats.push(action.payload);
    },
    toggleTypingStatus(state, action: PayloadAction<boolean>) {
      if (state.selectedUser) {
        state.selectedUser.isTyping = action.payload;
      }
    },
    toggleOnlineStatus(state, action: PayloadAction<boolean>) {
      console.log(action.payload);
      if (state.selectedUser) {
        state.selectedUser.isOnline = action.payload;
      }
    },
  },
});

export const selectedUserInfo = (state: { chat: ChatSliceProps }) =>
  state.chat.selectedUser;

export const {
  setSelectedUser,
  getChatsStart,
  getChatsSuccess,
  getChatsFailure,
  addMessage,
  toggleTypingStatus,
  toggleOnlineStatus,
} = chatSlice.actions;

export default chatSlice.reducer;
