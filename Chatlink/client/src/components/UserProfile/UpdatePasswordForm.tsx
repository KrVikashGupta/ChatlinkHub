import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { updatePasswordSchema } from "@/schemas/updatePasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { LoaderCircle, Lock } from "lucide-react";
import { z } from "zod";
import { updatePassword } from "@/features/auth/authThunk";
import { showCustomToast } from "../CustomToast";

export function UpdatePasswordForm() {
  const [isUpdatePassword, setIsUpdatePassword] = useState(false);
  const { user } = useAppSelector((state) => state.auth);
  const { passwordUpdateLoading, passwordUpdateError } = useAppSelector(
    (state) => state.auth,
  );

  const dispatch = useAppDispatch();

  const form = useForm({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      email: user?.email,
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof updatePasswordSchema>) => {
    try {
      const { currentPassword, confirmNewPassword, newPassword } = data;
      const resultAction = await dispatch(
        updatePassword({ currentPassword, newPassword, confirmNewPassword }),
      );

      if (updatePassword.fulfilled.match(resultAction)) {
        showCustomToast({
          content: "Password updated",
          variant: "success",
        });
        setIsUpdatePassword(false);
        form.reset();
      } else if (updatePassword.rejected.match(resultAction)) {
        throw new Error(passwordUpdateError || "Password update failed");
      }
    } catch (error: any) {
      showCustomToast({
        content: passwordUpdateError || "Password update failed",
        variant: "error",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder={user?.email} {...field} disabled />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="currentPassword"
          disabled={!isUpdatePassword}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Password</FormLabel>
              <FormControl>
                <Input
                  placeholder={
                    isUpdatePassword ? "Enter Current Password" : "*********"
                  }
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {isUpdatePassword ? (
          <>
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter new password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmNewPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm New Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Retype new password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-4 w-full">
              <Button
                className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                onClick={() => setIsUpdatePassword(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                disabled={passwordUpdateLoading}
              >
                {passwordUpdateLoading && (
                  <LoaderCircle
                    size={16}
                    strokeWidth={4}
                    className="animate-spin mr-2"
                  />
                )}
                Save
              </Button>
            </div>
          </>
        ) : (
          <div className="flex w-full justify-end">
            <Button
              type="submit"
              className="w-1/2 bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => setIsUpdatePassword(true)}
            >
              <Lock className="mr-2 h-4 w-4" /> Update Password
            </Button>
          </div>
        )}
      </form>
    </Form>
  );
}
