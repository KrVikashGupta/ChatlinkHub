import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "./ui/skeleton";
import { useAppSelector } from "@/app/hooks";
import { Message } from "@/types/chat";
import { useEffect, useRef } from "react";
import TypingIndicator from "./TypingIndicator";

const MessageSection = () => {
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const { user } = useAppSelector((state) => state.auth);
  const { selectedUser, chats, loading } = useAppSelector(
    (state) => state.chat,
  );

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // scrolls whenever there is change in the chats
  useEffect(() => {
    scrollToBottom();
  }, [chats, selectedUser?.isTyping]);

  return (
    <ScrollArea className="flex-1 p-4">
      {loading
        ? [...Array(10)].map((_, index) => (
            <div
              key={index}
              className={`flex ${index % 2 === 0 ? "justify-start" : "justify-end"}`}
            >
              <div
                className={`${index % 2 === 0 ? "rounded-tr-2xl rounded-br-2xl rounded-bl-2xl bg-secondary" : "rounded-tl-2xl rounded-bl-2xl rounded-br-2xl bg-accent/50"} p-4 `}
              >
                <Skeleton
                  className={`h-6 ${index % 2 === 0 ? "w-[300px]" : "w-[250px]"}`}
                />
                <Skeleton className="h-3 w-[100px] mt-2" />
              </div>
            </div>
          ))
        : chats.map((message: Message) => (
            <div
              key={message.id}
              className={`flex ${message.sender_id === user?.id ? "justify-end" : "justify-start"} mb-4`}
            >
              <div
                className={`max-w-[70%] px-3 pt-2 pb-1 ${
                  message.sender_id === user?.id
                    ? "bg-primary text-primary-foreground rounded-tl-2xl rounded-bl-2xl rounded-br-2xl"
                    : "bg-secondary text-secondary-foreground rounded-tr-2xl rounded-br-2xl rounded-bl-2xl"
                }`}
              >
                <p>{message.message_text}</p>
                <p className="text-xs text-end mt-2 opacity-70">
                  {new Date(message.sent_at).toLocaleString("en-us", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          ))}

      {selectedUser?.isTyping && <TypingIndicator />}

      <div ref={chatEndRef} />
    </ScrollArea>
  );
};

export default MessageSection;
