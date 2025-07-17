import { Zap, MessageCircle, MenuIcon } from "lucide-react";
import { Button } from "./ui/button";
import { ModeToggle } from "./mode-toggle";

type NoChatSelectedprops = {
  isMobile: boolean;
  setSidebarOpen: (isOpen: boolean) => void;
};

export default function NoChatSelected({
  isMobile,
  setSidebarOpen,
}: NoChatSelectedprops) {
  return (
    <div className="flex-1 flex flex-col">
      {/* header */}
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
        </div>

        <div className="flex gap-2">
          <ModeToggle />
        </div>
      </div>

      {/* not selected section */}
      <div className="flex flex-col w-full items-center justify-center h-full bg-gradient-to-br from-primary/10 via-background to-secondary/10 text-foreground p-8">
        <div className="relative mb-8">
          <div className="absolute inset-0 blur-3xl bg-primary/20 rounded-full animate-pulse"></div>
          <MessageCircle className="w-24 h-24 text-primary relative z-10" />
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold mb-2 sm:mb-4 text-primary text-center">
          Welcome to Chat-Link
        </h1>
        <p className="text-center text-muted-foreground mb-6 sm:mb-8 max-w-md text-sm sm:text-lg px-4">
          Connect, collaborate, and chat in style. Your conversations,
          reimagined.
        </p>
        <div className="relative w-full max-w-md">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg blur-md"></div>
          <div className="relative bg-card rounded-lg p-4 sm:p-6 shadow-lg">
            <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-primary">
              Get Started
            </h2>
            <ul className="space-y-2 text-muted-foreground text-sm sm:text-base">
              <li className="flex items-baseline">
                <div className="w-2 h-2 bg-primary rounded-full mr-2 flex-shrink-0"></div>
                <span>Select a chat from the sidebar to begin messaging</span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-primary rounded-full mr-2 flex-shrink-0"></div>
                <span>Select a chat from the sidebar to begin messaging</span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-primary rounded-full mr-2 flex-shrink-0"></div>
                <span>
                  Click the "+" icon to start a new chat or create a group
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex items-center justify-center bg-muted/50 rounded-full px-6 py-3 text-muted-foreground">
          <Zap className="w-5 h-5 mr-2 text-yellow-500" />
          <span>
            {/* Quick Tip: Use @mentions to quickly find and add contacts to your */}
            {/* chats! */}
            Built by{" "}
            <a
              className="underline hover:text-primary"
              href="https://github.com/rahul4019"
              target="_blank"
              rel="noopener nereferrer"
            >
              rahul4019
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}
