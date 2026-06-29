import { useNavigate } from "react-router";
export const AuthProtect = ({ children }: { children: React.ReactNode }) => {
  const accessToken = localStorage.getItem("accessToken") || "";
  const navigate = useNavigate();
  if (!accessToken) {
    navigate("/auth/login");
  }
  return <>{children}</>;
};
