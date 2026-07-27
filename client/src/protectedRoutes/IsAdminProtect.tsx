import { Navigate } from "react-router";
export const IsAdminProtect = ({ children }: { children: React.ReactNode }) => {
  const user = JSON.parse(localStorage.getItem("user") as string) || null;
  const role = user ? user.role : null;
 
  if (!role || role !== "admin") {
    return <Navigate to= "/auth/login" replace/>;
  }
  return <>{children}</>;
};
