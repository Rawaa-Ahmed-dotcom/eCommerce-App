
import Header from "../components/common/Header";
import { Outlet } from "react-router";
const MainLayout = () => {
  return (
    <>
      <Header />

      <Outlet />
    </>
  );
};

export default MainLayout;
