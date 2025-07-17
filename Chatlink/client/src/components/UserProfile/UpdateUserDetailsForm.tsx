import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { updateUserDetailsSchema } from "@/schemas/updatePasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { CircleCheck, CircleX, LoaderCircle, Pencil } from "lucide-react";
import { z } from "zod";
import { showCustomToast } from "../CustomToast";
import { Textarea } from "../ui/textarea";
import {
  checkUsernameAvailability,
  updateUserDetails,
} from "@/features/auth/authThunk";

export function UpdateUserDetailsForm() {
  const [isEditProfile, setIsEditProfile] = useState(false);
  const { user, isUsernameAvailable, usernameError, loadingUsername } =
    useAppSelector((state) => state.auth);
  const { userDetailsUpdateLoading, userDetailsUpdateError } = useAppSelector(
    (state) => state.auth,
  );

  const dispatch = useAppDispatch();

  const form = useForm({
    resolver: zodResolver(updateUserDetailsSchema),
    defaultValues: {
      statusMessage: user?.status_message ?? "",
      username: user?.username ?? "",
    },
  });

  const onSubmit = async (data: z.infer<typeof updateUserDetailsSchema>) => {
    try {
      const { statusMessage, username } = data;
      const resultAction = await dispatch(
        updateUserDetails({ username, statusMessage }),
      );

      if (updateUserDetails.fulfilled.match(resultAction)) {
        showCustomToast({
          content: "Profile updated",
          variant: "success",
        });
        setIsEditProfile(false);
        form.reset();
      } else if (updateUserDetails.rejected.match(resultAction)) {
        throw new Error(userDetailsUpdateError || "Profile not updated");
      }
    } catch (error: any) {
      showCustomToast({
        content: userDetailsUpdateError || "Profile not updated",
        variant: "error",
      });
    }
  };

  const handleCheckUsername = async (username: string) => {
    const debounce = (func: (username: string) => void, delay: number) => {
      let timeoutId: NodeJS.Timeout;

      return (...args: [string]) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          func(...args);
        }, delay);
      };
    };

    const debouncedFunction = debounce((username) => {
      dispatch(checkUsernameAvailability(username));
    }, 1000);

    debouncedFunction(username);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="statusMessage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={user?.status_message}
                  {...field}
                  disabled={!isEditProfile}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your username"
                  disabled={!isEditProfile}
                  className="bg-background border-gray-600 text-foreground placeholder-secondary font-semibold"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    handleCheckUsername(e.target.value);
                  }}
                />
              </FormControl>
              {isEditProfile && (
                <FormDescription>
                  {loadingUsername ? (
                    <span className="flex items-center gap-2">
                      <LoaderCircle className="animate-spin" size={16} />{" "}
                      checking for availability
                    </span>
                  ) : !loadingUsername && isUsernameAvailable ? (
                    <span className="text-green-500 flex gap-2 items-center">
                      <CircleCheck size={16} /> username available
                    </span>
                  ) : (
                    !loadingUsername &&
                    usernameError && (
                      <span className="text-red-500 flex gap-2 items-center">
                        <CircleX size={16} />
                        {usernameError}
                      </span>
                    )
                  )}
                </FormDescription>
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        {isEditProfile ? (
          <div className="flex gap-4 w-full">
            <Button
              className="flex-1 bg-red-600 hover:bg-red-700 text-white"
              onClick={() => setIsEditProfile(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              disabled={userDetailsUpdateLoading}
            >
              {userDetailsUpdateLoading && (
                <LoaderCircle
                  size={16}
                  strokeWidth={4}
                  className="animate-spin mr-2"
                />
              )}
              Save
            </Button>
          </div>
        ) : (
          <div className="flex w-full justify-end">
            <Button
              className="w-1/2 bg-blue-600 hover:bg-blue-700 text-white"
              onClick={(e) => {
                e.preventDefault();
                setIsEditProfile(true);
              }}
            >
              <Pencil className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          </div>
        )}
      </form>
    </Form>
  );
}
