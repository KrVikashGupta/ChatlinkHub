import { ModeToggle } from "@/components/mode-toggle";
import MessageSection from "@/components/MessageSection";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CircleUserRound, MenuIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useAppSelector } from "@/app/hooks";
import ChatInput from "./ChatInput";

type ChatSectionprops = {
  isMobile: boolean;
  setSidebarOpen: (isOpen: boolean) => void;
};

const ChatSection = ({ isMobile, setSidebarOpen }: ChatSectionprops) => {
  const { selectedUser } = useAppSelector((state) => state.chat);

  return (
    <div className="flex-1 flex flex-col">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-card">
        <div className="flex items-center gap-3">
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(true)}
            >
              <MenuIcon className="h-5 w-5" />
            </Button>
          )}
          <div className="flex gap-3">
            <Avatar>
              <AvatarImage src={selectedUser?.profile_picture} alt="avatar" />
              <AvatarFallback>
                <CircleUserRound size={35} className="text-accent" />
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col justify-center gap">
              <h2 className="text-lg font-semibold">
                {selectedUser?.username}
              </h2>
              {selectedUser?.isOnline && (
                <div className="text-green-500 text-sm font-medium">Online</div>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <ModeToggle />
        </div>
      </div>

      {/* Messages */}
      <MessageSection />

      {/* Compose Message */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="p-4 border-t border-border bg-card"
      >
        {selectedUser && <ChatInput selectedUser={selectedUser} />}
      </motion.div>
    </div>
  );
};

export default ChatSection;
