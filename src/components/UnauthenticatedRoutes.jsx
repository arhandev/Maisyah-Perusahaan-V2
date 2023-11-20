import isAuthenticated from "@/utils/isAuthenticated";
import { Navigate, Outlet } from "react-router-dom";

function UnauthenticatedRoutes() {
  if (isAuthenticated()) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}

export default UnauthenticatedRoutes;
