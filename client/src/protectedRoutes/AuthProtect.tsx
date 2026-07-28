import { Navigate } from "react-router";
export const AuthProtect = ({ children }: { children: React.ReactNode }) => {
  const accessToken = localStorage.getItem("accessToken") || "";
 
  if (!accessToken) {
    return <Navigate to = "/auth/register" replace/>;
  }
  return <>{children}</>;
};
