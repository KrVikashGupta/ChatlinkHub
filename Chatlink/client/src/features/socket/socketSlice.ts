import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Socket } from "socket.io-client";
import { AppDispatch } from "@/app/store";
import { createSocketConnection } from "@/socketService";

interface SocketState {
  isConnected: boolean;
  socket: null;
}

let socketInstance: Socket | null = null;

const initialState: SocketState = {
  isConnected: false,
  socket: null,
};

const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    setSocket(state, action: PayloadAction<Socket | null>) {
      if (action.payload) {
        socketInstance = action.payload;
        state.isConnected = true;
      } else {
        socketInstance = null;
        state.isConnected = false;
      }
    },
    disconnectSocket(state) {
      if (socketInstance) {
        socketInstance.disconnect();
        socketInstance = null;
        state.isConnected = false;
      }
    },
  },
});

export const initializeSocket =
  (url: string, userId: string) => (dispatch: AppDispatch) => {
    const socket = createSocketConnection(url, userId, dispatch);
    dispatch(setSocket(socket));
  };

export const { setSocket, disconnectSocket } = socketSlice.actions;
export default socketSlice.reducer;

export const getSocket = (): Socket | null => socketInstance;
