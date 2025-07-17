import {
  CommandDialog,
  CommandInput,
  CommandList,
} from "@/components/ui/command";
import { CircleUserRound, Frown, MessageCirclePlus } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { closeDialog, openDialog } from "@/features/dialog/dialogSlice";
import { Skeleton } from "./ui/skeleton";
import { useEffect } from "react";
import { getAllUsers } from "@/features/users/usersThunk";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { ScrollArea } from "./ui/scroll-area";
import { AvatarImage } from "@radix-ui/react-avatar";
import { searchUsers } from "@/features/users/usersSlice";
import { CommandEmpty } from "cmdk";
import { SelectedUser } from "@/types/user";
import { setSelectedUser } from "@/features/chat/chatSlice";
import { userOnline } from "@/socketService";
import { getChats } from "@/features/chat/chatThunk";
import { toggleChatSelection } from "@/features/user/userSlice";

export function CommandDialogCompnent() {
  const dispatch = useAppDispatch();
  const { isOpen } = useAppSelector((state) => state.dialog);
  const { users, loading, error } = useAppSelector((state) => state.users);
  const { user: loggedInUser } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [isOpen === true]);

  const handleSearch = (value: string) => {
    if (value === "") {
      dispatch(getAllUsers());
    }
    dispatch(searchUsers(value));
  };

  const handleNewChat = (user: SelectedUser) => {
    dispatch(toggleChatSelection(true));

    // set the profile of the selected user
    dispatch(setSelectedUser(user));

    // get the user's online status
    userOnline({ senderId: loggedInUser?.id!, receiverId: user.id });

    // get all the chats between the logged in user and selected user
    dispatch(getChats({ userId1: loggedInUser?.id!, userId2: user.id }));
    dispatch(closeDialog());
  };

  return (
    <>
      <MessageCirclePlus
        className="cursor-pointer"
        onClick={() => dispatch(openDialog())}
      />
      <CommandDialog open={isOpen} onOpenChange={() => dispatch(closeDialog())}>
        <CommandInput
          placeholder="Search users by name or email"
          onChangeCapture={(e: React.ChangeEvent<HTMLInputElement>) => {
            handleSearch(e.target.value.trim());
          }}
        />
        <CommandList>
          {users.length === 0 && (
            <CommandEmpty className="flex gap-2 justify-center items-center ">
              <Frown />
              <span className="my-4 font-semibold">No users found</span>
            </CommandEmpty>
          )}

          <div className="px-3 py-2 space-y-4">
            {loading || error ? (
              <div className="flex p-4 flex-col gap-10">
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-4/5" />
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-4/5" />
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-4/5" />
                  </div>
                </div>
              </div>
            ) : (
              <ScrollArea className="">
                {users.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center gap-3 p-4 rounded-md hover:bg-secondary cursor-pointer"
                    onClick={() => handleNewChat(user)}
                  >
                    <Avatar>
                      <AvatarImage src={user.profile_picture} />
                      <AvatarFallback>
                        <CircleUserRound size={35} className="text-accent" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{user.username}</h3>
                      <p className="text-sm text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </div>
                ))}
              </ScrollArea>
            )}
          </div>
        </CommandList>
      </CommandDialog>
    </>
  );
}
