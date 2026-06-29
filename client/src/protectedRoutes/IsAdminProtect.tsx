import { useNavigate } from "react-router";
export const IsAdminProtect = ({ children }: { children: React.ReactNode }) => {
  const role = localStorage.getItem("role") || "";
  const navigate = useNavigate();
  if (!role) {
    navigate("/auth/login");
  }
  return <>{children}</>;
};
