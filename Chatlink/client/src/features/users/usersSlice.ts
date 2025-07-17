import { User } from "@/types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  users: User[];
  error: null | string;
  loading: boolean;
}

const initialState: UserState = {
  users: [],
  error: null,
  loading: false,
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    getUsersStart(state) {
      state.loading = true;
      state.error = null;
    },
    getUsersSuccess(state, action: PayloadAction<User[]>) {
      state.loading = false;
      state.users = action.payload;
    },
    getUsersFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    searchUsers(state, action: PayloadAction<string>) {
      state.users = state.users.filter(
        (user) =>
          user.username.toLowerCase().includes(action.payload.toLowerCase()) ||
          user.email.toLowerCase().includes(action.payload.toLowerCase()),
      );
    },
  },
});

export const { getUsersStart, getUsersSuccess, getUsersFailure, searchUsers } =
  usersSlice.actions;

export default usersSlice.reducer;
