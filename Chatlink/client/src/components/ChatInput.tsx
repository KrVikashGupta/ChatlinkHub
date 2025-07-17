import React, { useRef, useState } from "react";
import { Textarea } from "./ui/textarea";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { sendMessage, typingIndicator } from "@/socketService";
import { Button } from "./ui/button";
import { SendIcon } from "lucide-react";

type ChatInputProps = {
  selectedUser: {
    id: string;
    username: string;
    profile_picture?: string;
  };
};

const ChatInput = ({ selectedUser }: ChatInputProps) => {
  const [typing, setTyping] = useState(false);
  const [message, setMessage] = useState("");
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { socket } = useAppSelector((state) => state.socket);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // making the sendMessage socket call
  const send = () => {
    if (message.trim()) {
      const data = {
        senderId: user?.id!,
        receiverId: selectedUser?.id!,
        messageText: message,
      };

      sendMessage(data, dispatch);
      setMessage("");
      if (socket) {
        setTyping(false);
        const data = {
          senderId: user?.id!,
          receiverId: selectedUser.id,
          isTyping: false,
        };
        typingIndicator(data);
      }
    }
  };

  // checks for the mouse click on send icon or ENTER press then calls the send funcion
  const handleSendMessage = (
    e:
      | React.KeyboardEvent<HTMLTextAreaElement>
      | React.MouseEvent<HTMLButtonElement>,
  ) => {
    if (
      (e as React.KeyboardEvent).key === "Enter" &&
      !(e as React.KeyboardEvent).shiftKey
    ) {
      e.preventDefault();
      send();
    } else if ((e as React.MouseEvent).type === "click") {
      send();
    }
  };

  // handles typing indicator logic
  const handleTyping = () => {
    // only calls when user is not typing
    if (!typing) {
      setTyping(true);
      const data = {
        senderId: user?.id!,
        receiverId: selectedUser.id,
        isTyping: true,
      };
      typingIndicator(data);
    }

    // clear previous timeout
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

    // stop typing indicator if user goes inactive for 2 seconds
    typingTimeoutRef.current = setTimeout(() => {
      setTyping(false);
      const data = {
        senderId: user?.id!,
        receiverId: selectedUser.id,
        isTyping: false,
      };
      typingIndicator(data);
    }, 2000); // 2 seconds
  };

  return (
    <div className="flex items-end gap-2">
      <Textarea
        placeholder="Type a message..."
        className="flex-1 min-h-[80px] max-h-[160px] resize-none rounded-2xl"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          handleSendMessage(e);
          handleTyping();
        }}
      />
      <Button
        size="icon"
        className="rounded-full"
        onClick={(e) => handleSendMessage(e)}
      >
        <SendIcon className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default ChatInput;
