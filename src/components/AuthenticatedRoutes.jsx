import isAuthenticated from "@/utils/isAuthenticated";
import { Navigate, Outlet } from "react-router-dom";

function AuthenticatedRoutes() {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default AuthenticatedRoutes;
