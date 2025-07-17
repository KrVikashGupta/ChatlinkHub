import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice.ts";
import dialogReducer from "../features/dialog/dialogSlice.ts";
import usersReducer from "../features/users/usersSlice.ts";
import userReducer from "../features/user/userSlice.ts";
import chatReducer from "../features/chat/chatSlice.ts";
import socketReducer from "../features/socket/socketSlice.ts";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dialog: dialogReducer,
    users: usersReducer,
    user: userReducer,
    chat: chatReducer,
    socket: socketReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
