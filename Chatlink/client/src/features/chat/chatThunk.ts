import { createAsyncThunk } from "@reduxjs/toolkit";
import { getChatsFailure, getChatsStart, getChatsSuccess } from "./chatSlice";
import { axiosInstance } from "@/utils/axios";

interface GetChatArgs {
  userId1: string;
  userId2: string;
}

export const getChats = createAsyncThunk<
  void,
  GetChatArgs,
  { rejectValue: string }
>(
  "chat/getChats",
  async ({ userId1, userId2 }, { dispatch, rejectWithValue }) => {
    try {
      dispatch(getChatsStart());
      const response = await axiosInstance.get(
        `/chat/get-chats?userId1=${userId1}&userId2=${userId2}`,
      );
      const { chats } = response.data.data;
      dispatch(getChatsSuccess(chats));
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Get chats failed";
      dispatch(getChatsFailure(errorMessage));
      return rejectWithValue(errorMessage);
    }
  },
);
