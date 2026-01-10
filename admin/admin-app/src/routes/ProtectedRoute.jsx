import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  // Check if user is logged in via localStorage
  const auth = localStorage.getItem("isAuthenticated");
  const role = localStorage.getItem("role");

  if (auth !== "true" || role !== "ADMIN") {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
