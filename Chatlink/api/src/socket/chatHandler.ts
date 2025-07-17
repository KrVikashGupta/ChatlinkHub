import { Server } from "socket.io";
import { insertMessage } from "../models/messageModel";
import { onlineUsers } from ".";

interface MessagePayload {
  senderId: string;
  receiverId: string;
  messageText: string;
}

interface typingIndicatorPayload {
  senderId: string;
  receiverId: string;
  isTyping: boolean;
}

interface userOnlinePayload {
  senderId: string;
  receiverId: string;
}

export const chatHandler = (io: Server) => {
  const sendMessage = async (payload: MessagePayload) => {
    const { senderId, receiverId, messageText } = payload;

    // db message insertion
    const newMessage = await insertMessage(senderId, receiverId, messageText);

    // check if the receiver is online or not
    if (onlineUsers?.[receiverId]) {
      onlineUsers[receiverId].forEach((socketId) => {
        io.to(socketId).emit("chat:receiveMessage", newMessage);
      });
    }

    // emit the new message to the intended user's active socket connections

    // io.to(receiverId).emit("chat:receiveMessage", newMessage);

    console.log("Message sent: ", newMessage);
  };

  // in memory store to keep the track of user's typping timeout
  const typingTimeouts: { [key: string]: NodeJS.Timeout } = {};

  const typingIndicator = (payload: typingIndicatorPayload) => {
    const { senderId, receiverId, isTyping } = payload;

    // if the receiver is online the sending all the active connections the typing status
    if (onlineUsers?.[receiverId]) {
      onlineUsers[receiverId].forEach((socketId) => {
        io.to(socketId).emit("chat:typing", { senderId, isTyping });
      });
    }

    // clear timeouts for the sender if any in the typingTimeouts
    if (typingTimeouts[senderId]) {
      clearTimeout(typingTimeouts[senderId]);
    }

    // if the typing has stoped send the update after a delay
    if (!isTyping) {
      typingTimeouts[senderId] = setTimeout(() => {
        if (onlineUsers?.[receiverId]) {
          onlineUsers[receiverId].forEach((socketId) => {
            io.to(socketId).emit("chat:typing", { senderId, isTyping });
          });
        }
      });
    }
  };

  const userOnline = (payload: userOnlinePayload) => {
    const { senderId, receiverId } = payload;

    // check if the other user is online
    if (onlineUsers[receiverId]) {
      onlineUsers[senderId].forEach((socketId) => {
        io.to(socketId).emit("chat:online", { receiverId, online: true });
      });
    } else {
      onlineUsers[senderId].forEach((socketId) => {
        io.to(socketId).emit("chat:online", { receiverId, online: false });
      });
    }
  };

  return {
    sendMessage,
    typingIndicator,
    userOnline,
  };
};
