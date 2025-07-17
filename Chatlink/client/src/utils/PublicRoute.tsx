import { useAppSelector } from "@/app/hooks";
import { Navigate } from "react-router-dom";

type PublicRouteProps = {
  children: JSX.Element;
};

const PublicRoute = ({ children }: PublicRouteProps) => {
  // check if the user is authenticated or not
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/chat" />;
  }

  return children;
};

export default PublicRoute;
