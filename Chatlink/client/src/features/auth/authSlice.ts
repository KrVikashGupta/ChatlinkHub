import { User } from "@/types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  user: null | User;
  loading: boolean;
  error: null | string;
  isUsernameAvailable: boolean;
  usernameError: null | string;
  loadingUsername: boolean;
  passwordUpdateLoading: boolean;
  passwordUpdateError: null | string;
  userDetailsUpdateLoading: boolean;
  userDetailsUpdateError: null | string;
  profilePictureUpdateLoading: boolean;
  profilePictureUpdateError: null | string;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
  isUsernameAvailable: false,
  usernameError: null,
  loadingUsername: false,
  passwordUpdateLoading: false,
  passwordUpdateError: null,
  userDetailsUpdateLoading: false,
  userDetailsUpdateError: null,
  profilePictureUpdateLoading: false,
  profilePictureUpdateError: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signupStart(state) {
      state.loading = true;
      state.error = null;
    },
    signupSuccess(state) {
      state.loading = false;
      state.isUsernameAvailable = false;
    },
    signupFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action: PayloadAction<User>) {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload;
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    setUser(state, action: PayloadAction<User>) {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logoutStart(state) {
      state.loading = true;
      state.error = null;
    },
    logoutSuccess(state) {
      state.loading = false;
      state.user = null;
      state.isAuthenticated = false;
    },
    logoutFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    usernameCheckStart(state) {
      state.loadingUsername = true;
      state.usernameError = null;
    },
    usernameCheckSuccess(state) {
      state.loadingUsername = false;
      state.isUsernameAvailable = true;
    },
    usernameCheckFailure(state, action: PayloadAction<string>) {
      state.loadingUsername = false;
      state.usernameError = action.payload;
      state.isUsernameAvailable = false;
    },
    updatePasswordStart(state) {
      state.passwordUpdateLoading = true;
      state.passwordUpdateError = null;
    },
    updatePasswordSuccess(state) {
      state.passwordUpdateLoading = false;
    },
    updatePasswordFailure(state, action: PayloadAction<string>) {
      state.passwordUpdateLoading = false;
      state.passwordUpdateError = action.payload;
    },
    updateUserDetailsStart(state) {
      state.userDetailsUpdateLoading = true;
      state.userDetailsUpdateError = null;
    },
    updateUserDetailsSuccess(state) {
      state.userDetailsUpdateLoading = false;
    },
    updateUserDetailsFailure(state, action: PayloadAction<string>) {
      state.userDetailsUpdateLoading = false;
      state.userDetailsUpdateError = action.payload;
    },
    profilePictureStart(state) {
      state.profilePictureUpdateLoading = true;
      state.profilePictureUpdateError = null;
    },
    profilePictureSuccess(state, action: PayloadAction<string>) {
      state.profilePictureUpdateLoading = false;
      state.user!.profile_picture = action.payload;
    },
    profilePictureFailure(state, action: PayloadAction<string>) {
      state.profilePictureUpdateLoading = false;
      state.profilePictureUpdateError = action.payload;
    },
  },
});

export const {
  signupStart,
  signupSuccess,
  signupFailure,
  loginStart,
  loginSuccess,
  loginFailure,
  setUser,
  logoutStart,
  logoutSuccess,
  logoutFailure,
  usernameCheckStart,
  usernameCheckSuccess,
  usernameCheckFailure,
  updatePasswordStart,
  updatePasswordSuccess,
  updatePasswordFailure,
  updateUserDetailsStart,
  updateUserDetailsSuccess,
  updateUserDetailsFailure,
  profilePictureStart,
  profilePictureSuccess,
  profilePictureFailure,
} = authSlice.actions;

export default authSlice.reducer;
