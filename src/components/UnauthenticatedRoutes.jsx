import isAuthenticated from "@/utils/isAuthenticated";
import { Navigate, Outlet } from "react-router-dom";

function UnauthenticatedRoutes() {
  if (isAuthenticated()) {
    return <Navigate to="/lowongan" replace />;
  }

  return <Outlet />;
}

export default UnauthenticatedRoutes;
