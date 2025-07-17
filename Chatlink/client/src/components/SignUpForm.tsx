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
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "@/schemas/signUpSchema";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { CircleCheck, CircleX, LoaderCircle } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
  checkUsernameAvailability,
  signupUser,
} from "@/features/auth/authThunk";
import { showCustomToast } from "./CustomToast";

const SignUpForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const {
    loading,
    error: signupError,
    isUsernameAvailable,
    usernameError,
    loadingUsername,
  } = useAppSelector((state) => state.auth);

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    try {
      const { username, email, password } = data;
      const resultAction = await dispatch(
        signupUser({ username, email, password }),
      );
      if (signupUser.fulfilled.match(resultAction)) {
        showCustomToast({
          content: "Account has been created",
          variant: "success",
        });
        navigate("/signin");
      } else if (signupUser.rejected.match(resultAction)) {
        throw new Error(resultAction.error.message || "Signup failed");
      }
    } catch (error: any) {
      showCustomToast({
        content: signupError || "Signup failed",
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
    <div className="flex-1 bg-background p-8 md:p-12">
      <Card className="w-full max-w-md mx-auto bg-card shadow">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary">
            Sign Up
          </CardTitle>
          <CardDescription className="text-secondary-foreground">
            Create your account to get started
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                name="username"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your username"
                        className="bg-background border-gray-600 text-foreground placeholder-secondary font-semibold"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          handleCheckUsername(e.target.value);
                        }}
                      />
                    </FormControl>
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
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                        type="text"
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
              <FormField
                name="confirmPassword"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Confirm your password"
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
                Sign Up
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-center text-secondary-foreground w-full">
            Already have an account?{" "}
            <Link
              to="/signin"
              className="font-medium text-primary hover:underline"
            >
              Sign In
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignUpForm;
