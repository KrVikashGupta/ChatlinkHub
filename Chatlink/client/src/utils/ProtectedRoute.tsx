import { useAppSelector } from "@/app/hooks";
import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
  children: JSX.Element;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  // check if the user is authenticated or not
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/signin" />;
  }

  return children;
};

export default ProtectedRoute;
