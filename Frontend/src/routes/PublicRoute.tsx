import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthLoading, isAuthenticated } = useAuth();

  if (isAuthLoading) {
    return <h1>Loading...</h1>;
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PublicRoute;
