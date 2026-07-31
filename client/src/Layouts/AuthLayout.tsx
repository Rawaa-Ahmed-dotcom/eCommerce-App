import { AnimatePresence } from "motion/react";
import { Outlet } from "react-router";
import PageTransition from "../components/Transitions/PageTransition";
import { useLocation } from "react-router";

const AuthLayout = () => {
  const location = useLocation();
  return (
    <div className="w-screen h-screen flex items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait" initial={false}>
        <PageTransition key={location.pathname}>
          <main className="w-full min-h-screen flex! justify-center bg-[#F1FBFF] items-center px-4 md:px-0">
            <Outlet />
          </main>
        </PageTransition>
      </AnimatePresence>
    </div>
  );
};

export default AuthLayout;