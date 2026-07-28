import Header from "../components/common/Header";
import { Outlet, useLocation } from "react-router";
import Footer from "../components/common/Footer";
import PageTransition from "../components/Transitions/PageTransition";
import { AnimatePresence } from "motion/react";

const MainLayout = () => {
  const location = useLocation();

  return (
    <div className="w-screen min-h-screen flex flex-col overflow-hidden">
      <AnimatePresence mode="wait" initial={false}>
        <PageTransition key={location.pathname}>
          <Header />
          <Outlet />
          <Footer />
        </PageTransition>
      </AnimatePresence>
    </div>
  );
};

export default MainLayout;
