import { axiosInstance } from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUsersFailure, getUsersStart, getUsersSuccess } from "./usersSlice";

export const getAllUsers = createAsyncThunk<
  void,
  void,
  { rejectValue: string }
>("users/getAllUsers", async (_, { dispatch, rejectWithValue }) => {
  try {
    dispatch(getUsersStart());
    const response = await axiosInstance.get("/user/users");
    const { users } = response.data.data;
    dispatch(getUsersSuccess(users));
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || "Get users failed";
    dispatch(getUsersFailure(errorMessage));
    return rejectWithValue(errorMessage);
  }
});
