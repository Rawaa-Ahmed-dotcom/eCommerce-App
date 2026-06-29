import { Navigate } from "react-router";
export const IsAdminProtect = ({ children }: { children: React.ReactNode }) => {
  const role = localStorage.getItem("role") || "";
 
  if (!role || role !== "admin") {
    return <Navigate to= "/auth/login" replace/>;
  }
  return <>{children}</>;
};
