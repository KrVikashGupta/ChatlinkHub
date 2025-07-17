import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import { ThemeProvider } from "./components/theme-provider";
import ProtectedRoute from "./utils/ProtectedRoute";
import Chat from "./pages/Chat";
import PublicRoute from "./utils/PublicRoute";
import { useAppDispatch } from "./app/hooks";
import { setUser } from "./features/auth/authSlice";
import { useEffect } from "react";
import { Toaster } from "sonner";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      dispatch(setUser(JSON.parse(user)));
    }
  }, []);

  return (
    <ThemeProvider>
      <Toaster position="bottom-right" />
      <Routes>
        <Route path="/" element={<PublicRoute>{<Home />}</PublicRoute>} />
        <Route
          path="/signup"
          element={<PublicRoute>{<SignUp />}</PublicRoute>}
        />
        <Route
          path="/signin"
          element={<PublicRoute>{<SignIn />}</PublicRoute>}
        />
        <Route
          path="/chat"
          element={<ProtectedRoute>{<Chat />}</ProtectedRoute>}
        />
        <Route
          path="/profile"
          element={<ProtectedRoute>{<Profile />}</ProtectedRoute>}
        />
        <Route path="*" element={<PublicRoute>{<NotFound />}</PublicRoute>} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
