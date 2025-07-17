import { axiosInstance } from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  loginFailure,
  loginStart,
  loginSuccess,
  logoutFailure,
  logoutStart,
  logoutSuccess,
  signupFailure,
  signupStart,
  signupSuccess,
  usernameCheckFailure,
  usernameCheckStart,
  usernameCheckSuccess,
  profilePictureFailure,
  profilePictureStart,
  profilePictureSuccess,
  updatePasswordFailure,
  updatePasswordStart,
  updatePasswordSuccess,
  updateUserDetailsFailure,
  updateUserDetailsStart,
  updateUserDetailsSuccess,
} from "./authSlice";

interface SignupArgs {
  username: string;
  email: string;
  password: string;
}

interface LoginArgs {
  email: string;
  password: string;
}

export const checkUsernameAvailability = createAsyncThunk<
  void,
  string,
  { rejectValue: string }
>(
  "auth/checkUsernameAvailability",
  async (username: string, { dispatch, rejectWithValue }) => {
    dispatch(usernameCheckStart());
    try {
      await axiosInstance.get(`/auth/unique-username?username=${username}`);
      dispatch(usernameCheckSuccess());
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Server error";
      dispatch(usernameCheckFailure(errorMessage));
      return rejectWithValue(errorMessage);
    }
  },
);

export const signupUser = createAsyncThunk<
  void,
  SignupArgs,
  { rejectValue: string }
>(
  "auth/signup",
  async (
    { username, email, password }: SignupArgs,
    { dispatch, rejectWithValue },
  ) => {
    dispatch(signupStart());
    try {
      await axiosInstance.post("/auth/register", {
        username,
        email,
        password,
      });
      dispatch(signupSuccess());
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Signup failed";
      dispatch(signupFailure(errorMessage));
      return rejectWithValue(errorMessage);
    }
  },
);

export const loginUser = createAsyncThunk<void, LoginArgs>(
  "auth/login",
  async ({ email, password }: LoginArgs, { dispatch, rejectWithValue }) => {
    dispatch(loginStart());
    try {
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });
      const { user } = response.data.data;
      localStorage.setItem("user", JSON.stringify(user));
      dispatch(loginSuccess(user));
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Signup failed";
      dispatch(loginFailure(error.response?.data?.message || "Login failed"));
      return rejectWithValue(errorMessage);
    }
  },
);

export const logoutUser = createAsyncThunk<void>(
  "auth/logout",
  async (_, { dispatch }) => {
    dispatch(logoutStart());
    try {
      await axiosInstance.post("/auth/logout");
      localStorage.removeItem("user");
      dispatch(logoutSuccess());
    } catch (error: any) {
      dispatch(logoutFailure(error.response?.data?.message || "Logout failed"));
    }
  },
);

interface UpdatePasswordArgs {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export const updatePassword = createAsyncThunk(
  "/user/password",
  async (
    { currentPassword, newPassword, confirmNewPassword }: UpdatePasswordArgs,
    { dispatch, rejectWithValue },
  ) => {
    try {
      dispatch(updatePasswordStart());

      await axiosInstance.patch("/user/password", {
        currentPassword,
        newPassword,
        confirmNewPassword,
      });

      dispatch(updatePasswordSuccess());
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Password update failed";
      dispatch(updatePasswordFailure(errorMessage));
      return rejectWithValue(errorMessage);
    }
  },
);

interface updateUserDetails {
  statusMessage: string;
  username: string;
}

export const updateUserDetails = createAsyncThunk(
  "/user/details",
  async (
    { username, statusMessage }: updateUserDetails,
    { dispatch, rejectWithValue },
  ) => {
    try {
      dispatch(updateUserDetailsStart());

      await axiosInstance.patch("/user/details", {
        username,
        statusMessage,
      });

      dispatch(updateUserDetailsSuccess());
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Password update failed";
      dispatch(updateUserDetailsFailure(errorMessage));
      return rejectWithValue(errorMessage);
    }
  },
);

export const profilePictureUpdate = createAsyncThunk(
  "/user/profile-picture",
  async (image: File, { dispatch, rejectWithValue }) => {
    try {
      dispatch(profilePictureStart());

      const formData = new FormData();
      formData.append("profile_picture", image);

      console.log("Formdata: ", formData);

      const response = await axiosInstance.post(
        "/user/profile-picture",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      const pictureUrl = response.data.data.fileURL;

      dispatch(profilePictureSuccess(pictureUrl));
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Picture upload failed";
      dispatch(profilePictureFailure(errorMessage));
      return rejectWithValue(errorMessage);
    }
  },
);
