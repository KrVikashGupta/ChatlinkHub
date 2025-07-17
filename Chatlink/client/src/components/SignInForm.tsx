import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema } from "@/schemas/signInSchema";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { loginUser } from "@/features/auth/authThunk";
import { LoaderCircle } from "lucide-react";
import { showCustomToast } from "./CustomToast";

const SignInForm = () => {
  const dispatch = useAppDispatch();

  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { loading, error: loginError } = useAppSelector((state) => state.auth);

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    try {
      const { email, password } = data;
      const resultAction = await dispatch(loginUser({ email, password }));

      if (loginUser.rejected.match(resultAction)) {
        throw new Error(resultAction.error.message || "Login failed");
      }
    } catch (error: any) {
      showCustomToast({
        content: loginError || "Login failed",
        variant: "error",
      });
    }
  };

  return (
    <div className="flex-1 bg-background p-8 md:p-12">
      <Card className="w-full max-w-md mx-auto bg-card shadow">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary">
            Sign In
          </CardTitle>
          <CardDescription className="text-secondary-foreground">
            Continue chatting
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your email"
                        className="bg-background border-gray-600 text-foreground placeholder-secondary font-semibold"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your password"
                        className="bg-background border-gray-600 text-foreground placeholder-secondary font-semibold"
                        {...field}
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                disabled={loading}
              >
                {loading && (
                  <LoaderCircle
                    size={16}
                    strokeWidth={4}
                    className="animate-spin mr-2"
                  />
                )}
                Sign In
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-center text-secondary-foreground w-full">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-primary hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignInForm;
