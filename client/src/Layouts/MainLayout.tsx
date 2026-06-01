
import Header from "../components/common/Header";
import { Outlet } from "react-router";
import Footer from "../components/common/Footer";
const MainLayout = () => {
  return (
    <>
      <Header />

      <Outlet />
      <Footer/>
    </>
  );
};

export default MainLayout;
