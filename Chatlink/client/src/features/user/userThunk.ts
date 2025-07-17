import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getUserChatHistoryFailure,
  getUserChatHistoryStart,
  getUserChatHistorySuccess,
} from "./userSlice";
import { axiosInstance } from "@/utils/axios";

export const getUserChatHistory = createAsyncThunk(
  "/user/getUserChatHistory",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(getUserChatHistoryStart());

      const response = await axiosInstance.get("/chat/chat-history");
      const { chatHistory } = response.data.data;

      dispatch(getUserChatHistorySuccess(chatHistory));
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Get user chat history failed";
      dispatch(getUserChatHistoryFailure(errorMessage));
      return rejectWithValue(errorMessage);
    }
  },
);
