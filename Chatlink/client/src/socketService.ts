import { io, Socket } from "socket.io-client";
import {
  addMessage,
  selectedUserInfo,
  toggleOnlineStatus,
  toggleTypingStatus,
} from "./features/chat/chatSlice";
import { Message } from "./types/chat";
import { AppDispatch, store } from "./app/store";

let socket: Socket | null = null;

export const createSocketConnection = (
  url: string,
  userId: string,
  dispatch: AppDispatch,
) => {
  socket = io(url, {
    auth: {
      userId: userId,
    },
  }); // sending userId on connection to maintain online users on backend

  // listen for message
  socket.on("chat:receiveMessage", (message: Message) => {
    dispatch(addMessage(message));
  });

  // listen for typing indicator
  socket.on("chat:typing", (data) => {
    // update the typing status only when  the selected user's id and received senderId matches.

    const selectedUser = selectedUserInfo(store.getState());

    if (data.senderId === selectedUser?.id) {
      if (data.isTyping) {
        dispatch(toggleTypingStatus(true));
      } else {
        dispatch(toggleTypingStatus(false));
      }
    }
  });

  // listen for user's online status
  socket.on("chat:online", (data) => {
    const selectedUser = selectedUserInfo(store.getState());

    if (data.receiverId === selectedUser?.id) {
      if (data.online) {
        dispatch(toggleOnlineStatus(data.online));
      }
    }
  });

  socket.on("chat:offline", (data) => {
    const selectedUser = selectedUserInfo(store.getState());

    if (data.userId === selectedUser?.id) {
      dispatch(toggleOnlineStatus(false));
    }
  });

  socket.on("chat:onlineStatus", (data) => {
    const selectedUser = selectedUserInfo(store.getState());

    if (data.userId === selectedUser?.id) {
      dispatch(toggleOnlineStatus(false));
    }
  });

  return socket;
};

interface sendMessageArgs {
  senderId: string;
  receiverId: string;
  messageText: string;
}

export const sendMessage = (data: sendMessageArgs, dispatch: AppDispatch) => {
  const { senderId, receiverId, messageText } = data;
  if (socket) {
    socket.emit("chat:sendMessage", data);
  }

  const message = {
    id: 1, // TODO: fix this temprory solution
    sender_id: senderId,
    receiver_id: receiverId,
    message_text: messageText,
    sent_at: new Date().toISOString(),
    is_deleted: false,
  };

  dispatch(addMessage(message));
};

interface typingIndicatorArgs {
  senderId: string;
  receiverId: string;
  isTyping: boolean;
}

export const typingIndicator = (data: typingIndicatorArgs) => {
  if (socket) {
    socket.emit("chat:typingIndicator", data);
  }
};

interface userOnlineArgs {
  senderId: string;
  receiverId: string;
}

export const userOnline = (data: userOnlineArgs) => {
  if (socket) {
    socket.emit("chat:userOnline", data);
  }
};
